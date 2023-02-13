"use client";

import { useState } from "react";
import Image from "next/image";
import DefaultImage from "../../public/default-error-1.jpg";
import type { ImageProps } from "next/image";

const FillImage = ({ src, onError, ...rest }: ImageProps) => {
  const [isError, setIsError] = useState(false);
  const handleError = () => {
    setIsError(true);
  };

  return (
    <Image
      fill
      {...rest}
      src={(isError || !src) ? DefaultImage : src}
      onError={handleError}
    />
  );
};

export default FillImage;
