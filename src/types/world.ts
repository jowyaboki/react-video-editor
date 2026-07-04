import { GeoGeometryObjects } from "d3-geo";

export interface ChartDataPoint {
  countryCode: string; // ISO 3166-1 alpha-3
  countryName: string;
  value: number;
  label?: string;
  color?: string;
}

export interface Marker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  value: number;
  color?: string;
}

export interface Connection {
  id: string;
  from: [number, number]; // [lng, lat]
  to: [number, number];   // [lng, lat]
  color?: string;
  thickness?: number;
}

export interface WorldMapTheme {
  ocean: string;
  land: string;
  border: string;
  graticule: string;
  marker: string;
  markerGlow: string;
  connection: string;
  tooltipBg: string;
  tooltipText: string;
}

export interface GeoFeature extends GeoJSON.Feature {
  properties: {
    name: string;
    id: string;
    [key: string]: any;
  };
}
