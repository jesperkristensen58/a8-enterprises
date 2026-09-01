import { getImageProps } from "next/image";

const PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

type DesktopPhotoProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

export function DesktopPhoto({
  src,
  alt,
  sizes = "50vw",
  className,
}: DesktopPhotoProps) {
  const { props } = getImageProps({
    src,
    alt,
    fill: true,
    sizes,
    quality: 65,
  });

  return (
    <picture className={className}>
      <source
        media="(min-width: 768px)"
        srcSet={props.srcSet}
        sizes={sizes}
      />
      <img
        alt={alt}
        className="hidden h-full w-full object-cover md:block"
        decoding="async"
        fetchPriority="low"
        src={PIXEL}
        style={props.style}
      />
    </picture>
  );
}
