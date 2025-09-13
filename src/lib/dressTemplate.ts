export type Dress = {
  id: number;           // Optional because template won't have an id yet
  name: string;
  collection: string;
  images: string[];
  fabric: string;
  color: string;
  silhouette: string;
  neckline: string;
  sleeves: string;
  details: string;
  specialFeatures: string;
  isHidden: boolean;
};

export const dressTemplate: Dress = {
  id: -1,
  name: "",
  collection: "",
  images: [],
  fabric: "",
  color: "",
  silhouette: "",
  neckline: "",
  sleeves: "",
  details: "",
  specialFeatures: "",
  isHidden: true
};