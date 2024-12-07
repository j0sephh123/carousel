import { ImageSource } from "./apiMapper";

export type CarouselType = {
  itemsPerView: number;
  setItemsPerView: React.Dispatch<React.SetStateAction<number>>;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  loadNextPage: () => boolean;
  key: string;
  resetKey: () => void;
  imageSource: ImageSource;
  setImageSource: React.Dispatch<
    React.SetStateAction<CarouselType["imageSource"]>
  >;
};
