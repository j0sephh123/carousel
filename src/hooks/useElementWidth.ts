import { useState, useEffect } from "react";

export default function useElementWidth(
  scrollableRef: React.RefObject<HTMLDivElement>
) {
  const [scrollableWidth, setScrollableWidth] = useState<number | null>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      setScrollableWidth(scrollableRef.current.clientWidth);
    }
  }, [scrollableRef]);

  useEffect(() => {
    const handleResize = () => {
      if (scrollableRef.current) {
        setScrollableWidth(scrollableRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollableRef]);

  return scrollableWidth;
}
