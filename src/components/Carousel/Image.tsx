import { GAP } from "../../constants";
import styles from "./Image.module.css";

type Props = {
  index: number;
  src: string;
  size: number;
};

export default function Image({ src, index, size }: Props) {
  return (
    <img
      style={{
        width: size,
        height: size - 20,
        margin: `0 ${GAP / 2}px`,
      }}
      className={styles.img}
      src={src}
      alt={`carousel-item-${index}`}
    />
  );
}
