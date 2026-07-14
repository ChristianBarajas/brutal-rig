export const artistProfiles = {
    "Knocked Loose": {
      tones: ["hardcore", "metalcore"],
      traits: ["percussive attack", "tight low end", "controlled high gain"],
    },
  
    "Kublai Khan TX": {
      tones: ["hardcore", "metalcore"],
      traits: ["heavy midrange", "tight low end", "aggressive rhythm tone"],
    },
  
    Deftones: {
      tones: ["nu-metal", "doom-sludge"],
      traits: ["massive low end", "atmospheric texture", "wide dynamic range"],
    },
  
    Metallica: {
      tones: ["thrash"],
      traits: ["fast attack", "scooped aggression", "rhythm clarity"],
    },
  
    Slayer: {
      tones: ["thrash", "death-metal"],
      traits: ["sharp attack", "raw high gain", "fast rhythm response"],
    },
  
    "Lamb of God": {
      tones: ["metalcore", "thrash"],
      traits: ["tight articulation", "strong midrange", "controlled gain"],
    },
  
    Counterparts: {
      tones: ["metalcore", "hardcore"],
      traits: ["defined chords", "aggressive mids", "dynamic response"],
    },
  
    "Jesus Piece": {
      tones: ["hardcore", "metalcore"],
      traits: ["dense low end", "grinding distortion", "noise control"],
    },
  
    Slipknot: {
      tones: ["nu-metal", "metalcore"],
      traits: ["thick low end", "high-gain saturation", "lower-tuned clarity"],
    },
  
    Loathe: {
      tones: ["metalcore", "nu-metal"],
      traits: ["atmospheric weight", "low-tuned clarity", "textural versatility"],
    },
  
    Turnstile: {
      tones: ["hardcore"],
      traits: ["punchy mids", "dynamic attack", "raw energy"],
    },
  
    Meshuggah: {
      tones: ["death-metal", "metalcore"],
      traits: ["extreme low-tuned clarity", "percussive attack", "tight response"],
    },
  
    Pantera: {
      tones: ["thrash"],
      traits: ["sharp attack", "aggressive presence", "tight rhythm response"],
    },
  
    Gojira: {
      tones: ["death-metal", "metalcore"],
      traits: ["articulate high gain", "powerful mids", "dynamic heaviness"],
    },
  
    Architects: {
      tones: ["metalcore"],
      traits: ["modern high gain", "low-tuned definition", "ambient versatility"],
    },
  
    "Bring Me The Horizon": {
      tones: ["metalcore", "nu-metal"],
      traits: ["modern saturation", "versatility", "layered heavy tones"],
    },
  
    "Dying Fetus": {
      tones: ["death-metal"],
      traits: ["precise attack", "extreme gain clarity", "tight low end"],
    },
  
    "Cannibal Corpse": {
      tones: ["death-metal"],
      traits: ["dense distortion", "fast articulation", "low-end definition"],
    },
  
    Sunami: {
      tones: ["hardcore"],
      traits: ["blunt low end", "aggressive mids", "percussive rhythm tone"],
    },
  
    Drain: {
      tones: ["hardcore", "thrash"],
      traits: ["fast attack", "raw aggression", "punchy midrange"],
    },
  
    "Code Orange": {
      tones: ["hardcore", "metalcore", "nu-metal"],
      traits: ["industrial aggression", "dense saturation", "textural versatility"],
    },
  
    Hatebreed: {
      tones: ["hardcore", "metalcore"],
      traits: ["punchy mids", "tight rhythm response", "controlled high gain"],
    },
  
    Trivium: {
      tones: ["metalcore", "thrash"],
      traits: ["lead clarity", "tight rhythm tone", "versatile high gain"],
    },
  
    Spiritbox: {
      tones: ["metalcore", "nu-metal"],
      traits: ["low-tuned definition", "ambient texture", "modern high gain"],
    },
  };
  
  export function getArtistProfile(artistName) {
    return artistProfiles[artistName] ?? null;
  }