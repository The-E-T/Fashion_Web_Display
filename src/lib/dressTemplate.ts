export type Dress = {
  id: number;           // Optional because template won't have an id yet
  name: string;
  collection: string;
  images: string[];
  description: string;
  isHidden: boolean;
};

export const dressTemplate: Dress = {
  id: -1,
  name: "",
  collection: "",
  images: [],
  description: "",
  isHidden: true
};