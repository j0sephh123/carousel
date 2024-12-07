import { startTransition, useState } from "react";
import classes from "./ConfigForm.module.css";
import Input from "./Input";
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
    setItems,
  } = useCarouselContext();
  const [localItemsPerView, setLocalItemsPerView] = useState(itemsPerView);
  const [localImageSource, setLocalImageSource] = useState(imageSource);

  const handleSave = () => {
    startTransition(() => {
      setItemsPerView(localItemsPerView);
      setImageSource(localImageSource);
      resetKey();
      if (localImageSource !== imageSource) {
        setItems([]);
      }
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
        <br />
        note that save is inconsitent and refresh may be needed
      </div>
    </div>
  );
}
