export type Gender = 'male' | 'female';

export interface CharacterAvatar {
  gender: Gender;
  name: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  accessory: string;
  skinTone: string;
}

export const DEFAULT_MALE_AVATAR: CharacterAvatar = {
  gender: 'male',
  name: 'Ren (Shadow Hawk)',
  hairStyle: 'spiky_shadow',
  hairColor: '#1e1b4b', // Deep Raven Indigo
  outfit: 'shadow_shinobi',
  accessory: 'forehead_band',
  skinTone: '#fde68a'
};

export const DEFAULT_FEMALE_AVATAR: CharacterAvatar = {
  gender: 'female',
  name: 'Hina (Moonlight Grace)',
  hairStyle: 'hime_cut',
  hairColor: '#312e81', // Deep Indigo Lavender
  outfit: 'mystic_scholar',
  accessory: 'lavender_ribbon',
  skinTone: '#fde68a'
};

export const HAIR_STYLES = {
  male: [
    { id: 'spiky_shadow', label: 'Spiky Shadow Lock (Sasuke Style)' },
    { id: 'wind_swept', label: 'Wind-Swept Hawk' },
    { id: 'cyber_crop', label: 'Cyber Crop' },
    { id: 'sleek_crown', label: 'Sleek Crown' }
  ],
  female: [
    { id: 'hime_cut', label: 'Hime Cut & Bangs (Hinata Style)' },
    { id: 'twin_tails', label: 'Starlight Twin Tails' },
    { id: 'soft_waves', label: 'Gentle Soft Waves' },
    { id: 'short_bob', label: 'Kitsune Short Bob' }
  ]
};

export const HAIR_COLORS = [
  { id: '#1e1b4b', label: 'Raven Indigo', hex: '#1e1b4b' },
  { id: '#0f172a', label: 'Jet Black', hex: '#0f172a' },
  { id: '#4c1d95', label: 'Mystic Lavender', hex: '#4c1d95' },
  { id: '#7f1d1d', label: 'Crimson Red', hex: '#7f1d1d' },
  { id: '#94a3b8', label: 'Silver Frost', hex: '#94a3b8' },
  { id: '#db2777', label: 'Sakura Pink', hex: '#db2777' }
];

export const OUTFITS = {
  male: [
    { id: 'shadow_shinobi', label: 'Shadow Shinobi High-Collar Vest' },
    { id: 'cyber_explorer', label: 'Cyber Explorer Jacket' },
    { id: 'academy_blazer', label: 'Apex Academy Uniform' },
    { id: 'star_rogue', label: 'Star Rogue Cloak' }
  ],
  female: [
    { id: 'mystic_scholar', label: 'Mystic Scholar Elegant Dress' },
    { id: 'starlight_adventurer', label: 'Starlight Adventurer Outfit' },
    { id: 'academy_blazer', label: 'Apex Academy Uniform' },
    { id: 'kitsune_rogue', label: 'Kitsune Rogue Gear' }
  ]
};

export const ACCESSORIES = {
  male: [
    { id: 'forehead_band', label: 'Shinobi Forehead Band' },
    { id: 'hero_cape', label: 'Crimson Hero Cape' },
    { id: 'cyber_visor', label: 'Holographic Visor' },
    { id: 'chakra_pendant', label: 'Chakra Crystal Pendant' }
  ],
  female: [
    { id: 'lavender_ribbon', label: 'Lavender Hair Ribbon' },
    { id: 'celestial_pendant', label: 'Moonlight Pendant' },
    { id: 'cat_ears', label: 'Kitsune Ear Band' },
    { id: 'tactical_goggles', label: 'Aether Goggles' }
  ]
};
