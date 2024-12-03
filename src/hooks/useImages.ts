import { useState, useRef, useEffect } from "react";
import { fetchImages } from "../services/image-service";

export default function useImages() {
  // TODO should we use string[] or make it an object. Do we need more stuff?
  const [images, setImages] = useState<string[]>([]);
  const didFetch = useRef(false);
  // TODO: Implement pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    // TODO use better names
    const fn = async () => {
      const response = await fetchImages(page);
      setImages(response);
    };

    if (!didFetch.current) {
      didFetch.current = true;
      fn();
    }
  }, [page]);

  return images;
}
