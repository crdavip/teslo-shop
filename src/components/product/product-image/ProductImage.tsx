import Image from "next/image";

interface Props {
  alt: string;
  src?: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
}

export const ProductImage = ({ alt, src, className, style, width, height, onMouseEnter, onMouseLeave }: Props) => {
  const newSrc = src ? (src.startsWith("http") ? src : `/products/${src}`) : "/imgs/placeholder.jpg";

  return (
    <Image
      alt={alt}
      src={newSrc}
      width={width}
      height={height}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      priority
    />
  );
};
