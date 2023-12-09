import DeviceType from './DeviceType';

export default interface DeviceDTO {
  id: number;
  macAddress: string;
  name: string;
  description: string;
  type: DeviceType;
}
