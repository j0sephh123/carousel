import { IsDraggingRef, ListRef, ScrollLeftRef, StartXRef } from "./types";

type Props = {
  isDraggingRef: IsDraggingRef;
  startXRef: StartXRef;
  scrollLeftRef: ScrollLeftRef;
  listRef: ListRef;
};

export default function useMouse({
  isDraggingRef,
  listRef,
  scrollLeftRef,
  startXRef,
}: Props) {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = listRef.current._outerRef.scrollLeft;
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const x = e.pageX;
    const walk = startXRef.current - x;
    listRef.current._outerRef.scrollLeft = scrollLeftRef.current + walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
