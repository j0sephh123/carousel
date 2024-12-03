import styles from "./GenericButton.module.css";

type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const GenericButton = ({ label, onClick, disabled = false }: Props) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default GenericButton;
