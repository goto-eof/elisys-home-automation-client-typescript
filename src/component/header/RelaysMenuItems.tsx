import {useEffect, useState} from "react";
import DeviceDTO from "../../dto/DeviceDTO";
import RelayService from "../../service/RelayService";
import {HStack, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FaCloudSunRain, FaLightbulb} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function RelaysMenuItems() {
    let [relayList, setRelayList] = useState<Array<DeviceDTO>>([]);
    useEffect(() => {
        retrieveRelays();
    }, []);
    const retrieveRelays = async () => {
        let relays = await RelayService.retrieveRelays();
        setRelayList(relays);
    };
    return (
        <Menu>
            <MenuButton
                p={2}
            >
                <HStack>
                    <FaLightbulb />
                    <Text>Relays</Text>
                </HStack>
            </MenuButton>
            <MenuList>
                <Link
                    key={'relay-menu-item-all' }
                    to={`/relay/all`}
                >
                    <MenuItem>
                        <FaLightbulb />
                        <Text ml={3}>All relays</Text>
                    </MenuItem>
                </Link>
                {relayList &&
                    relayList.map((device: DeviceDTO) => (
                        <Link
                            key={'relay-menu-item-' + device.macAddress}
                            to={`/relay/${device.macAddress}`}
                        >
                            <MenuItem>
                                <FaLightbulb />
                                <Text ml={3}>{device.name}</Text>
                            </MenuItem>
                        </Link>
                    ))}
            </MenuList>
        </Menu>
    );
}