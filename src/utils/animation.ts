import { spring, interpolate, Easing } from "remotion";

/**
 * Standard pulse animation based on frame
 */
export const getPulse = (frame: number, speed: number = 0.15) => {
  return Math.sin(frame * speed) * 0.3 + 1;
};

/**
 * Spring-based scale animation
 */
export const easeScale = (frame: number, fps: number = 30) => {
  return spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });
};

/**
 * Interpolated opacity
 */
export const easeOpacity = (frame: number, start: number, end: number) => {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
};
