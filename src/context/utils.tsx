import React, {
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { CarouselContext } from "./CarouselContext";
import { fetchImages } from "../services/imagesService";
import { DEFAULT_ITEMS_PER_VIEW, IMAGES_LIMIT, PAGE_SIZE } from "../constants";
import useSyncedState from "../hooks/useSyncedState";

export type CarouselType = {
  itemsPerView: number;
  setItemsPerView: React.Dispatch<React.SetStateAction<number>>;
  items: string[];
  loadNextPage: () => boolean;
  key: string;
  resetKey: () => void;
};

type CarouselProviderProps = {
  children: ReactNode;
};

export const CarouselProvider: React.FC<CarouselProviderProps> = ({
  children,
}) => {
  const [itemsPerView, setItemsPerView] = useSyncedState(
    "itemsPerView",
    DEFAULT_ITEMS_PER_VIEW
  );
  const [key, setKey] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const isLoading = useRef(false);
  const loadedImagesCount = useRef(0);

  const resetKey = () => {
    setKey(generateRandomKey());
  };

  useEffect(() => {
    const fetchImageBatch = async () => {
      if (isLoading.current) return;
      isLoading.current = true;

      try {
        const response = await fetchImages(currentPage, PAGE_SIZE);
        loadedImagesCount.current += response.length;

        if (loadedImagesCount.current >= IMAGES_LIMIT) {
          setCanLoadMore(false);
          setItems((prev) => [
            ...prev,
            ...response.slice(0, IMAGES_LIMIT - prev.length),
          ]);
        } else {
          setItems((prev) =>
            currentPage === 1 ? response : [...prev, ...response]
          );
        }

        if (response.length === 0) {
          setCanLoadMore(false);
        }
      } finally {
        isLoading.current = false;
      }
    };

    fetchImageBatch();
  }, [currentPage]);

  const loadNextPage = useCallback(() => {
    if (!canLoadMore || isLoading.current) {
      return false;
    }

    setCurrentPage((prev) => prev + 1);

    return true;
  }, [canLoadMore]);

  return (
    <CarouselContext.Provider
      value={{
        itemsPerView,
        setItemsPerView,
        items,
        loadNextPage,
        key,
        resetKey,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

const generateRandomKey = () => {
  return Math.random().toString(36).substring(7);
};
