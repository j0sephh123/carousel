import { useState, useRef, useEffect, useCallback } from "react";
import { DEFAULT_ITEMS_PER_VIEW, IMAGES_LIMIT } from "../constants";
import useSyncedState from "../hooks/useSyncedState";
import { CarouselType } from "./types";
import { imageSources } from "./apiMapper";
import { generateRandomKey } from "./utils";

export default function useCarouselProvider() {
  const [itemsPerView, setItemsPerView] = useSyncedState<number>(
    "itemsPerView",
    DEFAULT_ITEMS_PER_VIEW
  );
  // used to force unmount and remount of the carousel when we modify settings
  const [key, setKey] = useState("");
  // urls of the images to display
  const [items, setItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const isLoading = useRef(false);
  const loadedImagesCount = useRef(0);
  const [imageSource, setImageSource] = useSyncedState<
    CarouselType["imageSource"]
  >("imageSource", "picsum");

  const resetKey = () => {
    setKey(generateRandomKey());
  };

  useEffect(() => {
    const fetchImageBatch = async () => {
      if (isLoading.current) return;
      isLoading.current = true;

      try {
        const response = await imageSources[imageSource](currentPage);
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
  }, [currentPage, imageSource]);

  const loadNextPage = useCallback(() => {
    if (!canLoadMore || isLoading.current) {
      return false;
    }

    setCurrentPage((prev) => prev + 1);

    return true;
  }, [canLoadMore]);

  return {
    itemsPerView,
    setItemsPerView,
    key,
    items,
    canLoadMore,
    loadNextPage,
    resetKey,
    imageSource,
    setImageSource,
    setItems,
    setKey,
  };
}
