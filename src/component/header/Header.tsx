import {
    HStack,
    VStack,
    Text,
    Box,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {ColorModeSwitcher} from '../../ColorModeSwitcher';
import WeatherStationMenuItems from "./WeatherStationMenuItems";
import RelaysMenuItems from "./RelaysMenuItems";
import AlarmClockMenuItems from "./AlarmClockMenuItems";

export default function Header() {
    return (
        <VStack w={'full'} cursor="pointer" p={5} pl={5} borderBottom={'1px'}>
            <HStack w={'full'} h={'100%'} justifyContent={'space-between'}>
                <HStack w={'full'} justifyContent={'start'} h={'100%'}>
                    <Wrap justify={'center'}>
                        <WrapItem mr={10}>
                            <Link to="/" style={{width: '100%', height: '100%'}}>
                                <HStack>
                                    {' '}
                                    <FaHome fontSize={'2em'}/>
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
                            <WeatherStationMenuItems/>
                        </WrapItem>
                        <WrapItem>
                            <RelaysMenuItems/>
                        </WrapItem>
                        <Box>
                            <AlarmClockMenuItems/>
                        </Box>
                    </Wrap>
                </HStack>
                <HStack>
                    <Box>
                        <ColorModeSwitcher/>
                    </Box>
                </HStack>


            </HStack>
        </VStack>
    );
}


