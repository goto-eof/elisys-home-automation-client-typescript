import { Route, Routes } from 'react-router-dom';
import WeatherStationDevices from './WeatherStationDevices';
import Last24hWeatherSummary from './Last24hWeatherSummary';
import { VStack } from '@chakra-ui/react';
import Home from './Home';

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
      </Routes>
    </VStack>
  );
}
