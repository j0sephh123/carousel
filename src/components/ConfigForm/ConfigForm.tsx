import { useState, startTransition } from "react";
import { DEFAULT_ITEM_SIZE } from "../../constants";
import { Config } from "../../types";
import classes from "./ConfigForm.module.css";
import GenericInput from "./GenericInput";
import GenericButton from "./GenericButton";

type Props = {
  setConfig: (config: { itemSize: number }) => void;
  config: Config;
};

export default function ConfigForm({ config, setConfig }: Props) {
  const [itemSize, setItemSize] = useState(
    config.itemSize || DEFAULT_ITEM_SIZE
  );

  const handleInputChange = (value: string | number) => {
    const parsedValue = typeof value === "string" ? parseInt(value, 10) : value;
    setItemSize(parsedValue || 0); // Fallback to 0 if the parsed value is NaN
  };

  const handleSave = () => {
    const newItemSize = itemSize || DEFAULT_ITEM_SIZE;

    startTransition(() => {
      setConfig({ itemSize: newItemSize });
    });
  };

  const handleReset = () => {
    const resetSize = DEFAULT_ITEM_SIZE;

    startTransition(() => {
      setConfig({ itemSize: resetSize });
    });

    setItemSize(resetSize);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <h2>Config</h2>
        <GenericInput
          onChange={handleInputChange}
          type="number"
          value={itemSize}
          label="Item size"
        />
        <br />
        <GenericButton onClick={handleSave} label="Save" />
        <GenericButton onClick={handleReset} label="Reset" />
      </div>
      <div className={classes.display}>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
    </div>
  );
}
