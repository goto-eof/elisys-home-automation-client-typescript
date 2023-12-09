import {
  Box,
  Text,
  SimpleGrid,
  HStack,
  VStack,
  Heading,
  Center,
} from '@chakra-ui/react';
import WeatherStationService from '../service/WeatherStationService';
import { useEffect, useState } from 'react';
import DeviceDTO from '../dto/DeviceDTO';
import { Link } from 'react-router-dom';
import { FaCloudSunRain } from 'react-icons/fa';

export default function WeatherStationDevices() {
  let [devices, setDevices] = useState<Array<DeviceDTO>>();

  useEffect(() => {
    retrieveSummary();
  }, []);

  const retrieveSummary = async () => {
    let stations = await WeatherStationService.retrieveWeatherStations();
    setDevices(stations);
  };

  return (
    <Box p={10}>
      <Heading color={'green.400'}>
        <HStack>
          <Center>
            <FaCloudSunRain />
            <Text> Weather Stations</Text>
          </Center>
        </HStack>
      </Heading>
      <SimpleGrid columns={{ base: 2, md: 4, lg: 4 }} spacing={4}>
        {devices &&
          devices.map((device) => (
            <Box key={device.macAddress} boxShadow={'md'} p={5}>
              <Link
                key={device.macAddress}
                to={`/weather-station/${device.macAddress}`}
              >
                <VStack textAlign={'left'} key={'station-' + device.macAddress}>
                  <FaCloudSunRain fontSize={'10em'} />
                  <Text>{device.name}</Text>
                  <Text>{device.description}</Text>
                </VStack>
              </Link>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
}
