import { PropsWithChildren } from "react";
import { CarouselContext } from "./CarouselContext";
import useCarouselProvider from "./useCarouselProvider";

export const CarouselProvider = ({ children }: PropsWithChildren) => {
  const value = useCarouselProvider();

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};
