const usedPriceOverrides = {
    "peavey-6505-ii": 800,
    "mesa-rectifier-standard-412": 800,
  };
  
  const usedPriceMultipliers = {
    instrument: 0.7,
    combo: 0.7,
    head: 0.6,
    cabinet: 0.55,
    pedal: 0.65,
    tuner: 0.7,
    accessory: 0.8,
    cable: 1,
  };
  
  function roundToNearestFive(amount) {
    return Math.round(amount / 5) * 5;
  }
  
  function getPricingCategory(item, category) {
    if (category === "amplifier") {
      return item.format === "head"
        ? "head"
        : "combo";
    }
  
    if (
      category === "accessory" &&
      (item.type === "cable" ||
        item.type === "speaker-cable")
    ) {
      return "cable";
    }
  
    return category;
  }
  
  function estimateUsedPrice(item, category) {
    const override =
      usedPriceOverrides[item.id];
  
    if (override) {
      return override;
    }
  
    const pricingCategory =
      getPricingCategory(item, category);
  
    const multiplier =
      usedPriceMultipliers[
        pricingCategory
      ] ?? 0.7;
  
    return roundToNearestFive(
      item.price * multiplier,
    );
  }
  
  function shouldPreferUsed(
    item,
    category,
    shoppingPreference,
  ) {
    if (shoppingPreference === "new-only") {
      return false;
    }
  
    if (shoppingPreference === "used-only") {
      return category !== "cable";
    }
  
    const pricingCategory =
      getPricingCategory(item, category);
  
    if (
      pricingCategory === "head" ||
      pricingCategory === "cabinet" ||
      pricingCategory === "pedal"
    ) {
      return true;
    }
  
    if (
      pricingCategory === "instrument" &&
      item.price >= 700
    ) {
      return true;
    }
  
    if (
      pricingCategory === "combo" &&
      item.price >= 500
    ) {
      return true;
    }
  
    return false;
  }
  
  function applyItemPricing(
    item,
    category,
    shoppingPreference,
  ) {
    const newPrice = item.price;
  
    const usedTarget = estimateUsedPrice(
      item,
      category,
    );
  
    const preferUsed = shouldPreferUsed(
      item,
      category,
      shoppingPreference,
    );
  
    return {
      ...item,
  
      price: preferUsed
        ? usedTarget
        : newPrice,
  
      pricing: {
        new: newPrice,
        usedTarget,
        selectedCondition: preferUsed
          ? "used"
          : "new",
        usedPriceIsEstimate: true,
      },
    };
  }
  
  export function applyCatalogPricing(
    catalog,
    shoppingPreference = "best-value",
  ) {
    return {
      ...catalog,
  
      instruments: catalog.instruments.map(
        (item) =>
          applyItemPricing(
            item,
            "instrument",
            shoppingPreference,
          ),
      ),
  
      amps: catalog.amps.map((item) =>
        applyItemPricing(
          item,
          "amplifier",
          shoppingPreference,
        ),
      ),
  
      cabinets: catalog.cabinets.map(
        (item) =>
          applyItemPricing(
            item,
            "cabinet",
            shoppingPreference,
          ),
      ),
  
      tuners: catalog.tuners.map((item) =>
        applyItemPricing(
          item,
          "tuner",
          shoppingPreference,
        ),
      ),
  
      pedals: catalog.pedals.map((item) =>
        applyItemPricing(
          item,
          "pedal",
          shoppingPreference,
        ),
      ),
  
      accessories: catalog.accessories.map(
        (item) =>
          applyItemPricing(
            item,
            "accessory",
            shoppingPreference,
          ),
      ),
    };
  }