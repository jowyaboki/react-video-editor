import { CanvasPreset } from "@/types/editor";

export interface SocialCanvasPreset extends CanvasPreset {
  ratio: string;
}

export const CANVAS_PRESETS: SocialCanvasPreset[] = [
  {
    name: "TikTok / Reels",
    width: 1080,
    height: 1920,
    ratio: "9:16",
  },
  {
    name: "Instagram",
    width: 1080,
    height: 1080,
    ratio: "1:1",
  },
  {
    name: "YouTube",
    width: 1920,
    height: 1080,
    ratio: "16:9",
  },
];
