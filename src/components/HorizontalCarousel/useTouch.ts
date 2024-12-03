import { IsDraggingRef, StartXRef, ScrollLeftRef, ListRef } from "./types";

type Props = {
  isDraggingRef: IsDraggingRef;
  startXRef: StartXRef;
  scrollLeftRef: ScrollLeftRef;
  listRef: ListRef;
};

export default function useTouch({
  isDraggingRef,
  listRef,
  scrollLeftRef,
  startXRef,
}: Props) {
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX;
    scrollLeftRef.current = listRef.current._outerRef.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const x = e.touches[0].pageX;
    const walk = startXRef.current - x;
    listRef.current._outerRef.scrollLeft = scrollLeftRef.current + walk;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
