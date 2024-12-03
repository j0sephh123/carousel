import { useRef } from "react";
import { FixedSizeList } from "react-window";
import useWindowSize from "../../hooks/useWindowSize";
import useMouse from "./useMouse";
import useTouch from "./useTouch";
import useWheel from "./useWheel";
import Image from "./Image/Image";
import classes from "./HorizontalCarousel.module.css";

type Props = {
  items: string[];
  itemSize: number;
  gap: number;
  loadMore: () => void;
};

const HorizontalCarousel = ({ items, itemSize, gap, loadMore }: Props) => {
  const { width } = useWindowSize();
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const listRef = useRef<FixedSizeList>(null);
  const extendedItemCount = items.length * 3;

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
        height={itemSize}
        width={width}
        itemSize={itemSize + gap}
        itemCount={extendedItemCount}
        className={classes.list}
        onItemsRendered={(props) => {
          console.log(props);

          // console.log("visibleStartIndex", visibleStartIndex);
          // if (visibleStartIndex === extendedItemCount - items.length) {
          //   loadMore();
          // }
        }}
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

export default HorizontalCarousel;
