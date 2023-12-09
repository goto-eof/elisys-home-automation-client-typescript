import {
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaCloudSunRain, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useEffect, useState } from 'react';
import WeatherStationService from '../service/WeatherStationService';
import DeviceDTO from '../dto/DeviceDTO';

export default function Header() {
  return (
    <VStack w={'full'} cursor="pointer" p={5} pl={5} borderBottom={'1px'}>
      <HStack w={'full'} h={'100%'} justifyContent={'space-between'}>
        <HStack w={'full'} justifyContent={'start'} h={'100%'}>
          <Wrap justify={'center'}>
            <WrapItem mr={10}>
              <Link to="/" style={{ width: '100%', height: '100%' }}>
                <HStack>
                  {' '}
                  <FaHome fontSize={'2em'} />
                  <Text
                    textAlign={'left'}
                    ml={2}
                    fontSize={24}
                    fontWeight={500}
                  >
                    Elisys Home Automation
                  </Text>
                </HStack>
              </Link>
            </WrapItem>

            <WrapItem>
              <WeatherStationButtons />
            </WrapItem>
          </Wrap>
        </HStack>
        <HStack></HStack>
        <Box>
          <ColorModeSwitcher />
        </Box>
      </HStack>
    </VStack>
  );
}

function WeatherStationButtons() {
  let [stations, setStations] = useState<Array<DeviceDTO>>([]);
  useEffect(() => {
    retrieveWeatherStations();
  }, []);
  const retrieveWeatherStations = async () => {
    let stations = await WeatherStationService.retrieveWeatherStations();
    setStations(stations);
  };
  return (
    <Menu>
      <MenuButton
        borderBottomColor={'green.400'}
        borderBottomWidth={'3px'}
        p={2}
      >
        <HStack>
          <FaCloudSunRain />
          <Text>Weather Stations</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        {stations &&
          stations.map((device: DeviceDTO) => (
            <Link
              key={'weather-station-menu-item-' + device.macAddress}
              to={`/weather-station/${device.macAddress}`}
            >
              <MenuItem>
                <FaCloudSunRain />
                <Text ml={3}>{device.name}</Text>
              </MenuItem>
            </Link>
          ))}
      </MenuList>
    </Menu>
  );
}