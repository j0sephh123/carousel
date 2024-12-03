import { ListRef } from "./types";

export default function useWheel(listRef: ListRef) {
  // TODO fix types
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!listRef.current || !listRef.current._outerRef) return;

    const rect = listRef.current._outerRef.getBoundingClientRect();

    if (e.clientY < rect.top || e.clientY > rect.bottom) return;

    listRef.current._outerRef.scrollLeft += e.deltaY;
  };

  return handleWheel;
}
