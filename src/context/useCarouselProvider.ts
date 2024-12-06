import { useState, useRef, useEffect, useCallback } from "react";
import { DEFAULT_ITEMS_PER_VIEW, PAGE_SIZE, IMAGES_LIMIT } from "../constants";
import useSyncedState from "../hooks/useSyncedState";
import { fetchImages } from "../services/imagesService";

const generateRandomKey = () => Math.random().toString(36).substring(7);

export default function useCarouselProvider() {
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

  return {
    itemsPerView,
    setItemsPerView,
    key,
    items,
    canLoadMore,
    loadNextPage,
    resetKey,
  };
}