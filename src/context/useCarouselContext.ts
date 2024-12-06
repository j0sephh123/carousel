import { useContext } from "react";
import { CarouselContext } from "./CarouselContext";
import { CarouselType } from "./types";

const useCarouselContext = (): CarouselType => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "useCarouselContext must be used within an CarouselProvider"
    );
  }
  return context;
};

export default useCarouselContext;
