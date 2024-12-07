import { ChangeEvent, forwardRef } from "react";
import styles from "./Input.module.css";

type InputType = "number";

interface GenericInputProps {
  type: InputType;
  value: string | number;
  onChange: (value: number) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  min?: number;
  max?: number;
}

const Input = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ type, value, onChange, placeholder, label, className, min, max }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(Number(event.target.value));
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

export default Input;
