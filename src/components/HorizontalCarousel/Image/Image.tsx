import classes from "./Image.module.css";

type Props = {
  imgWrapperStyle: React.CSSProperties;
  index: number;
  src: string;
  size: number;
  gap: number;
};

export default function Image({
  gap,
  src,
  imgWrapperStyle,
  index,
  size,
}: Props) {
  return (
    <div
      style={{
        ...imgWrapperStyle,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {index}
      </div>
      <img
        style={{
          width: size,
          height: size - 20, // Ensure it doesn't exceed the wrapper's height
          margin: `0 ${gap / 2}px`, // Account for half the gap on each side
        }}
        className={classes.img}
        src={src}
        alt={`carousel-item-${index}`}
      />
    </div>
  );
}
