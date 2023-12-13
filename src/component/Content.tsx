import { Route, Routes } from 'react-router-dom';
import WeatherStationDevices from './weatherStation/WeatherStationDevices';
import WeatherSummary from './weatherStation/WeatherSummary';
import { VStack } from '@chakra-ui/react';
import Home from './Home';
import RelayPanel from './relay/RelayPanel';
import RelaysPanel from "./relay/RelaysPanel";

export default function Content() {
  return (
    <VStack top="50px" left={[0]} w={['100%']} h="auto" p={10}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather-station" element={<WeatherStationDevices />} />
        <Route
          path="/weather-station/:macAddress"
          element={<WeatherSummary />}
        />
          <Route path="/relay/:macAddress" element={<RelayPanel />} />
          <Route path="/relay/all" element={<RelaysPanel />} />
      </Routes>
    </VStack>
  );
}
