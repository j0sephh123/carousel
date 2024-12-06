import { startTransition, useState } from "react";
import classes from "./ConfigForm.module.css";
import Input from "./Input";
import { DEFAULT_ITEMS_PER_VIEW, DEFAULT_IMAGE_SOURCE } from "../../../constants";
import useCarouselContext from "../../../context/useCarouselContext";
import Select from "./Select";
import { imageSources } from "../../../context/apiMapper";

export default function ConfigForm() {
  const {
    itemsPerView,
    setItemsPerView,
    resetKey,
    imageSource,
    setImageSource,
  } = useCarouselContext();
  const [localItemsPerView, setLocalItemsPerView] = useState(itemsPerView);
  const [localImageSource, setLocalImageSource] = useState(imageSource);

  const handleSave = () => {
    startTransition(() => {
      setItemsPerView(localItemsPerView);
      setImageSource(localImageSource);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setItemsPerView(DEFAULT_ITEMS_PER_VIEW);
      resetKey();
      setLocalItemsPerView(DEFAULT_ITEMS_PER_VIEW);
      setLocalImageSource(DEFAULT_IMAGE_SOURCE);
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <h2>Config</h2>
        <Input
          onChange={setLocalItemsPerView}
          type="number"
          value={localItemsPerView}
          label="Items per view"
        />
        <Select
          options={Object.keys(imageSources)}
          value={localImageSource}
          onChange={setLocalImageSource}
        />
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
