import { useState } from "react";

interface ImagePlaceholderProps {
  imgUrl?: string;
  placeholder?: JSX.Element;
  alt?: string;
  imgCssClasses?: string;
}

export const ImagePlaceholder = ({
  imgUrl,
  placeholder,
  alt,
  imgCssClasses,
}: ImagePlaceholderProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className={loaded && imgUrl ? "hidden" : ""}>{placeholder}</div>
      <img
        alt={alt ?? "image"}
        className={!loaded ? "hidden" : imgCssClasses ?? "w-24"}
        src={imgUrl}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
