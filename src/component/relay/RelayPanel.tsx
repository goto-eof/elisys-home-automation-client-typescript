import {Box} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import RelayService from '../../service/RelayService';
import RelayConfigurationRequestDTO from '../../dto/RelayConfigurationRequest';
import DeviceType from '../../dto/DeviceType';
import RelayConfigurationResponseDTO from '../../dto/RelayConfigurationResponseDTO';
import DeviceDTO from '../../dto/DeviceDTO';
import DeviceRequestDTO from '../../dto/DeviceRequestDTO';
import DeviceService from '../../service/DeviceService';
import RelayItem from "./RelayItem";

export default function RelayPanel() {
    let {macAddress} = useParams();
    let [configuration, setConfiguration] =
        useState<RelayConfigurationResponseDTO>();
    let [device, setDevice] = useState<DeviceDTO>();

    useEffect(() => {
        retrieveAndSetConfiguration();
        retrieveDeviceInformation();
    }, [macAddress]);

    const retrieveAndSetConfiguration =
        async (): Promise<RelayConfigurationResponseDTO> => {
            let request: RelayConfigurationRequestDTO = {
                macAddress: macAddress!,
                type: DeviceType.Relay,
            };
            let result = await RelayService.getConfiguration(request);
            setConfiguration(result);
            return result;
        };

    const retrieveDeviceInformation = async () => {
        let request: DeviceRequestDTO = {
            macAddress: macAddress!,
            type: DeviceType.Relay,
        };
        let response = await DeviceService.retrieveDevice(request);
        setDevice(response);
    };

    const switchRelay = async () => {
        let freshConfiguration = await retrieveAndSetConfiguration();
        if (freshConfiguration?.powerOn) {
            let result = await RelayService.powerOff({
                macAddress: macAddress!,
                type: DeviceType.Relay,
            });
            setConfiguration({
                powerOn: result.powerOn,
            });
        } else if (!freshConfiguration?.powerOn) {
            let result = await RelayService.powerOn({
                macAddress: macAddress!,
                type: DeviceType.Relay,
            });
            setConfiguration({
                powerOn: result.powerOn,
            });
        }
    };

    return (
        <Box>
            {device && configuration &&
                <RelayItem device={device!} switchRelay={switchRelay} configuration={configuration!}/>}
        </Box>
    );
}