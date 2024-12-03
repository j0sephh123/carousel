import { useState, useRef, useEffect } from "react";
import { fetchImages } from "../services/image-service";

export default function useImages() {
  const [images, setImages] = useState<string[]>([]);
  const didFetch = useRef(false);
  // TODO: Implement pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    // TODO use better names
    const fn = async () => {
      const response = await fetchImages(page, 10);
      setImages(response);
    };

    if (!didFetch.current) {
      didFetch.current = true;
      fn();
    }
  }, [page]);

  const loadMore = () => {
    console.log("Load more images");
    setPage(page + 1);
  };

  return { images, loadMore };
}
