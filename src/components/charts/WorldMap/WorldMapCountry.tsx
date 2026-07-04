import React from "react";
import { GeoPath, GeoPermissibleObjects } from "d3-geo";
import { GeoFeature } from "@/types/world";

interface WorldMapCountryProps {
  feature: GeoFeature;
  path: GeoPath<any, GeoPermissibleObjects>;
  fill: string;
  stroke: string;
  strokeWidth?: number;
  opacity?: number;
}

export const WorldMapCountry: React.FC<WorldMapCountryProps> = ({
  feature,
  path,
  fill,
  stroke,
  strokeWidth = 0.5,
  opacity = 1,
}) => {
  const d = path(feature);
  if (!d) return null;

  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      className="world-map-country transition-colors duration-300"
    />
  );
};
