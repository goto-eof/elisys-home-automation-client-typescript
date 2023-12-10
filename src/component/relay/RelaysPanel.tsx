import {Box, SimpleGrid, VStack} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import RelayService from '../../service/RelayService';
import RelayConfigurationRequestDTO from '../../dto/RelayConfigurationRequest';
import DeviceType from '../../dto/DeviceType';
import RelayConfigurationResponseDTO from '../../dto/RelayConfigurationResponseDTO';
import {FaLightbulb} from 'react-icons/fa';
import DeviceDTO from '../../dto/DeviceDTO';
import DeviceRequestDTO from '../../dto/DeviceRequestDTO';
import DeviceService from '../../service/DeviceService';
import RelayItem from "./RelayItem";

export default function RelaysPanel() {
    let [configurations, setConfigurations] =
        useState<Array<RelayConfigurationResponseDTO>>();
    let [devices, setDevices] = useState<Array<DeviceDTO>>();

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        let devicesLoaded = await retrieveDevices();
        let configurationsLoaded = await retrieveConfigurations(devicesLoaded);
        setConfigurations(configurationsLoaded);
    };

    const retrieveDevices = async () => {
        let devices = await RelayService.retrieveRelays();
        setDevices(devices);
        return devices;
    };

    const retrieveConfigurations = async (devices: Array<DeviceDTO>): Promise<Array<RelayConfigurationResponseDTO>> => {
        let result = [];
        for (let device of devices) {
            result.push(await retrieveConfiguration(device));
        }
        return result;
    };

    const retrieveConfiguration = async (device: DeviceDTO) => {
        let result = await RelayService.getConfiguration({
            macAddress: device.macAddress,
            type: device.type
        });
        result._device = device;
        return result;
    };

    const updateConfigurations = (freshConfiguration: RelayConfigurationResponseDTO, oldConfiguration: RelayConfigurationResponseDTO) => {
        let arr = configurations?.map(config => {
            if (config._device!.macAddress === oldConfiguration._device!.macAddress) {
                freshConfiguration._device = oldConfiguration._device!;
                console.log('yahoooo: ' + freshConfiguration.powerOn);
                return freshConfiguration;
            }
            console.log("yabadabadoo: " + config.powerOn);
            return config;
        });
        console.log('ok');
        console.log(arr);
        setConfigurations(arr);
    };

    const switchRelay = async (configuration: RelayConfigurationResponseDTO) => {
        let requestData = {
            macAddress: configuration._device?.macAddress!,
            type: DeviceType.Relay,
        };

        let freshConfigurationRead = await retrieveConfiguration(configuration._device!);

        if (freshConfigurationRead?.powerOn) {
            let result = await RelayService.powerOff(requestData);
            if (!result.powerOn) {
                updateConfigurations(result, configuration);
            }
            return;
        }

        if (!freshConfigurationRead?.powerOn) {
            let result = await RelayService.powerOn(requestData);
            if (result.powerOn) {
                updateConfigurations(result, configuration);
            }
        }
    };

    return (
        <SimpleGrid columns={{base: 1, md: 2, lg: 5, xl: 6}} spacing={10}>
            {configurations && configurations.map(configuration =>
                <RelayItem switchRelay={switchRelay} configuration={configuration} device={configuration._device!}/>
            )}
        </SimpleGrid>
    );
}
