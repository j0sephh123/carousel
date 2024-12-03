import { ChangeEvent, forwardRef } from "react";
import styles from "./GenericInput.module.css";

type InputType = "text" | "number";

interface GenericInputProps {
  type: InputType;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  min?: number;
  max?: number;
}

const GenericInput = forwardRef<HTMLInputElement, GenericInputProps>(
  (
    {
      type,
      value,
      onChange,
      placeholder,
      label,
      className,
      min,
      max,
    },
    ref
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue =
        type === "number" ? Number(event.target.value) : event.target.value;
      onChange(newValue);
    };

    return (
      <div className={`${styles.inputContainer} ${className || ""}`}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.input}
          min={type === "number" ? min : undefined}
          max={type === "number" ? max : undefined}
        />
      </div>
    );
  }
);

export default GenericInput;
