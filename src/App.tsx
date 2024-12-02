import useCarouselContext from "./context/useCarouselContext";
import styles from "./App.module.css";
import ScrollableContainer from "./components/Carousel/ScrollableContainer";
import ConfigForm from "./components/Carousel/ConfigForm/ConfigForm";

const App = () => {
  const { key } = useCarouselContext();

  return (
    <div>
      <h2>Infinite Image Carousel</h2>
      <div className={styles.carouselWrapper}>
        <ScrollableContainer key={key} />
      </div>
      <ConfigForm />
    </div>
  );
};

export default App;
