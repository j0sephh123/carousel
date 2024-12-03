import { useRef, useEffect, memo } from "react";
import { FixedSizeList } from "react-window";
import useWindowSize from "../../hooks/useWindowSize";
import { ImageData } from "../../types";
import useMouse from "./useMouse";
import useTouch from "./useTouch";
import useWheel from "./useWheel";
import Image from "./Image/Image";
import classes from "./HorizontalCarousel.module.css";

type Props = {
  items: ImageData[];
  itemSize: number;
  gap: number;
};

const BUFFER_SIZE = 3;

const HorizontalCarousel = ({ items, itemSize, gap }: Props) => {
  const { width } = useWindowSize();
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listRef = useRef<any>(null);

  // Extended item count (original items + buffer on both sides)
  const extendedItemCount = items.length * BUFFER_SIZE;

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouse({
    isDraggingRef,
    listRef,
    startXRef,
    scrollLeftRef,
  });
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useTouch({
    isDraggingRef,
    listRef,
    scrollLeftRef,
    startXRef,
  });
  const handleWheel = useWheel({ listRef, itemSize });

  // Initialize scroll position to the middle
  useEffect(() => {
    if (listRef.current && listRef.current._outerRef) {
      // Start in the middle of the extended range
      listRef.current._outerRef.scrollLeft = itemSize * items.length;
    }
  }, [itemSize, items]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className={classes.wrapper}
      style={{
        height: itemSize + 20,
        overflow: "hidden",
      }}
    >
      <FixedSizeList
        ref={listRef}
        layout="horizontal"
        height={itemSize} // Match height of items
        width={width}
        itemSize={itemSize + gap} // Account for gap between items
        itemCount={extendedItemCount}
        className={classes.list}
      >
        {({ index, style }) => {
          const realIndex = index % items.length;
          return (
            <Image
              size={itemSize}
              imgWrapperStyle={{
                ...style,
                marginRight: gap, // Ensure gap between items
              }}
              src={items[realIndex]}
              index={realIndex}
              gap={gap}
            />
          );
        }}
      </FixedSizeList>
    </div>
  );
};

export default memo(HorizontalCarousel);
