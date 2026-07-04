import React from "react";
import { interpolate } from "remotion";
import { WorldMapTheme } from "@/types/world";

interface WorldMapTooltipProps {
  x: number;
  y: number;
  title: string;
  value: string | number;
  label?: string;
  theme: WorldMapTheme;
  visible: boolean;
}

export const WorldMapTooltip: React.FC<WorldMapTooltipProps> = ({
  x,
  y,
  title,
  value,
  label,
  theme,
  visible,
}) => {
  if (!visible) return null;

  return (
    <g transform={`translate(${x}, ${y - 20})`} className="world-map-tooltip">
      {/* Tooltip Background */}
      <rect
        x={-60}
        y={-45}
        width={120}
        height={40}
        rx={6}
        fill={theme.tooltipBg}
        opacity={0.9}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
      />

      {/* Tooltip Text */}
      <text
        textAnchor="middle"
        y={-28}
        fontSize={12}
        fontWeight="bold"
        fill={theme.tooltipText}
      >
        {title}
      </text>
      <text
        textAnchor="middle"
        y={-14}
        fontSize={11}
        fill={theme.tooltipText}
        opacity={0.8}
      >
        {`${value} ${label || ""}`}
      </text>

      {/* Anchor Line */}
      <line
        x1={0}
        y1={-5}
        x2={0}
        y2={15}
        stroke={theme.tooltipBg}
        strokeWidth={2}
      />
    </g>
  );
};
