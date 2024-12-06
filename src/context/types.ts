export type CarouselType = {
  itemsPerView: number;
  setItemsPerView: React.Dispatch<React.SetStateAction<number>>;
  items: string[];
  loadNextPage: () => boolean;
  key: string;
  resetKey: () => void;
};
