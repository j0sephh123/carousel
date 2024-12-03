import { useRef, useEffect } from "react";
import { FixedSizeList } from "react-window";
import useWindowSize from "../../hooks/useWindowSize";
import { ImageData } from "../../types";
import useMouse from "./useMouse";
import { IsDragging, StartX, ScrollLeft, List } from "./types";
import useTouch from "./useTouch";
import useWheel from "./useWheel";

type Props = {
  items: ImageData[];
};

const HorizontalCarousel = ({ items }: Props) => {
  const { width } = useWindowSize(); // Get updated width on resize
  const isDraggingRef = useRef<IsDragging>(false);
  const startXRef = useRef<StartX>(0);
  const scrollLeftRef = useRef<ScrollLeft>(0);
  const listRef = useRef<List>(null);
  const itemWidth = 200 + 20; // 200px image + 10px margin on each side

  // Duplicate items
  // TODO useMemo
  const extendedItems = [...items, ...items, ...items];

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

  const handleWheel = useWheel(listRef);

  // Initialize scroll position to the middle (start of original items)
  useEffect(() => {
    if (listRef.current && listRef.current._outerRef) {
      listRef.current._outerRef.scrollLeft = itemWidth * items.length; // Middle of extended items
    }
  }, [itemWidth, items]);

  return (
    <div
      style={{
        // TODO move into css file
        position: "relative",
        cursor: isDraggingRef.current ? "grabbing" : "grab",
        height: "220px", // TODO needs to be dynamic?
        overflow: "hidden",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <FixedSizeList
        ref={listRef}
        layout="horizontal"
        height={220}
        width={width}
        itemSize={itemWidth}
        itemCount={extendedItems.length}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
        }}
      >
        {({ index, style }) => (
          <div
            style={{
              // TODO move into css file
              ...style, // Ensure react-window positioning is respected, <img only doesn't work :(
              display: "flex",
              justifyContent: "center", // Center-align the image in the wrapper
              alignItems: "center", // Vertically align if needed
              boxSizing: "border-box", // Ensure padding doesn't affect total width
            }}
          >
            <img
              src={extendedItems[index % items.length]}
              alt={`carousel-item-${index}`}
              style={{
                height: "200px", // Fixed height, probably should be dynamic
                width: "200px", // Match the intended width,
                objectFit: "cover", // Maintain image aspect ratio? Need to double check if this is correct
                margin: "0 10px", // Add horizontal spacing? Do we need it?
                background: "lightblue", // debugging purposes
              }}
            />
          </div>
        )}
      </FixedSizeList>
    </div>
  );
};

export default HorizontalCarousel;
