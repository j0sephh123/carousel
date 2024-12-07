type Props<T extends string> = {
  options: string[];
  value: T;
  onChange: (selectedValue: T) => void;
};

const Select = <T extends string,>({ options, value, onChange }: Props<T>) => (
  <select value={value} onChange={(e) => onChange(e.target.value as T)}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Select;
