export interface Gem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  origin: string;
  inStock: boolean;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GemFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  origin: string;
  inStock: boolean;
  quantity: number;
}

export const GEM_CATEGORIES = [
  "Sapphire",
  "Ruby",
  "Emerald",
  "Diamond",
  "Topaz",
  "Amethyst",
  "Garnet",
  "Opal",
  "Aquamarine",
  "Other",
];

export const GEM_COLORS = [
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Purple",
  "Pink",
  "Orange",
  "White",
  "Black",
  "Brown",
  "Multi-colored",
  "Other",
];

export const GEM_CLARITIES = [
  "FL (Flawless)",
  "IF (Internally Flawless)",
  "VVS1 (Very Very Slightly Included 1)",
  "VVS2 (Very Very Slightly Included 2)",
  "VS1 (Very Slightly Included 1)",
  "VS2 (Very Slightly Included 2)",
  "SI1 (Slightly Included 1)",
  "SI2 (Slightly Included 2)",
  "I1 (Included 1)",
  "I2 (Included 2)",
  "I3 (Included 3)",
];

export const GEM_CUTS = [
  "Brilliant",
  "Princess",
  "Emerald",
  "Asscher",
  "Cushion",
  "Marquise",
  "Radiant",
  "Oval",
  "Pear",
  "Heart",
  "Round",
  "Baguette",
  "Other",
];

export const GEM_ORIGINS = [
  "Sri Lanka",
  "India",
  "Thailand",
  "Myanmar (Burma)",
  "Brazil",
  "Colombia",
  "Zambia",
  "Tanzania",
  "Madagascar",
  "Australia",
  "Russia",
  "Other",
];
