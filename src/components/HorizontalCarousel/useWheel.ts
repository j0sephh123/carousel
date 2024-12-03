import { ListRef } from "./types";

type Props = {
  listRef: ListRef;
  itemSize: number;
};

export default function useWheel({ listRef, itemSize }: Props) {
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!listRef.current || !listRef.current._outerRef) {
      return;
    }

    const outerRef = listRef.current._outerRef;
    const maxScrollLeft = (itemSize * listRef.current.props.itemCount) / 3;

    const rect = outerRef.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom) {
      return;
    }

    outerRef.scrollLeft += e.deltaY;

    if (outerRef.scrollLeft <= 0) {
      outerRef.scrollLeft += maxScrollLeft;
    } else if (outerRef.scrollLeft >= maxScrollLeft * 2) {
      outerRef.scrollLeft -= maxScrollLeft;
    }
  };

  return handleWheel;
}
