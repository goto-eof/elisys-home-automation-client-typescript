import DeviceDTO from "./DeviceDTO";

export default interface RelayConfigurationResponseDTO {
    powerOn: boolean;
    _device?: DeviceDTO
}
