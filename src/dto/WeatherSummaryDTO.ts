export default interface WeatherSummaryDTO {
  name?: string;
  macAddress?: string;
  lastTemperature: number;
  lastHumidity: number;
  minTemperature: number;
  minHumidity: number;
  maxTemperature: number;
  maxHumidity: number;
  avgTemperature: number;
  avgHumidity: number;
  minLux: number;
  lastLux: number;
  maxLux: number;
  avgLux: number;
}
