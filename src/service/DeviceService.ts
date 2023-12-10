import DeviceDTO from '../dto/DeviceDTO';
import DeviceRequestDTO from '../dto/DeviceRequestDTO';
import GenericApiService from './GenericApiService';

export default class DeviceService {
  static baseUrl: string = 'api/v1/device';

  public static async retrieveDevice(
    request: DeviceRequestDTO
  ): Promise<DeviceDTO> {
    return await GenericApiService.postWithDifferentResponse<
      DeviceRequestDTO,
      DeviceDTO
    >(`${this.baseUrl}/device`, request);
  }
}
