import DeviceDTO from "../dto/DeviceDTO";
import GenericApiService from "./GenericApiService";
import AlarmClockConfigurationRequestDTO from "../dto/AlarmClockConfigurationRequestDTO";
import AlarmClockConfigurationResposeDTO from "../dto/AlarmClockConfigurationResposeDTO";

export default class AlarmClockService {
    private static baseHandlerUrl = 'api/v1/alarm-clock';

    public static async retrieveAlarmClockList(): Promise<Array<DeviceDTO>> {
        return await GenericApiService.get<Array<DeviceDTO>>(
            `${this.baseHandlerUrl}/devices`
        );
    }

    public static async retrieveAlarmClockConfiguration(requestData: AlarmClockConfigurationRequestDTO) {
        return GenericApiService.postWithDifferentResponse<AlarmClockConfigurationRequestDTO, AlarmClockConfigurationResposeDTO>(`${this.baseHandlerUrl}/configuration`, requestData);
    }


}