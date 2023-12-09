export default interface WeatherDTO {
  id: number;
  temperature: number;
  humidity: number;
  pressure: number;
  light: boolean;
  lux: number;
  createdDate: Date;
}
