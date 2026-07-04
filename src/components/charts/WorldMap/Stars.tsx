import React, { useMemo } from "react";
import { interpolate } from "remotion";

interface StarsProps {
  width: number;
  height: number;
  currentFrame: number;
  count?: number;
}

export const Stars: React.FC<StarsProps> = ({
  width,
  height,
  currentFrame,
  count = 200,
}) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
    }));
  }, [width, height, count]);

  return (
    <g className="stars">
      {stars.map((star) => {
        const twinkle = Math.sin(currentFrame * star.twinkleSpeed) * 0.3 + 0.7;
        return (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="white"
            fillOpacity={star.opacity * twinkle}
          />
        );
      })}
    </g>
  );
};
