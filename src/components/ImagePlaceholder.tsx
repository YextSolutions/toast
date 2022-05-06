import { useState } from "react";

interface ImagePlaceholderProps {
  imgUrl?: string;
  placeholderImg?: string;
  alt?: string;
  imgCssClasses?: string;
}

export const ImagePlaceholder = ({
  imgUrl,
  placeholderImg,
  alt,
  imgCssClasses,
}: ImagePlaceholderProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <img
        alt={"image placeholder"}
        className={loaded ? "hidden" : imgCssClasses ?? "w-24"}
        src={placeholderImg}
      />
      <img
        alt={alt ?? "image"}
        className={!loaded ? "hidden" : imgCssClasses ?? "w-24"}
        src={imgUrl}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
