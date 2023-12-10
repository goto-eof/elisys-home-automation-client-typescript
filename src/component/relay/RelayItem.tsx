import {Box, VStack} from "@chakra-ui/react";
import {FaLightbulb} from "react-icons/fa";
import RelayConfigurationResponseDTO from "../../dto/RelayConfigurationResponseDTO";
import DeviceDTO from "../../dto/DeviceDTO";

export default function RelayItem({switchRelay, configuration, device}: {
    switchRelay: (configuration: RelayConfigurationResponseDTO) => void,
    configuration: RelayConfigurationResponseDTO,
    device: DeviceDTO
}) {
    return (
        <VStack userSelect={'none'} cursor={"pointer"} onClick={() => switchRelay(configuration)} boxShadow={'base'} backgroundColor={'blackAlpha.200'} p={4}
                borderRadius={'md'}>
            <Box>
                <FaLightbulb
                    color={configuration?.powerOn ? 'red' : 'green'}
                    fontSize={'5em'}
                />
            </Box>
            <Box fontSize={'0.5em'}>
                Status: {configuration?.powerOn ? 'ON' : 'OFF'}
            </Box>
            {/* <Box fontSize={'0.5em'}>({macAddress})</Box> */}
            {device && <Box>{device.name}</Box>}
            {device && <Box>{device.description}</Box>}
        </VStack>);
}