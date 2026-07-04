import React from "react";
import { GeoProjection } from "d3-geo";
import { Marker } from "@/types/world";
import { spring, useVideoConfig, interpolate } from "remotion";

interface WorldMapMarkerProps {
  marker: Marker;
  projection: GeoProjection;
  currentFrame: number;
}

export const WorldMapMarker: React.FC<WorldMapMarkerProps> = ({
  marker,
  projection,
  currentFrame,
}) => {
  const coords = projection([marker.lng, marker.lat]);
  if (!coords) return null;

  const [x, y] = coords;

  const { fps } = { fps: 30 }; // Fallback or use from props if not in Remotion context

  // Appearance animation using spring
  const scale = spring({
    frame: currentFrame,
    fps: 30,
    config: { damping: 10 },
  });

  // Pulse animation using sine wave
  const pulse = Math.sin(currentFrame * 0.15) * 0.3 + 1;

  return (
    <g transform={`translate(${x}, ${y})`} className="world-map-marker">
      {/* Glow Effect */}
      <circle
        r={12 * pulse * scale}
        fill={marker.color || "#3b82f6"}
        fillOpacity={0.2 * (2 - pulse)}
      />

      {/* Outer Pulse */}
      <circle
        r={8 * pulse * scale}
        fill="none"
        stroke={marker.color || "#3b82f6"}
        strokeWidth={1}
        strokeOpacity={0.5 * (2 - pulse)}
      />

      {/* Main Marker Dot */}
      <circle
        r={4 * scale}
        fill={marker.color || "#3b82f6"}
        stroke="white"
        strokeWidth={1.5}
      />
    </g>
  );
};
