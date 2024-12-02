import { useState, useRef, useEffect, useCallback } from "react";
import { fetchImages } from "../services/imagesService";

const pageSize = 20;
const imagesLimit = 50;

export default function useImagePagination(
) {
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const isLoading = useRef(false);
  const loadedImagesCount = useRef(0);

  useEffect(() => {
    const fetchImageBatch = async () => {
      if (isLoading.current) return;
      isLoading.current = true;

      try {
        const response = await fetchImages(currentPage, pageSize);
        loadedImagesCount.current += response.length;

        if (loadedImagesCount.current >= imagesLimit) {
          setCanLoadMore(false);
          setImageList((prev) => [
            ...prev,
            ...response.slice(0, imagesLimit - prev.length),
          ]);
        } else {
          setImageList((prev) =>
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

  return { imageList, loadNextPage };
}
