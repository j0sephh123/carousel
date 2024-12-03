import { useState, startTransition } from "react";
import { DEFAULT_ITEM_SIZE } from "../../constants";
import { Config } from "../../types";
import classes from "./ConfigForm.module.css";

type Props = {
  setConfig: (config: { itemSize: number }) => void;
  config: Config;
};

export default function ConfigForm({ config, setConfig }: Props) {
  const [itemSize, setItemSize] = useState(
    config.itemSize || DEFAULT_ITEM_SIZE
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemSize(parseInt(event.target.value) || 0);
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
        <input
          type="number"
          value={itemSize}
          onChange={handleInputChange}
          placeholder="Item size"
        />
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className={classes.display}>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
    </div>
  );
}
