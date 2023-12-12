import {useEffect, useState} from "react";
import DeviceDTO from "../../dto/DeviceDTO";
import WeatherStationService from "../../service/WeatherStationService";
import {HStack, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FaCloudSunRain} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function WeatherStationMenuItems() {
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