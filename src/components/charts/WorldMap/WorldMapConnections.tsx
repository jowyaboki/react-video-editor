import React from "react";
import { GeoPath, GeoPermissibleObjects, GeoProjection } from "d3-geo";
import { Connection } from "@/types/world";
import { interpolate } from "remotion";

interface WorldMapConnectionsProps {
  connections: Connection[];
  path: GeoPath<any, GeoPermissibleObjects>;
  projection: GeoProjection;
  currentFrame: number;
  durationInFrames: number;
}

export const WorldMapConnections: React.FC<WorldMapConnectionsProps> = ({
  connections,
  path,
  projection,
  currentFrame,
  durationInFrames,
}) => {
  return (
    <g className="world-map-connections">
      {connections.map((conn) => {
        const geojson: any = {
          type: "LineString",
          coordinates: [conn.from, conn.to],
        };

        const d = path(geojson);
        if (!d) return null;

        // Animated dash offset for "flow" effect
        const dashOffset = interpolate(currentFrame % 60, [0, 60], [0, 20]);

        return (
          <path
            key={conn.id}
            d={d}
            fill="none"
            stroke={conn.color || "#3b82f6"}
            strokeWidth={conn.thickness || 1.5}
            strokeDasharray="4 2"
            strokeDashoffset={dashOffset}
            opacity={0.6}
          />
        );
      })}
    </g>
  );
};
