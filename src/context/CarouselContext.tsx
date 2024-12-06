import { createContext } from "react";
import { CarouselType } from "./types";

export const CarouselContext = createContext<CarouselType | undefined>(
  undefined
);
