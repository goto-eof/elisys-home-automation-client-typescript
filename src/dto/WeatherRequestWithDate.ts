import WeatherRequestDTO from './WeatherRequestDTO';

export default interface WeatherRequestWithDateDTO extends WeatherRequestDTO {
  date: Date;
}
