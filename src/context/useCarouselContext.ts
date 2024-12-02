import { useContext } from "react";
import { CarouselType } from "./utils";
import { CarouselContext } from "./CarouselContext";

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
