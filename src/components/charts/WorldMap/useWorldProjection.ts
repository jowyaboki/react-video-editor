import { useMemo } from "react";
import * as d3 from "d3-geo";

interface UseWorldProjectionProps {
  width: number;
  height: number;
  currentFrame: number;
  durationInFrames: number;
  rotationMode?: "continuous" | "focus" | "static";
  focusPoint?: [number, number]; // [lng, lat]
}

export const useWorldProjection = ({
  width,
  height,
  currentFrame,
  durationInFrames,
  rotationMode = "continuous",
  focusPoint = [0, 0],
}: UseWorldProjectionProps) => {
  const projection = useMemo(() => {
    // Dynamic rotation calculation
    let rotation: [number, number, number] = [0, 0, 0];

    if (rotationMode === "continuous") {
      const progress = currentFrame / durationInFrames;
      rotation = [progress * 360, -15, 0]; // Continuous spin with slight tilt
    } else if (rotationMode === "focus") {
      // For Remotion, we ensure this is deterministic based on currentFrame
      rotation = [-focusPoint[0], -focusPoint[1], 0];
    }

    return d3
      .geoOrthographic()
      .scale(Math.min(width, height) / 2.2)
      .translate([width / 2, height / 2])
      .rotate(rotation)
      .clipAngle(90);
  }, [width, height, currentFrame, durationInFrames, rotationMode, focusPoint]);

  const path = useMemo(() => d3.geoPath().projection(projection), [projection]);

  const graticule = useMemo(() => d3.geoGraticule().step([10, 10])(), []);

  return {
    projection,
    path,
    graticule,
  };
};
