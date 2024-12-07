import { useEffect, useRef, useState } from "react";

export default function useScrollable() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrollableWidth, setScrollableWidth] = useState<number | null>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      setScrollableWidth(scrollableRef.current.clientWidth);
    }
  }, [scrollableRef]);

  useEffect(() => {
    const preventScroll = (event: WheelEvent) => {
      const container = scrollableRef.current;
      if (container && container.contains(event.target as Node)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
    };
  }, [scrollableRef]);

  return { scrollableRef, scrollableWidth };
}
