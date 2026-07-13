export const gear = {
    guitar: {
      instruments: [
        {
          id: "ltd-ec-256",
          name: "ESP LTD EC-256",
          brand: "esp-ltd",
          price: 599,
          tones: ["hardcore", "metalcore", "doom-sludge"],
          description:
            "A reliable set-neck guitar with humbuckers and strong value for heavy rhythm playing.",
        },
        {
          id: "schecter-omen-elite-6",
          name: "Schecter Omen Elite-6",
          brand: "schecter",
          price: 549,
          tones: ["metalcore", "nu-metal", "death-metal"],
          description:
            "A modern metal platform with aggressive styling, comfortable playability, and powerful humbuckers.",
        },
        {
          id: "ibanez-rga42fm",
          name: "Ibanez RGA42FM",
          brand: "ibanez",
          price: 479,
          tones: ["metalcore", "death-metal", "nu-metal"],
          description:
            "A fast-playing guitar with a thin neck and focused response for technical and lower-tuned riffs.",
        },
        {
          id: "jackson-pro-plus-soloist",
          name: "Jackson Pro Plus Soloist",
          brand: "jackson",
          price: 1299,
          tones: ["thrash", "death-metal", "metalcore"],
          description:
            "A professional-level metal guitar built for speed, precision, and high-gain clarity.",
        },
      ],
  
      amps: [
        {
          id: "peavey-6505-mh",
          name: "Peavey 6505 MH",
          brand: "peavey",
          price: 699,
          tones: ["hardcore", "metalcore", "death-metal"],
          description:
            "Aggressive high gain, strong midrange, and tight rhythm response for modern heavy music.",
        },
        {
          id: "orange-super-crush-100",
          name: "Orange Super Crush 100",
          brand: "orange",
          price: 699,
          tones: ["doom-sludge", "hardcore", "nu-metal"],
          description:
            "A powerful solid-state head with thick mids, strong volume, and a heavy British character.",
        },
        {
          id: "marshall-dsl20hr",
          name: "Marshall DSL20HR",
          brand: "marshall",
          price: 649,
          tones: ["thrash", "hardcore", "metalcore"],
          description:
            "A versatile tube head with aggressive upper mids and classic British bite.",
        },
      ],
  
      cabinets: [
        {
          id: "harley-benton-g212-vintage",
          name: "Harley Benton G212 Vintage",
          brand: "harley-benton",
          price: 349,
          tones: [
            "hardcore",
            "metalcore",
            "death-metal",
            "thrash",
            "doom-sludge",
            "nu-metal",
          ],
          description:
            "A strong-value 2x12 cabinet loaded with speakers suited for high-gain guitar tones.",
        },
        {
          id: "orange-ppc212",
          name: "Orange PPC212",
          brand: "orange",
          price: 1099,
          tones: ["doom-sludge", "hardcore", "nu-metal"],
          description:
            "A premium closed-back cabinet with thick low mids, projection, and room-filling weight.",
        },
      ],
  
      pedals: [
        {
          id: "boss-sd1",
          name: "Boss SD-1 Super OverDrive",
          brand: "boss",
          price: 69,
          tones: ["hardcore", "metalcore", "death-metal", "thrash"],
          description:
            "Tightens low end and sharpens attack when placed in front of a high-gain amplifier.",
        },
        {
          id: "isp-decimator-ii",
          name: "ISP Decimator II",
          brand: "isp",
          price: 149,
          tones: ["hardcore", "metalcore", "death-metal", "nu-metal"],
          description:
            "Controls unwanted noise while preserving the attack and feel of heavy rhythm playing.",
        },
        {
          id: "ehx-green-russian",
          name: "Electro-Harmonix Green Russian Big Muff",
          brand: "electro-harmonix",
          price: 109,
          tones: ["doom-sludge"],
          description:
            "Thick fuzz with massive low end and a heavy, saturated wall-of-sound character.",
        },
      ],
  
      accessories: [
        {
          id: "ernie-ball-not-even-slinky",
          name: "Ernie Ball Not Even Slinky Strings",
          price: 8,
          description:
            "Heavier strings that provide improved tension for lower tunings.",
        },
        {
          id: "dunlop-tortex",
          name: "Dunlop Tortex Picks",
          price: 6,
          description:
            "Durable picks with a firm attack suited for aggressive rhythm playing.",
        },
        {
          id: "instrument-cable",
          name: "20-Foot Instrument Cable",
          price: 25,
          description:
            "A dependable cable for rehearsals, home use, and live performance.",
        },
      ],
    },
  
    bass: {
      instruments: [
        {
          id: "sterling-ray5",
          name: "Sterling by Music Man Ray5",
          brand: "music-man",
          price: 449,
          tones: ["hardcore", "metalcore", "nu-metal"],
          description:
            "A five-string bass with an active humbucker and powerful attack for lower tunings.",
        },
        {
          id: "ibanez-sr305e",
          name: "Ibanez SR305E",
          brand: "ibanez",
          price: 399,
          tones: ["metalcore", "death-metal", "nu-metal"],
          description:
            "A lightweight five-string bass with flexible electronics and fast playability.",
        },
        {
          id: "schecter-stiletto-stealth-5",
          name: "Schecter Stiletto Stealth-5",
          brand: "schecter",
          price: 649,
          tones: ["hardcore", "metalcore", "death-metal"],
          description:
            "A modern five-string bass with active electronics and strong low-end definition.",
        },
      ],
  
      amps: [
        {
          id: "ampeg-rocket-bass-210",
          name: "Ampeg Rocket Bass RB-210",
          brand: "ampeg",
          price: 699,
          tones: ["hardcore", "doom-sludge", "thrash"],
          description:
            "A powerful bass combo with classic Ampeg character and useful live volume.",
        },
        {
          id: "orange-crush-bass-100",
          name: "Orange Crush Bass 100",
          brand: "orange",
          price: 699,
          tones: ["doom-sludge", "hardcore", "nu-metal"],
          description:
            "A thick-sounding bass combo with warm mids, strong low end, and built-in drive.",
        },
      ],
  
      cabinets: [],
  
      pedals: [
        {
          id: "darkglass-b3k",
          name: "Darkglass Microtubes B3K",
          brand: "darkglass",
          price: 219,
          tones: ["hardcore", "metalcore", "death-metal", "nu-metal"],
          description:
            "Modern bass overdrive that adds aggression while preserving clarity and low-end weight.",
        },
      ],
  
      accessories: [
        {
          id: "ernie-ball-bass-strings",
          name: "Ernie Ball Regular Slinky Bass Strings",
          price: 25,
          description:
            "Reliable bass strings with a balanced feel and clear attack.",
        },
        {
          id: "bass-cable",
          name: "20-Foot Instrument Cable",
          price: 25,
          description:
            "A dependable cable for rehearsals, home use, and live performance.",
        },
        {
          id: "bass-strap",
          name: "Wide Padded Bass Strap",
          price: 35,
          description:
            "Improves comfort and support during longer rehearsals and performances.",
        },
      ],
    },
  };