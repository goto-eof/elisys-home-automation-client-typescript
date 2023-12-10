import { Route, Routes } from 'react-router-dom';
import WeatherStationDevices from './WeatherStationDevices';
import Last24hWeatherSummary from './Last24hWeatherSummary';
import { VStack } from '@chakra-ui/react';
import Home from './Home';
import RelayPanel from './RelayPanel';
import RelaysPanel from "./RelaysPanel";

export default function Content() {
  return (
    <VStack top="50px" left={[0]} w={['100%']} h="auto" p={10}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather-station" element={<WeatherStationDevices />} />
        <Route
          path="/weather-station/:macAddress"
          element={<Last24hWeatherSummary />}
        />
          <Route path="/relay/:macAddress" element={<RelayPanel />} />
          <Route path="/relay/all" element={<RelaysPanel />} />
      </Routes>
    </VStack>
  );
}
