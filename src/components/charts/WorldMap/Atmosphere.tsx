import React from "react";

interface AtmosphereProps {
  width: number;
  height: number;
  radius: number;
}

export const Atmosphere: React.FC<AtmosphereProps> = ({ width, height, radius }) => {
  const gradientId = "atmosphere-gradient";

  return (
    <g className="atmosphere">
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="80%" stopColor="rgba(100, 150, 255, 0)" />
          <stop offset="95%" stopColor="rgba(100, 150, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(100, 150, 255, 0.5)" />
        </radialGradient>
      </defs>
      <circle
        cx={width / 2}
        cy={height / 2}
        r={radius * 1.05}
        fill={`url(#${gradientId})`}
        style={{ pointerEvents: "none" }}
      />
    </g>
  );
};
