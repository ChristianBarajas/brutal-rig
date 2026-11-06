"use client";

import Image from "next/image";
import { useState } from "react";

export default function GearVisual({ name, imageUrl, imageKind, category, instrument, large = false }) {
  const [failed, setFailed] = useState(false);
  const fallback = category === "Instrument"
    ? (instrument === "BASS" ? "B" : "G")
    : category.charAt(0);
  const hasImage = imageUrl && !failed;

  return (
    <figure className={large ? "detail-visual" : "product-visual"}>
      <div className={large ? "detail-art" : "product-art"}>
        {hasImage ? (
          <Image
            className="gear-image"
            src={imageUrl}
            width={512}
            height={512}
            sizes={large ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"}
            alt={imageKind === "PHOTO" ? `${name} pedal photograph` : `Stylized illustration representing ${name}`}
            loading={large ? "eager" : "lazy"}
            onError={() => setFailed(true)}
          />
        ) : (
          <span aria-hidden="true">{fallback}</span>
        )}
      </div>
      <figcaption className="gear-caption">
        {hasImage && imageKind === "PHOTO" ? (
          <>Adapted photo: <a href="https://commons.wikimedia.org/wiki/File:Boss_SD-1_Super_Overdrive.jpg" target="_blank" rel="noopener noreferrer">Johan Rosén / Kuriosatempel</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></>
        ) : hasImage ? (
          "Gear illustration · Model and finish may differ"
        ) : (
          "Visual unavailable"
        )}
      </figcaption>
    </figure>
  );
}
