import DeviceDTO from '../dto/DeviceDTO';
import WeatherDTO from '../dto/WeatherDTO';
import WeatherRequestDTO from '../dto/WeatherRequestDTO';
import WeatherSummaryDTO from '../dto/WeatherSummaryDTO';
import GenericApiService from './GenericApiService';

export default class WeatherStationService {
  private static baseHandlerUrl = 'api/v1/weather-sensor';

  public static async retrieveLast24hWeatherSummary(
    data: WeatherRequestDTO
  ): Promise<WeatherSummaryDTO> {
    return await GenericApiService.postWithDifferentResponse<
      WeatherRequestDTO,
      WeatherSummaryDTO
    >(`${this.baseHandlerUrl}/last24hSummary`, data);
  }

  public static async retrieveLast24hWeatherList(
    data: WeatherRequestDTO
  ): Promise<Array<WeatherDTO>> {
    return await GenericApiService.postWithDifferentResponse<
      WeatherRequestDTO,
      Array<WeatherDTO>
    >(`${this.baseHandlerUrl}/last24h`, data);
  }

  public static async retrieveLast7dWeatherSummary(
      data: WeatherRequestDTO
  ): Promise<WeatherSummaryDTO> {
    return await GenericApiService.postWithDifferentResponse<
        WeatherRequestDTO,
        WeatherSummaryDTO
    >(`${this.baseHandlerUrl}/last7dSummary`, data);
  }

  public static async retrieveLast7dWeatherList(
      data: WeatherRequestDTO
  ): Promise<Array<WeatherDTO>> {
    return await GenericApiService.postWithDifferentResponse<
        WeatherRequestDTO,
        Array<WeatherDTO>
    >(`${this.baseHandlerUrl}/last7d`, data);
  }

  public static async retrieveLast1mWeatherSummary(
      data: WeatherRequestDTO
  ): Promise<WeatherSummaryDTO> {
    return await GenericApiService.postWithDifferentResponse<
        WeatherRequestDTO,
        WeatherSummaryDTO
    >(`${this.baseHandlerUrl}/lastMonthSummary`, data);
  }

  public static async retrieveLast1mWeatherList(
      data: WeatherRequestDTO
  ): Promise<Array<WeatherDTO>> {
    return await GenericApiService.postWithDifferentResponse<
        WeatherRequestDTO,
        Array<WeatherDTO>
    >(`${this.baseHandlerUrl}/lastMonth`, data);
  }

  public static async retrieveWeatherStations(): Promise<Array<DeviceDTO>> {
    return await GenericApiService.get<Array<DeviceDTO>>(
      `${this.baseHandlerUrl}/devices`
    );
  }

  public static async retrieveWeatherStation(
    request: WeatherRequestDTO
  ): Promise<DeviceDTO> {
    return await GenericApiService.postWithDifferentResponse<
      WeatherRequestDTO,
      DeviceDTO
    >(`${this.baseHandlerUrl}/device`, request);
  }
}
