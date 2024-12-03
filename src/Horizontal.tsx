import { useRef, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import useWindowSize from "./hooks/useWindowSize";
import { ImageData } from "./types";

type Props = {
  items: ImageData[];
};

// TODO rename the file and move to components folder
const HorizontalCarousel = ({ items }: Props) => {
  const { width } = useWindowSize(); // Get updated width on resize
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const listRef = useRef(null);
  const itemWidth = 200 + 20; // 200px image + 10px margin on each side

  // Duplicate items
  // TODO useMemo
  const extendedItems = [...items, ...items, ...items];

  // TODO fix types
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = listRef.current._outerRef.scrollLeft;
    e.preventDefault(); // Prevent text selection
  };

  // TODO fix types
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX;
    const walk = startX.current - x;
    listRef.current._outerRef.scrollLeft = scrollLeft.current + walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // TODO fix types
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    scrollLeft.current = listRef.current._outerRef.scr // Fixed heightollLeft;
  };

  // TODO fix types
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX;
    const walk = startX.current - x;
    listRef.current._outerRef.scrollLeft = scrollLeft.current + walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // TODO fix types
  const handleWheel = (e) => {
    if (!listRef.current || !listRef.current._outerRef) return;

    const rect = listRef.current._outerRef.getBoundingClientRect();
 // Fixed height
    listRef.current._outerRef.scrollLeft += e.deltaY;
  };

  // Adjust scroll position to the middle (original items) when reaching the edges
  const handleScroll = () => {
    if (!listRef.current || !listRef.current._outerRef) return;

    const outerRef = listRef.current._outerRef;
    const maxScrollLeft = itemWidth * items.length;

    if (outerRef.scrollLeft <= 0) {
      // Jump to the end of original items
      outerRef.scrollLeft += maxScrollLeft;
    } else if (outerRef.scrollLeft >= maxScrollLeft * 2) {
      // Jump back to the start of original items
      outerRef.scrollLeft -= maxScrollLeft;
    }
  };

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
        cursor: isDragging.current ? "grabbing" : "grab",
        height: "220px", // TODO needs to be dynamic?
        overflow: "hidden",
      }}
      onMouseDown={handleMouseDown} // Fixed height
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <List
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
        onScroll={handleScroll}
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
      </List>
    </div>
  );
};

export default HorizontalCarousel;
