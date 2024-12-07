import { useRef } from "react";
import useScrollable from "./hooks/useScrollable";
import { FixedListWithOuterRef } from "./types";
import useCarouselContext from "../../context/useCarouselContext";
import { GAP } from "../../constants";
import useScroll from "./utils/handleScroll";
import useDrag from "./hooks/useDrag";
import HorizontalCarousel from "./Carousel";
import styles from "./ScrollableContainer.module.css";

export default function ScrollableContainer() {
  const { itemsPerView, items } = useCarouselContext();
  const { scrollableRef, scrollableWidth } = useScrollable();
  const itemSize = (scrollableWidth ?? 0) / itemsPerView;
  const isDraggingRef = useRef(false);
  const animationLockRef = useRef(false);
  const listRef = useRef<FixedListWithOuterRef>(null);
  const maxScrollLeft = (itemSize + GAP) * items.length;

  const {
    handleMouseDown,
    handleMouseMove,
    handleTouchMove,
    handleTouchStart,
    handleDragStop,
  } = useDrag({
    animationLockRef,
    listRef,
    isDraggingRef,
    maxScrollLeft,
  });

  const handleScroll = useScroll({
    animationLockRef,
    listRef,
    maxScrollLeft,
  });

  return (
    <div
      ref={scrollableRef}
      // mouse events
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onMouseUp={handleDragStop}
      onMouseLeave={handleDragStop}
      onTouchEnd={handleDragStop}
      // scroll event
      onWheel={handleScroll}
      // static styles
      className={styles.wrapper}
      // dynamic styles
      style={{
        height: scrollableWidth ? scrollableWidth / itemsPerView : "100%",
        cursor: isDraggingRef.current ? "grabbing" : "grab",
      }}
    >
      {items.length > 0 && scrollableWidth && (
        <HorizontalCarousel
          scrollableWidth={scrollableWidth}
          listRef={listRef}
        />
      )}
    </div>
  );
}
