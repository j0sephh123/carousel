import { useState } from "react";
import HorizontalCarousel from "./components/HorizontalCarousel/HorizontalCarousel";
import useImages from "./hooks/useImages";
import { DEFAULT_IMAGES_LIMIT, DEFAULT_ITEM_SIZE } from "./constants";
import ConfigForm from "./components/ConfigForm/ConfigForm";
import { Config } from "./types";

const App = () => {
  const [config, setConfig] = useState<Config>({
    itemSize: DEFAULT_ITEM_SIZE,
    imagesLimit: DEFAULT_IMAGES_LIMIT,
  });
  const { images, loadMore } = useImages();

  return (
    <div>
      <h1>Infinite Image Carousel</h1>
      {images.length > 0 && (
        <HorizontalCarousel
          itemSize={config.itemSize}
          gap={10}
          items={images}
          loadMore={loadMore}
        />
      )}
      <ConfigForm config={config} setConfig={setConfig} />
    </div>
  );
};

export default App;
