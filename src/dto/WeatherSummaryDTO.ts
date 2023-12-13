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

    minTemperatureDate: Date;
    lastTemperatureDate: Date;
    maxTemperatureDate: Date;

    minHumidityDate: Date;
    lastHumidityDate: Date;
    maxHumidityDate: Date;

    minLuxDate: Date;
    lastLuxDate: Date;
    maxLuxDate: Date;
}
