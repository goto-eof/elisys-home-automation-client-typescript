import {Box, SimpleGrid, VStack} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RelayService from '../service/RelayService';
import RelayConfigurationRequestDTO from '../dto/RelayConfigurationRequest';
import DeviceType from '../dto/DeviceType';
import RelayConfigurationResponseDTO from '../dto/RelayConfigurationResponseDTO';
import { FaLightbulb } from 'react-icons/fa';
import DeviceDTO from '../dto/DeviceDTO';
import DeviceRequestDTO from '../dto/DeviceRequestDTO';
import DeviceService from '../service/DeviceService';

export default function RelayPanel() {
  let { macAddress } = useParams();
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
    <SimpleGrid columns={{base: 1}}>
      <VStack onClick={switchRelay} boxShadow={'base'} backgroundColor={'blackAlpha.200'} borderRadius={'md'} p={4}>
        <Box>
          <FaLightbulb
            color={configuration?.powerOn ? 'red' : 'green'}
            fontSize={'10em'}
          />
        </Box>
        <Box fontSize={'0.5em'}>
          Status: {configuration?.powerOn ? 'ON' : 'OFF'}
        </Box>
        {/* <Box fontSize={'0.5em'}>({macAddress})</Box> */}
        {device && <Box>{device.name}</Box>}
        {device && <Box>{device.description}</Box>}
      </VStack>
    </SimpleGrid>
  );
}
