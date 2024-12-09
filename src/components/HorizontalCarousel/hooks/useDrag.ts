import { useRef } from "react";
import { FixedListWithOuterRef } from "../types";

type Props = {
  animationLockRef: React.MutableRefObject<boolean>;
  listRef: React.RefObject<FixedListWithOuterRef>;
  isDraggingRef: React.MutableRefObject<boolean>;
  maxScrollLeft: number;
};

export default function useDrag({
  animationLockRef,
  listRef,
  isDraggingRef,
  maxScrollLeft,
}: Props) {
  // track the start coordinates where the user initiated the drag
  const startXRef = useRef(0);
  // capture the scroll position of the carousel when thedrag begins
  const scrollLeftRef = useRef(0);

  // initiate the drag event
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragStart(e.pageX);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleDragStart(e.touches[0].pageX);
  };

  // call the handleDrag function on mouse drag or touch
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      handleDrag(e.pageX);
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      handleDrag(e.touches[0].pageX);
    }
  };

  /**
   * initiate the associated refs for the drag event
   *
   * set dragging to true
   * set the start x position
   * set the scroll left position
   */
  const handleDragStart = (startX: number) => {
    if (!listRef.current || animationLockRef.current) {
      return;
    }

    isDraggingRef.current = true;
    startXRef.current = startX;
    scrollLeftRef.current = listRef.current._outerRef.scrollLeft;
  };

  const handleDrag = (x: number) => {
    if (
      !isDraggingRef.current ||
      animationLockRef.current ||
      !listRef.current
    ) {
      return;
    }

    const delta = startXRef.current - x;
    const outerRef = listRef.current._outerRef;

    let targetScrollLeft = scrollLeftRef.current + delta;

    if (targetScrollLeft >= maxScrollLeft) {
      targetScrollLeft -= maxScrollLeft;
      scrollLeftRef.current -= maxScrollLeft;
      startXRef.current = x;
    } else if (targetScrollLeft <= 0) {
      targetScrollLeft += maxScrollLeft;
      scrollLeftRef.current += maxScrollLeft;
      startXRef.current = x;
    }

    outerRef.scrollLeft = targetScrollLeft;
  };

  // called on onMouseUp, onMouseLeave and onTouchEnd
  const handleDragStop = () => {
    if (!isDraggingRef.current || !listRef.current) return;

    isDraggingRef.current = false;
    animationLockRef.current = false;
  };

  return {
    handleDragStop,
    handleMouseDown,
    handleTouchStart,
    handleMouseMove,
    handleTouchMove,
  };
}
