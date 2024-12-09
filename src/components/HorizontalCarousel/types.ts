import { FixedSizeList } from "react-window";

export type FixedListWithOuterRef = FixedSizeList & {
  _outerRef: { scrollLeft: number; getBoundingClientRect(): DOMRect };
};
