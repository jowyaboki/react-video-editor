"use client";

import { useProjectStore } from "@/stores/project-store";
import { CANVAS_PRESETS } from "@/constants/canvas-presets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiLayout3Line } from "@remixicon/react";

export function CanvasRatioSelector() {
  const { canvasSize, setCanvasSize } = useProjectStore();

  const currentPreset = CANVAS_PRESETS.find(
    (p) => p.width === canvasSize.width && p.height === canvasSize.height
  );

  const handleValueChange = (value: string) => {
    const preset = CANVAS_PRESETS.find((p) => p.name === value);
    if (preset) {
      setCanvasSize({ width: preset.width, height: preset.height }, preset.ratio, "preset");
    }
  };

  return (
    <Select
      value={currentPreset?.name || "custom"}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="h-7 w-[140px] text-xs bg-transparent border-none shadow-none focus:ring-0 px-2 gap-2 hover:bg-accent transition-colors">
        <RiLayout3Line className="size-3.5 shrink-0" />
        <SelectValue placeholder="Aspect Ratio" />
      </SelectTrigger>
      <SelectContent>
        {CANVAS_PRESETS.map((preset) => (
          <SelectItem key={preset.name} value={preset.name} className="text-xs">
            <div className="flex flex-col gap-0.5">
              <span>{preset.name}</span>
              <span className="text-[10px] text-muted-foreground">
                {preset.ratio} ({preset.width}x{preset.height})
              </span>
            </div>
          </SelectItem>
        ))}
        {!currentPreset && (
          <SelectItem value="custom" className="text-xs" disabled>
            Custom ({canvasSize.width}x{canvasSize.height})
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
