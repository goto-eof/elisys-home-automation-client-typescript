import {Route, Routes} from 'react-router-dom';
import WeatherStationDevices from './weatherStation/WeatherStationDevices';
import Last24hWeatherSummary from './weatherStation/Last24hWeatherSummary';
import {VStack} from '@chakra-ui/react';
import Home from './Home';
import RelayPanel from './relay/RelayPanel';
import RelaysPanel from "./relay/RelaysPanel";
import AlarmClockPanel from "./alarmClock/AlarmClockPanel";

export default function Content() {
    return (
        <VStack top="50px" left={[0]} w={['100%']} h="auto" p={10}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/weather-station" element={<WeatherStationDevices/>}/>
                <Route
                    path="/weather-station/:macAddress"
                    element={<Last24hWeatherSummary/>}
                />
                <Route path="/relay/:macAddress" element={<RelayPanel/>}/>
                <Route path="/relay/all" element={<RelaysPanel/>}/>
                <Route path="/alarm-clock/:macAddress" element={<AlarmClockPanel/>}/>
            </Routes>
        </VStack>
    );
}
