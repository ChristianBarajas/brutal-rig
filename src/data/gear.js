export const gear = {
  guitar: {
    instruments: [
      {
        id: "jackson-js22-dinky",
        name: "Jackson JS22 Dinky",
        brand: "jackson",
        price: 199.99,
        qualityTier: "starter",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["hardcore", "metalcore", "thrash", "nu-metal"],
        useCases: ["starter", "practice"],
        description:
          "An affordable dual-humbucker guitar that leaves room in a starter budget for useful amplification.",
        pricingSearch: {
          query: "Jackson JS22 Dinky electric guitar",
        },
      },
      {
        id: "ibanez-grg121sp",
        name: "Ibanez GRG121SP",
        brand: "ibanez",
        price: 299.99,
        qualityTier: "starter",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["hardcore", "metalcore", "death-metal", "nu-metal"],
        useCases: ["starter", "practice", "recording"],
        description:
          "A fixed-bridge dual-humbucker guitar with fast playability and strong value for modern heavy styles.",
        pricingSearch: {
          query: "Ibanez GRG121SP electric guitar",
        },
      },
      {
        id: "ibanez-rga42fm",
        name: "Ibanez RGA42FM",
        brand: "ibanez",
        price: 479.99,
        qualityTier: "serious",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["metalcore", "death-metal", "nu-metal"],
        useCases: ["serious", "recording", "live"],
        description:
          "A fast-playing fixed-bridge guitar with focused response for technical and lower-tuned riffs.",
        pricingSearch: {
          query: "Ibanez RGA42FM electric guitar",
        },
      },
      {
        id: "schecter-omen-elite-6",
        name: "Schecter Omen Elite-6",
        brand: "schecter",
        price: 549,
        qualityTier: "serious",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["metalcore", "nu-metal", "death-metal"],
        useCases: ["serious", "recording", "live"],
        description:
          "A modern metal guitar with comfortable playability, a fixed bridge, and powerful humbuckers.",
        pricingSearch: {
          query: "Schecter Omen Elite-6 electric guitar",
        },
      },
      {
        id: "ltd-ec-256",
        name: "ESP LTD EC-256",
        brand: "esp-ltd",
        price: 599,
        qualityTier: "serious",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["hardcore", "metalcore", "doom-sludge"],
        useCases: ["serious", "recording", "live"],
        description:
          "A reliable set-neck guitar with humbuckers and strong long-term value for heavy rhythm playing.",
        pricingSearch: {
          query: "ESP LTD EC-256 electric guitar",
        },
      },
      {
        id: "ltd-ec-1000-vintage-black",
        name: "ESP LTD EC-1000",
        brand: "esp-ltd",
        price: 1099,
        qualityTier: "professional",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["hardcore", "metalcore", "death-metal", "doom-sludge"],
        useCases: ["stage-ready", "professional", "recording", "live"],
        description:
          "A professional single-cut guitar with set-neck construction, an ebony fingerboard, and high-output humbuckers for dependable heavy rhythm work.",
        pricingSearch: {
          query: "ESP LTD EC-1000 Vintage Black electric guitar",
        },
      },
      {
        id: "schecter-hellraiser-c1",
        name: "Schecter Hellraiser C-1",
        brand: "schecter",
        price: 1149,
        qualityTier: "professional",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["hardcore", "metalcore", "death-metal", "nu-metal"],
        useCases: ["stage-ready", "professional", "recording", "live"],
        description:
          "A professional metal guitar with active humbuckers, set-neck construction, and strong definition for high-gain and lower-tuned playing.",
        pricingSearch: {
          query: "Schecter Hellraiser C-1 electric guitar",
        },
      },
      {
        id: "jackson-pro-plus-soloist",
        name: "Jackson Pro Plus Soloist",
        brand: "jackson",
        price: 1299,
        qualityTier: "professional",
        pickupType: "humbucker",
        stringCount: 6,
        tones: ["thrash", "death-metal", "metalcore"],
        useCases: ["professional", "recording", "live"],
        description:
          "A professional metal guitar built for speed, precision, and high-gain clarity.",
        pricingSearch: {
          query: "Jackson Pro Plus Soloist electric guitar",
        },
      },
    ],

    amps: [
      {
        id: "peavey-vypyr-x1",
        name: "Peavey VYPYR X1",
        brand: "peavey",
        price: 299.99,
        format: "combo",
        technology: "modeling",
        watts: 30,
        speakerConfiguration: "1x8",
        builtInEffects: true,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
        ],
        useCases: ["starter", "practice", "recording"],
        description:
          "A versatile modeling combo with high-gain sounds and built-in effects for players building a complete rig on a smaller budget.",
        pricingSearch: {
          query: "Peavey VYPYR X1 modeling amplifier",
        },
      },
      {
        id: "boss-katana-50-gen-3",
        name: "Boss Katana-50 Gen 3",
        brand: "boss",
        price: 349.99,
        format: "combo",
        technology: "modeling",
        watts: 50,
        speakerConfiguration: "1x12",
        builtInEffects: true,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["starter", "serious", "practice", "recording"],
        description:
          "A versatile 50-watt 1x12 modeling combo with useful effects, power control, and enough flexibility to grow with the player.",
        pricingSearch: {
          query: "Boss Katana-50 Gen 3 amplifier",
        },
      },
      {
        id: "boss-katana-100-gen-3",
        name: "Boss Katana-100 Gen 3",
        brand: "boss",
        price: 449.99,
        format: "combo",
        technology: "modeling",
        watts: 100,
        speakerConfiguration: "1x12",
        builtInEffects: true,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["serious", "practice", "recording", "live"],
        description:
          "A 100-watt modeling combo with an effects loop, built-in effects, power control, and practical live volume.",
        pricingSearch: {
          query: "Boss Katana-100 Gen 3 amplifier",
        },
      },
      {
        id: "boss-katana-head-gen-3",
        name: "Boss Katana Head Gen 3",
        brand: "boss",
        price: 419.99,
        format: "head",
        technology: "modeling",
        watts: 100,
        builtInEffects: true,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["stage-ready", "professional", "practice", "live"],
        description:
          "A feature-rich 100-watt head with built-in effects, power control, and a small internal speaker for convenient practice.",
        pricingSearch: {
          query: "Boss Katana Head Gen 3 amplifier",
        },
      },
      {
        id: "orange-super-crush-100",
        name: "Orange Super Crush 100",
        brand: "orange",
        price: 699,
        format: "head",
        technology: "solid-state",
        watts: 100,
        builtInEffects: false,
        tones: ["doom-sludge", "hardcore", "nu-metal"],
        useCases: ["stage-ready", "professional", "live"],
        description:
          "A powerful 100-watt solid-state head with thick mids, strong volume, and heavy British character.",
        pricingSearch: {
          query: "Orange Super Crush 100 amplifier head",
        },
      },
      {
        id: "peavey-6505-ii",
        name: "Peavey 6505 II",
        brand: "peavey",
        price: 1499,
        format: "head",
        technology: "tube",
        watts: 120,
        builtInEffects: false,
        tones: ["hardcore", "metalcore", "death-metal"],
        useCases: ["professional", "recording", "live"],
        description:
          "A professional high-gain tube head with aggressive midrange, tight response, and substantial stage power.",
        pricingSearch: {
          query: "Peavey 6505 II 120 watt amplifier head",
        },
      },
    ],

    cabinets: [
      {
        id: "harley-benton-g212",
        name: "Harley Benton G212",
        brand: "harley-benton",
        price: 159,
        size: "2x12",
        watts: 200,
        speakerModel: "Harley Benton Custom",
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "doom-sludge",
          "nu-metal",
        ],
        useCases: ["serious", "practice", "live"],
        description:
          "An affordable 2x12 cabinet that makes a separate head-and-cab rig possible without consuming the entire budget.",
        pricingSearch: {
          query: "Harley Benton G212 guitar cabinet",
        },
      },
      {
        id: "harley-benton-g212-vintage",
        name: "Harley Benton G212 Vintage",
        brand: "harley-benton",
        price: 277,
        size: "2x12",
        watts: 120,
        speakerModel: "Celestion Vintage 30",
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "doom-sludge",
          "nu-metal",
        ],
        useCases: ["serious", "stage-ready", "recording", "live"],
        description:
          "A strong-value 2x12 loaded with Celestion Vintage 30 speakers for focused high-gain projection.",
        pricingSearch: {
          query: "Harley Benton G212 Vintage Celestion V30 cabinet",
        },
      },
      {
        id: "harley-benton-g412a",
        name: "Harley Benton G412A",
        brand: "harley-benton",
        price: 239,
        size: "4x12",
        watts: 280,
        speakerModel: "Harley Benton Custom",
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "doom-sludge",
          "nu-metal",
        ],
        useCases: ["stage-ready", "live"],
        description:
          "A budget-conscious 4x12 that provides the scale and projection of a half-stack at an approachable price.",
        pricingSearch: {
          query: "Harley Benton G412A guitar cabinet",
        },
      },
      {
        id: "harley-benton-g412a-vintage",
        name: "Harley Benton G412A Vintage",
        brand: "harley-benton",
        price: 479,
        size: "4x12",
        watts: 240,
        speakerModel: "Celestion Vintage 30",
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "doom-sludge",
          "nu-metal",
        ],
        useCases: ["stage-ready", "professional", "recording", "live"],
        description:
          "A stage-ready 4x12 loaded with four Celestion Vintage 30 speakers for strong projection and familiar heavy-guitar response.",
        pricingSearch: {
          query: "Harley Benton G412A Vintage Celestion V30 cabinet",
        },
      },
      {
        id: "mesa-rectifier-standard-412",
        name: "Mesa/Boogie Rectifier Standard 4x12",
        brand: "mesa-boogie",
        price: 1529,
        estimatedUsedPrice: 800,
        size: "4x12",
        watts: 240,
        speakerModel: "Celestion Vintage 30",
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "doom-sludge",
          "nu-metal",
        ],
        useCases: ["professional", "recording", "live"],
        description:
          "A professional closed-back 4x12 with Celestion Vintage 30 speakers, substantial low-end authority, and proven high-gain projection.",
        pricingSearch: {
          query: "Mesa Boogie Rectifier Standard 4x12 cabinet",
        },
      },
    ],

    tuners: [
      {
        id: "boss-tu-02",
        name: "Boss TU-02 Clip-On Tuner",
        brand: "boss",
        price: 21.99,
        type: "clip-on",
        description:
          "An affordable tuner that protects the instrument and amplifier budget on starter and serious builds.",
        pricingSearch: {
          query: "Boss TU-02 clip-on tuner",
        },
      },
      {
        id: "boss-tu-3",
        name: "Boss TU-3 Chromatic Tuner",
        brand: "boss",
        price: 109.99,
        type: "pedal",
        description:
          "A durable pedal tuner with drop-tuning support and dependable visibility for rehearsals and live performance.",
        pricingSearch: {
          query: "Boss TU-3 chromatic tuner pedal",
        },
      },
    ],

    pedals: [
      {
        id: "boss-sd1",
        name: "Boss SD-1 Super OverDrive",
        brand: "boss",
        price: 69,
        type: "overdrive",
        tones: ["hardcore", "metalcore", "death-metal", "thrash"],
        description:
          "Tightens low end and sharpens attack in front of a high-gain amplifier.",
        pricingSearch: {
          query: "Boss SD-1 Super OverDrive pedal",
        },
      },
      {
        id: "isp-decimator-ii",
        name: "ISP Decimator II",
        brand: "isp",
        price: 149,
        type: "noise-gate",
        tones: ["hardcore", "metalcore", "death-metal", "nu-metal"],
        description:
          "Controls unwanted noise while preserving the attack of heavy rhythm playing.",
        pricingSearch: {
          query: "ISP Decimator II noise gate pedal",
        },
      },
      {
        id: "ehx-green-russian",
        name: "Electro-Harmonix Green Russian Big Muff",
        brand: "electro-harmonix",
        price: 109,
        type: "fuzz",
        tones: ["doom-sludge"],
        description:
          "Thick fuzz with massive low end and a saturated wall-of-sound character.",
        pricingSearch: {
          query: "Electro-Harmonix Green Russian Big Muff pedal",
        },
      },
    ],

    accessories: [
      {
        id: "guitar-instrument-cable",
        name: "20-Foot Instrument Cable",
        price: 25,
        type: "cable",
        required: true,
        description:
          "A required instrument cable for connecting the guitar to the amplifier or tuner.",
      },
      {
        id: "speaker-cable",
        name: "Speaker Cable",
        price: 20,
        type: "speaker-cable",
        requiredFor: "head-cab",
        description:
          "A proper speaker cable required to connect an amplifier head to a cabinet.",
      },
      {
        id: "ernie-ball-not-even-slinky",
        name: "Ernie Ball Not Even Slinky Strings",
        price: 8,
        type: "strings",
        required: false,
        description:
          "Heavier strings that provide improved tension for lower tunings.",
      },
      {
        id: "dunlop-tortex",
        name: "Dunlop Tortex Picks",
        price: 6,
        type: "picks",
        required: false,
        description:
          "Durable picks with a firm attack for aggressive rhythm playing.",
      },
    ],
  },

  bass: {
    instruments: [
      {
        id: "sterling-ray4",
        name: "Sterling by Music Man Ray4",
        brand: "music-man",
        price: 349.99,
        pickupType: "humbucker",
        electronics: "active",
        stringCount: 4,
        tones: ["hardcore", "metalcore", "nu-metal", "thrash"],
        useCases: ["starter", "serious", "practice", "recording"],
        description:
          "An active bass with strong attack and excellent value for a first serious heavy-music rig.",
        pricingSearch: {
          query: "Sterling by Music Man Ray4 bass",
        },
      },
      {
        id: "ibanez-sr305e",
        name: "Ibanez SR305E",
        brand: "ibanez",
        price: 399,
        electronics: "active",
        stringCount: 5,
        tones: ["metalcore", "death-metal", "nu-metal"],
        useCases: ["starter", "serious", "recording"],
        description:
          "A lightweight five-string bass with flexible electronics and fast playability.",
        pricingSearch: {
          query: "Ibanez SR305E five string bass",
        },
      },
      {
        id: "sterling-ray5",
        name: "Sterling by Music Man Ray5",
        brand: "music-man",
        price: 449,
        pickupType: "humbucker",
        electronics: "active",
        stringCount: 5,
        tones: ["hardcore", "metalcore", "nu-metal"],
        useCases: ["serious", "recording", "live"],
        description:
          "A five-string active bass with powerful attack and useful range for lower tunings.",
        pricingSearch: {
          query: "Sterling by Music Man Ray5 bass",
        },
      },
      {
        id: "schecter-stiletto-stealth-5",
        name: "Schecter Stiletto Stealth-5",
        brand: "schecter",
        price: 649,
        electronics: "active",
        stringCount: 5,
        tones: ["hardcore", "metalcore", "death-metal"],
        useCases: ["stage-ready", "professional", "recording", "live"],
        description:
          "A modern five-string bass with active electronics and strong low-end definition.",
        pricingSearch: {
          query: "Schecter Stiletto Stealth-5 bass",
        },
      },
    ],

    amps: [
      {
        id: "ampeg-rocket-bass-110",
        name: "Ampeg Rocket Bass RB-110",
        brand: "ampeg",
        price: 299.99,
        format: "combo",
        technology: "solid-state",
        watts: 50,
        speakerConfiguration: "1x10",
        builtInEffects: false,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["starter", "practice"],
        description:
          "A practical 50-watt bass combo with headphone, auxiliary, and balanced outputs.",
        pricingSearch: {
          query: "Ampeg Rocket Bass RB-110 bass amplifier",
        },
      },
      {
        id: "boss-katana-110-bass",
        name: "Boss Katana-110 Bass",
        brand: "boss",
        price: 449.99,
        format: "combo",
        technology: "modeling",
        watts: 60,
        speakerConfiguration: "1x10",
        builtInEffects: true,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["serious", "practice", "recording"],
        description:
          "A versatile bass modeling combo with multiple amp voices, built-in effects, and power control.",
        pricingSearch: {
          query: "Boss Katana-110 Bass amplifier",
        },
      },
      {
        id: "boss-katana-210-bass",
        name: "Boss Katana-210 Bass",
        brand: "boss",
        price: 649.99,
        format: "combo",
        technology: "modeling",
        watts: 160,
        speakerConfiguration: "2x10",
        builtInEffects: true,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["stage-ready", "recording", "live"],
        description:
          "A powerful 2x10 modeling combo with built-in effects and practical rehearsal and stage volume.",
        pricingSearch: {
          query: "Boss Katana-210 Bass amplifier",
        },
      },
      {
        id: "ampeg-rocket-bass-210",
        name: "Ampeg Rocket Bass RB-210",
        brand: "ampeg",
        price: 749.99,
        format: "combo",
        technology: "solid-state",
        watts: 500,
        speakerConfiguration: "2x10",
        builtInEffects: false,
        tones: ["hardcore", "doom-sludge", "thrash"],
        useCases: ["stage-ready", "professional", "live"],
        description:
          "A powerful bass combo with classic Ampeg character, balanced output, and expandable live power.",
        pricingSearch: {
          query: "Ampeg Rocket Bass RB-210 bass amplifier",
        },
      },
      {
        id: "boss-katana-500-bass-head",
        name: "Boss Katana-500 Bass Head",
        brand: "boss",
        price: 649.99,
        format: "head",
        technology: "modeling",
        watts: 500,
        builtInEffects: true,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["professional", "recording", "live"],
        description:
          "A 500-watt stage-ready bass head with built-in effects, USB connectivity, and cabinet optimization.",
        pricingSearch: {
          query: "Boss Katana-500 Bass amplifier head",
        },
      },
    ],

    cabinets: [
      {
        id: "boss-katana-bass-cabinet",
        name: "Boss Katana 1x12 Bass Cabinet",
        brand: "boss",
        price: 549.99,
        size: "1x12",
        watts: 500,
        impedance: 8,
        tones: [
          "hardcore",
          "metalcore",
          "death-metal",
          "thrash",
          "nu-metal",
          "doom-sludge",
        ],
        useCases: ["professional", "recording", "live"],
        description:
          "A compact 500-watt bass cabinet designed as a compatible partner for the Katana-500 Bass Head.",
        compatibleAmpIds: ["boss-katana-500-bass-head"],
        pricingSearch: {
          query: "Boss Katana 1x12 bass amplifier cabinet",
        },
      },
    ],

    tuners: [
      {
        id: "boss-tu-02-bass",
        name: "Boss TU-02 Clip-On Tuner",
        brand: "boss",
        price: 21.99,
        type: "clip-on",
        description:
          "An affordable tuner that preserves more of a starter budget for the bass and amplifier.",
        pricingSearch: {
          query: "Boss TU-02 clip-on tuner",
        },
      },
      {
        id: "boss-tu-3-bass",
        name: "Boss TU-3 Chromatic Tuner",
        brand: "boss",
        price: 109.99,
        type: "pedal",
        description:
          "A durable pedal tuner with dedicated bass and drop-tuning support for rehearsals and live use.",
        pricingSearch: {
          query: "Boss TU-3 chromatic tuner pedal",
        },
      },
    ],

    pedals: [
      {
        id: "darkglass-b3k",
        name: "Darkglass Microtubes B3K",
        brand: "darkglass",
        price: 219,
        type: "overdrive",
        tones: ["hardcore", "metalcore", "death-metal", "nu-metal"],
        description:
          "Modern bass overdrive that adds aggression while preserving clarity and low-end weight.",
        pricingSearch: {
          query: "Darkglass Microtubes B3K bass overdrive",
        },
      },
    ],

    accessories: [
      {
        id: "bass-instrument-cable",
        name: "20-Foot Instrument Cable",
        price: 25,
        type: "cable",
        required: true,
        description:
          "A required instrument cable for connecting the bass to the amplifier or tuner.",
      },
      {
        id: "bass-speaker-cable",
        name: "Speaker Cable",
        price: 20,
        type: "speaker-cable",
        requiredFor: "head-cab",
        description:
          "A proper speaker cable required when using a separate bass head and cabinet.",
      },
      {
        id: "ernie-ball-bass-strings",
        name: "Ernie Ball Regular Slinky Bass Strings",
        price: 25,
        type: "strings",
        required: false,
        description:
          "Reliable bass strings with a balanced feel and clear attack.",
      },
      {
        id: "bass-strap",
        name: "Wide Padded Bass Strap",
        price: 35,
        type: "strap",
        required: false,
        description:
          "Improves comfort and support during longer rehearsals and performances.",
      },
    ],
  },
};
