import { startTransition, useState } from "react";
import classes from "./ConfigForm.module.css";
import GenericInput from "./GenericInput";
import { DEFAULT_ITEMS_PER_VIEW } from "../../../constants";
import useCarouselContext from "../../../context/useCarouselContext";

export default function ConfigForm() {
  const { itemsPerView, setItemsPerView, resetKey } = useCarouselContext();
  const [localItemsPerView, setLocalItemsPerView] = useState(itemsPerView);

  const handleSave = () => {
    startTransition(() => {
      setItemsPerView(localItemsPerView);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setItemsPerView(DEFAULT_ITEMS_PER_VIEW);
      resetKey();
      setLocalItemsPerView(DEFAULT_ITEMS_PER_VIEW);
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <h2>Config</h2>

        <GenericInput
          onChange={setLocalItemsPerView}
          type="number"
          value={localItemsPerView}
          label="Items per view"
        />

        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className={classes.display}>
        <pre>{JSON.stringify({ itemsPerView }, null, 2)}</pre>
      </div>
    </div>
  );
}
