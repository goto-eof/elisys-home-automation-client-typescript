import AlarmClockConfigurationCronResponseDTO from "./AlarmClockConfigurationCronResponseDTO";

export default interface AlarmClockConfigurationResposeDTO {
    id: number;
    cronList: Array<AlarmClockConfigurationCronResponseDTO>;
    timezoneSeconds: number;
    alarmIntervalMinutes: number;
    iAmAliveEndpoint: string;
    iAmAliveIntervalSeconds: number;
}