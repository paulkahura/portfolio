import { useState } from "react";

function createDisplacementMap() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return "";
  const image = context.createImageData(128, 128);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const nx = (x / 127) * 2 - 1;
      const ny = (y / 127) * 2 - 1;
      const radius = (nx * nx + ny * ny) / 2;
      const offset = (y * 128 + x) * 4;
      // Compress the perimeter relative to the center, like convex CRT glass.
      image.data[offset] = 128 + 120 * nx * (radius - 1);
      image.data[offset + 1] = 128 + 120 * ny * (radius - 1);
      image.data[offset + 2] = 128;
      image.data[offset + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

export function CrtLens() {
  const [map] = useState(createDisplacementMap);
  return (
    <svg className="lens-definitions" aria-hidden="true" width="0" height="0">
      <defs>
        <filter
          id="crt-lens"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={map}
            preserveAspectRatio="none"
            result="displacement"
          />
        <feGaussianBlur in="displacement" stdDeviation="2" result="smoothDisplacement" />
        <feDisplacementMap
            in="SourceGraphic"
          in2="smoothDisplacement"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
