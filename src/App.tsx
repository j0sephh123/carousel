import HorizontalCarousel from "./Horizontal";
import useImages from "./hooks/useImages";

const App = () => {
  const images = useImages();

  return (
    <div>
      <h1>Infinite Image Carousel</h1>
      {images.length > 0 && <HorizontalCarousel items={images} />}
    </div>
  );
};

export default App;
