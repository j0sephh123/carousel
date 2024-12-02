import { createContext } from "react";
import { CarouselType } from "./utils";

export const CarouselContext = createContext<CarouselType | undefined>(
  undefined
);
