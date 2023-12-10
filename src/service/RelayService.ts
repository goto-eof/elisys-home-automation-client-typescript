import DeviceDTO from '../dto/DeviceDTO';
import RelayConfigurationRequestDTO from '../dto/RelayConfigurationRequest';
import RelayConfigurationResponseDTO from '../dto/RelayConfigurationResponseDTO';
import GenericApiService from './GenericApiService';

export default class RelayService {
  static async powerOn(
    configuration: RelayConfigurationRequestDTO
  ): Promise<RelayConfigurationResponseDTO> {
    return await GenericApiService.postWithDifferentResponse<
      RelayConfigurationRequestDTO,
      RelayConfigurationResponseDTO
    >(`${this.baseHandlerUrl}/enable`, configuration);
  }
  static async powerOff(
    configuration: RelayConfigurationRequestDTO
  ): Promise<RelayConfigurationResponseDTO> {
    return await GenericApiService.postWithDifferentResponse<
      RelayConfigurationRequestDTO,
      RelayConfigurationResponseDTO
    >(`${this.baseHandlerUrl}/disable`, configuration);
  }
  private static baseHandlerUrl = 'api/v1/relay';

  public static async retrieveRelays(): Promise<Array<DeviceDTO>> {
    return await GenericApiService.get<Array<DeviceDTO>>(
      `${this.baseHandlerUrl}/devices`
    );
  }

  public static async getConfiguration(
    data: RelayConfigurationRequestDTO
  ): Promise<RelayConfigurationResponseDTO> {
    return await GenericApiService.postWithDifferentResponse<
      RelayConfigurationRequestDTO,
      RelayConfigurationResponseDTO
    >(`${this.baseHandlerUrl}/configuration`, data);
  }
}
