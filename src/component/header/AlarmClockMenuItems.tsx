import {HStack, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FaClock, FaLightbulb} from "react-icons/fa";
import DeviceDTO from "../../dto/DeviceDTO";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import AlarmClockService from "../../service/AlarmClockService";

export default function AlarmClockMenuItems() {

    const [deviceList, setDeviceList] = useState<Array<DeviceDTO>>([]);

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        const deviceList = await AlarmClockService.retrieveAlarmClockList();
        setDeviceList(deviceList);
    };

    return (
        <Menu>
            <MenuButton
                p={2}
            >
                <HStack>
                    <FaClock/>
                    <Text>Alarm Clocks</Text>
                </HStack>
            </MenuButton>
            <MenuList>
                {deviceList &&
                    deviceList.map((device: DeviceDTO) => (
                        <Link
                            key={'alarm-clock-menu-item-' + device.macAddress}
                            to={`/alarm-clock/${device.macAddress}`}
                        >
                            <MenuItem>
                                <FaClock/>
                                <Text ml={3}>{device.name}</Text>
                            </MenuItem>
                        </Link>
                    ))}
            </MenuList>
        </Menu>
    );
}