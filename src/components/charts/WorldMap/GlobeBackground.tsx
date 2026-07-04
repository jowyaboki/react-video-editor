import React from "react";
import { GeoPath, GeoPermissibleObjects } from "d3-geo";
import { WorldMapTheme } from "@/types/world";

interface GlobeBackgroundProps {
  path: GeoPath<any, GeoPermissibleObjects>;
  graticule: any;
  theme: WorldMapTheme;
}

export const GlobeBackground: React.FC<GlobeBackgroundProps> = ({
  path,
  graticule,
  theme,
}) => {
  return (
    <g className="globe-background">
      {/* Ocean / Sphere */}
      <path
        d={path({ type: "Sphere" }) || ""}
        fill={theme.ocean}
        stroke="none"
      />

      {/* Graticule */}
      <path
        d={path(graticule) || ""}
        fill="none"
        stroke={theme.graticule}
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />
    </g>
  );
};
