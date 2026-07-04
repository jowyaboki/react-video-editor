import * as d3 from "d3-geo";
import { GeoFeature } from "@/types/world";

/**
 * Normalizes a country name for matching
 */
export const normalizeCountryName = (name: string): string => {
  return name.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
};

/**
 * Gets the centroid of a geographic feature
 */
export const getCentroid = (feature: GeoFeature): [number, number] => {
  return d3.geoCentroid(feature);
};

/**
 * Projects a point to screen coordinates
 */
export const projectPoint = (
  projection: d3.GeoProjection,
  point: [number, number]
): [number, number] | null => {
  return projection(point);
};
