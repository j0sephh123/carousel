import { FixedListWithOuterRef } from "../types";
import animate from "./animate";

type Props = {
  animationLockRef: React.MutableRefObject<boolean>;
  listRef: React.RefObject<FixedListWithOuterRef>;
  maxScrollLeft: number;
};

export default function handleScroll({
  animationLockRef,
  listRef,
  maxScrollLeft,
}: Props) {
  return (e: React.WheelEvent<HTMLDivElement>) => {
    if (!listRef.current || animationLockRef.current) return;

    const outerRef = listRef.current._outerRef;
    let targetScrollLeft = outerRef.scrollLeft + e.deltaY * 3;

    if (targetScrollLeft >= maxScrollLeft) {
      outerRef.scrollLeft -= maxScrollLeft;
      targetScrollLeft -= maxScrollLeft;
    } else if (targetScrollLeft <= 0) {
      outerRef.scrollLeft += maxScrollLeft;
      targetScrollLeft += maxScrollLeft;
    }

    animationLockRef.current = true;
    animate(
      outerRef as unknown as HTMLElement,
      outerRef.scrollLeft,
      targetScrollLeft,
      () => (animationLockRef.current = false)
    );
  };
}
