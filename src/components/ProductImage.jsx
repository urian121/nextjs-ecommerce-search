"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductImage({ src, alt }) {
  const [validSrc, setValidSrc] = useState(src);

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(src, { method: "HEAD" });
        if (!response.ok) {
          setValidSrc("/product-not-found.jpg");
        }
      } catch (error) {
        setValidSrc("/product-not-found.jpg");
      }
    };

    checkImage();
  }, [src]);

  return <Image src={validSrc} alt={alt} fill className="object-cover" />;
}
