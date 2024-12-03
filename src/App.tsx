import { useRef, useState, startTransition } from "react";
import HorizontalCarousel from "./components/HorizontalCarousel/HorizontalCarousel";
import useImages from "./hooks/useImages";

type Config = {
  itemSize: number;
};

const defaultItemSize = 200;

const App = () => {
  const itemSizeRef = useRef<HTMLInputElement>(null);
  const [config, setConfig] = useState<Config>({ itemSize: defaultItemSize });
  const images = useImages();

  const handleSave = () => {
    const newItemSize = itemSizeRef.current
      ? parseInt(itemSizeRef.current.value)
      : defaultItemSize;

    startTransition(() => {
      setConfig({ itemSize: newItemSize });
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setConfig({ itemSize: defaultItemSize });
    });
    if (itemSizeRef.current) {
      itemSizeRef.current.value = defaultItemSize.toString();
    }
  };

  return (
    <div>
      <h1>Infinite Image Carousel</h1>
      {images.length > 0 && (
        <HorizontalCarousel
          itemSize={config.itemSize}
          gap={10}
          items={images}
        />
      )}
      <h2>Config</h2>
      <input ref={itemSizeRef} type="number" placeholder="Item size" />
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default App;
