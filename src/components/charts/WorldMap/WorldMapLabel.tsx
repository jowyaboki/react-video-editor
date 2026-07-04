import React from "react";
import { GeoProjection } from "d3-geo";
import { Marker } from "@/types/world";
import { interpolate } from "remotion";

interface WorldMapLabelProps {
  marker: Marker;
  projection: GeoProjection;
  currentFrame: number;
}

export const WorldMapLabel: React.FC<WorldMapLabelProps> = ({
  marker,
  projection,
  currentFrame,
}) => {
  const coords = projection([marker.lng, marker.lat]);
  if (!coords) return null;

  const [x, y] = coords;

  // Fade in and slide up animation
  const opacity = interpolate(currentFrame, [0, 15], [0, 1]);
  const translateY = interpolate(currentFrame, [0, 15], [10, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <g
      transform={`translate(${x + 8}, ${y - 8 + translateY})`}
      opacity={opacity}
      className="world-map-label"
      style={{ pointerEvents: "none" }}
    >
      <text
        fontSize={12}
        fontWeight="600"
        fill="white"
        stroke="black"
        strokeWidth={0.5}
        paintOrder="stroke"
      >
        {marker.label}
      </text>
      <text
        y={14}
        fontSize={10}
        fill="rgba(255,255,255,0.7)"
        fontWeight="400"
      >
        {marker.value.toLocaleString()}
      </text>
    </g>
  );
};
