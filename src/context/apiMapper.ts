import { fetchCatImages } from "../services/catsService";
import { fetchPicsumImages } from "../services/picsumService";

export const imageSources = {
  cats: fetchCatImages,
  picsum: fetchPicsumImages,
} as const;

export type ImageSource = keyof typeof imageSources;
