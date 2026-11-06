// Short editorial notes are separate from the rig builder's scoring catalog.
// Add them only when a product-specific source supports the claims.
const gearStories = {
  "boss-sd1": {
    era: "Classic design",
    whyItMatters: "Introduced in 1981, the SD-1 uses asymmetrical clipping for overdrive with a focused midrange and tight low end. BOSS also describes it as useful for adding definition to high-gain amp tones.",
    tryThis: "Try the SD-1 before a high-gain amp with a modest drive setting. Listen for how the attack and low end change as you adjust the level and tone.",
    sourceName: "BOSS · SD-1 Super OverDrive",
    sourceUrl: "https://www.boss.info/us/products/sd-1/",
  },
  "boss-katana-100-gen-3": {
    era: "Modern model",
    whyItMatters: "The Katana-100 Gen 3 is a 100-watt combo with a 12-inch speaker, six amp characters, onboard effects, and Power Control. Its range makes it useful for exploring different sounds without swapping amplifiers.",
    tryThis: "Compare the Pushed and Brown amp characters, then use Power Control to hear your settings at a lower room volume.",
    sourceName: "BOSS · Katana-100 Gen 3",
    sourceUrl: "https://www.boss.info/us/products/katana-100_gen_3/",
  },
};

export function getGearStory(id) {
  return gearStories[id] ?? null;
}
