"use client";

import React, { useMemo } from "react";
import { feature } from "topojson-client";
import { useWorldProjection } from "./useWorldProjection";
import { GlobeBackground } from "./GlobeBackground";
import { WorldMapCountry } from "./WorldMapCountry";
import { WorldMapMarker } from "./WorldMapMarker";
import { WorldMapTooltip } from "./WorldMapTooltip";
import { WorldMapConnections } from "./WorldMapConnections";
import { WorldMapLabel } from "./WorldMapLabel";
import { Atmosphere } from "./Atmosphere";
import { Stars } from "./Stars";
import { ChartDataPoint, WorldMapTheme, Connection, Marker, GeoFeature } from "@/types/world";
import { COUNTRY_COORDS } from "./countryCoords";
import worldData from "./world.geo.json";

interface AnimatedWorldMapProps {
  width: number;
  height: number;
  data: ChartDataPoint[];
  connections?: Connection[];
  currentFrame: number;
  durationInFrames: number;
  theme?: Partial<WorldMapTheme>;
}

const DEFAULT_THEME: WorldMapTheme = {
  ocean: "#0f172a",
  land: "#1e293b",
  border: "#334155",
  graticule: "#475569",
  marker: "#3b82f6",
  markerGlow: "rgba(59, 130, 246, 0.5)",
  connection: "#3b82f6",
  tooltipBg: "#1e293b",
  tooltipText: "#f8fafc",
};

export const AnimatedWorldMap: React.FC<AnimatedWorldMapProps> = ({
  width,
  height,
  data,
  connections = [],
  currentFrame,
  durationInFrames,
  theme = {},
}) => {
  const activeTheme = { ...DEFAULT_THEME, ...theme };

  // 1. Geography Data
  const countries = useMemo(() => {
    return (feature(worldData as any, worldData.objects.countries as any) as any)
      .features as GeoFeature[];
  }, []);

  // 2. Projection Logic
  const { projection, path, graticule } = useWorldProjection({
    width,
    height,
    currentFrame,
    durationInFrames,
  });

  // 3. Markers Logic
  const markers = useMemo(() => {
    return data.map((d) => {
      const coords = COUNTRY_COORDS[d.countryCode] || [0, 0];
      return {
        id: d.countryCode,
        lng: coords[0],
        lat: coords[1],
        label: d.countryName,
        value: d.value,
        color: d.color,
      };
    }) as Marker[];
  }, [data]);

  // 4. Automatic Highlight Logic
  const activeMarkerIndex = Math.floor((currentFrame / durationInFrames) * markers.length);
  const activeMarker = markers[activeMarkerIndex % markers.length];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="animated-world-map"
      style={{ background: "#020617" }}
    >
      {/* 1. Background / Environment */}
      <Stars width={width} height={height} currentFrame={currentFrame} />

      {/* 2. Atmosphere Glow */}
      <Atmosphere width={width} height={height} radius={Math.min(width, height) / 2.2} />

      {/* 3. Base Globe Layers */}
      <GlobeBackground path={path} graticule={graticule} theme={activeTheme} />

      {/* 4. Countries */}
      <g className="countries-layer">
        {countries.map((f) => {
          const isHighlighted = activeMarker && f.id === activeMarker.id;
          return (
            <WorldMapCountry
              key={f.id}
              feature={f}
              path={path}
              fill={isHighlighted ? "#3b82f6" : activeTheme.land}
              stroke={activeTheme.border}
              opacity={isHighlighted ? 1 : 0.8}
            />
          );
        })}
      </g>

      {/* 5. Connections */}
      <WorldMapConnections
        connections={connections}
        path={path}
        projection={projection}
        currentFrame={currentFrame}
        durationInFrames={durationInFrames}
      />

      {/* 6. Markers and Labels */}
      <g className="markers-layer">
        {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            <WorldMapMarker
              marker={marker}
              projection={projection}
              currentFrame={currentFrame}
            />
            <WorldMapLabel
              marker={marker}
              projection={projection}
              currentFrame={currentFrame}
            />
          </React.Fragment>
        ))}
      </g>

      {/* 7. Tooltip (Shows for active highlighted country) */}
      {activeMarker && (
        <WorldMapTooltip
          x={projection([activeMarker.lng, activeMarker.lat])?.[0] || 0}
          y={projection([activeMarker.lng, activeMarker.lat])?.[1] || 0}
          title={activeMarker.label}
          value={activeMarker.value}
          label="Points"
          theme={activeTheme}
          visible={true}
        />
      )}
    </svg>
  );
};
