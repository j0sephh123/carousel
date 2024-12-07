import { useRef, memo } from "react";
import { FixedSizeList, ListOnItemsRenderedProps } from "react-window";
import useCarouselContext from "../../context/useCarouselContext";
import { GAP } from "../../constants";
import Image from "./Image";
import { FixedListWithOuterRef } from "./types";
import styles from "./Carousel.module.css";

type Props = {
  listRef: React.RefObject<FixedListWithOuterRef>;
  scrollableWidth: number;
};

const Carousel = ({ listRef, scrollableWidth }: Props) => {
  const { itemsPerView, items, loadNextPage } = useCarouselContext();
  const itemsRenderedRef = useRef<ListOnItemsRenderedProps | null>(null);
  const itemSize = scrollableWidth / itemsPerView;

  const onItemsRenderedHandler = (props: ListOnItemsRenderedProps) => {
    if (
      itemsRenderedRef.current?.overscanStopIndex !== props.overscanStopIndex ||
      itemsRenderedRef.current?.overscanStartIndex !== props.overscanStartIndex
    ) {
      itemsRenderedRef.current = props;
      const { overscanStopIndex } = props;
      const realStopIndex = overscanStopIndex % items.length;
      const threshold = 5;

      if (items.length - realStopIndex <= threshold) {
        loadNextPage();
      }
    }
  };

  return (
    <FixedSizeList
      ref={listRef}
      layout="horizontal"
      height={itemSize}
      width={scrollableWidth}
      itemSize={itemSize + GAP}
      itemCount={items.length * 2}
      className={styles.list}
      onItemsRendered={onItemsRenderedHandler}
    >
      {({ index, style }) => {
        const realIndex = index % items.length;
        return (
          <div
            style={{
              ...style,
              marginRight: GAP,
            }}
          >
            <Image size={itemSize} src={items[realIndex]} index={realIndex} />
          </div>
        );
      }}
    </FixedSizeList>
  );
};

export default memo(Carousel);
