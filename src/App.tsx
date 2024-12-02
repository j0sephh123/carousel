import React, { useEffect, useState } from "react";
import HorizontalCarousel from "./Horizontal";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=100"
      );
      const data = await response.json();
      const imageUrls = data.map((item: any) => item.download_url);
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Infinite Image Carousel</h1>
      {images.length > 0 && <HorizontalCarousel items={images} />}
    </div>
  );
};

export default App;
