type Props = {
  index: number;
  src: string;
  size: number;
  gap: number;
};

export default function Image({ gap, src, index, size }: Props) {
  return (
    <img
      style={{
        width: size,
        height: size - 20, // Ensure it doesn't exceed the wrapper's height
        margin: `0 ${gap / 2}px`, // Account for half the gap on each side
      }}
      className="img"
      src={src}
      alt={`carousel-item-${index}`}
    />
  );
}
