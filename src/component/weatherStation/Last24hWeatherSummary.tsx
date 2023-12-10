import {
  Box,
  HStack,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import WeatherStationService from '../../service/WeatherStationService';
import WeatherRequestDTO from '../../dto/WeatherRequestDTO';
import WeatherSummaryDTO from '../../dto/WeatherSummaryDTO';
import { FaHome } from 'react-icons/fa';
import WeatherChart from './WeatherChart';
import WeatherDTO from '../../dto/WeatherDTO';
import { useParams } from 'react-router-dom';
import DeviceType from '../../dto/DeviceType';
import DeviceService from '../../service/DeviceService';
import SensorSummary from "./SensorSummary";

export default function Last24hWeatherSummary() {
  let { macAddress } = useParams();

  useEffect(() => {
    retrieveSummary();
  }, [macAddress]);

  const [weatherSummary, setWeatherSummary] = useState<WeatherSummaryDTO>();

  const [chart, setChart] = useState<Array<WeatherDTO>>();

  const retrieveSummary = async () => {
    let station = await DeviceService.retrieveDevice({
      macAddress: macAddress!,
      type: DeviceType.WeatherStation,
    });
    let request: WeatherRequestDTO = {
      macAddress: station.macAddress,
      type: DeviceType.WeatherStation,
    };
    let summary = await WeatherStationService.retrieveTodayWeatherSummary(
      request
    );
    summary.name = station.name;
    summary.macAddress = station.macAddress;
    let chartsData = await retrieveChartsData(station.macAddress);
    setWeatherSummary(summary);
    setChart(chartsData);
  };

  const retrieveChartsData = async (
    macAddress: string
  ): Promise<WeatherDTO[]> => {
    return await WeatherStationService.retrieveWeatherListOfLast24h({
      macAddress,
      type: DeviceType.WeatherStation,
    });
  };

  return (
    <Box width={'full'}>
      {weatherSummary && (
        <Box
          key={'summary-' + weatherSummary.macAddress}
          boxShadow={'md'}
          p={3}
          borderRadius={'md'}
        >
          <Heading textAlign={'center'}>
            <HStack color={'green.400'} p={3}>
              <FaHome />
              <Text>{weatherSummary.name}</Text>
            </HStack>
          </Heading>
          <Box boxShadow={'base'} p={3} mb={3}>
            <SensorSummary
              key={'temperature'}
              title="Temperature"
              average={weatherSummary.avgTemperature}
              last={weatherSummary.lastTemperature}
              maximum={weatherSummary.maxTemperature}
              minimum={weatherSummary.minTemperature}
            />
            {!!weatherSummary.macAddress && !!chart && (
              <WeatherChart
                target="temperature"
                title="Temperature"
                color="rgb(153, 102, 255)"
                weatherList={chart}
              />
            )}
          </Box>
          <Box boxShadow={'base'} p={3} mb={3}>
            <SensorSummary
              title="Humidity"
              key={'humidity'}
              average={weatherSummary.avgHumidity}
              last={weatherSummary.lastHumidity}
              maximum={weatherSummary.maxHumidity}
              minimum={weatherSummary.minHumidity}
            />
            <WeatherChart
              target="humidity"
              title="Humidity"
              color="lime"
              weatherList={chart!}
            />
          </Box>
          <Box boxShadow={'base'} p={3} mb={3}>
            <SensorSummary
              title="Light (Lux)"
              key={'light'}
              average={weatherSummary.avgLux}
              last={weatherSummary.lastLux}
              maximum={weatherSummary.maxLux}
              minimum={weatherSummary.minLux}
            />
            <WeatherChart
              target="light"
              title="Light (Lux)"
              color="yellow"
              weatherList={chart!}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
