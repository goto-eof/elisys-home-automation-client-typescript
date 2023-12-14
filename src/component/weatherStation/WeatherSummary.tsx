import {Box, Flex, Heading, HStack, IconButton, Text,} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import WeatherStationService from '../../service/WeatherStationService';
import WeatherRequestDTO from '../../dto/WeatherRequestDTO';
import WeatherSummaryDTO from '../../dto/WeatherSummaryDTO';
import {FaCalendar, FaCalendarDay, FaCalendarWeek, FaChartBar, FaChartLine, FaCloudSunRain} from 'react-icons/fa';
import WeatherChart, {ChartType} from './WeatherChart';
import WeatherDTO from '../../dto/WeatherDTO';
import {useParams} from 'react-router-dom';
import DeviceType from '../../dto/DeviceType';
import DeviceService from '../../service/DeviceService';
import SensorSummary from "./SensorSummary";
import DevicePanel from "../DevicePanel";


type ModeType = '24h' | '7d' | '1m';

export default function WeatherSummary() {
    let {macAddress} = useParams();
    const [mode, setMode] = useState<ModeType>('24h');
    useEffect(() => {
        retrieveSummary();
    }, [macAddress, mode]);

    const [weatherSummary, setWeatherSummary] = useState<WeatherSummaryDTO>();

    const [chart, setChart] = useState<Array<WeatherDTO>>();
    const [chartType, setChartType] = useState<ChartType>('line');
    const retrieveSummary = async () => {
        let station = await DeviceService.retrieveDevice({
            macAddress: macAddress!,
            type: DeviceType.WeatherStation,
        });

        let summary = await retrieveWeatherSummary(macAddress!);
        summary.name = station.name;
        summary.macAddress = station.macAddress;
        let chartsData = await retrieveChartsData(station.macAddress);
        setWeatherSummary(summary);
        setChart(chartsData);
    };

    const retrieveWeatherSummary = async (macAddress: string) => {
        let request: WeatherRequestDTO = {
            macAddress: macAddress,
            type: DeviceType.WeatherStation,
        };

        if (mode === '24h') {
            return await WeatherStationService.retrieveLast24hWeatherSummary(
                request
            );
        }

        if (mode === '7d') {
            return await WeatherStationService.retrieveLast7dWeatherSummary(
                request
            );
        }

        if (mode === '1m') {
            return await WeatherStationService.retrieveLast1mWeatherSummary(
                request
            );
        }

        return await WeatherStationService.retrieveLast24hWeatherSummary(
            request
        );
    };

    const retrieveChartsData = async (
        macAddress: string
    ): Promise<WeatherDTO[]> => {
        const request = {
            macAddress,
            type: DeviceType.WeatherStation,
        };

        if (mode === '24h') {
            return await WeatherStationService.retrieveLast24hWeatherList(request);
        }

        if (mode === '7d') {
            return await WeatherStationService.retrieveLast7dWeatherList(request);
        }

        if (mode === '1m') {
            return await WeatherStationService.retrieveLast1mWeatherList(request);
        }

        return await WeatherStationService.retrieveLast24hWeatherList(request);
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
                        <Flex color={'green.400'} p={3} justifyContent={'space-between'}>
                            <HStack>
                                <FaCloudSunRain/>
                                <Text>{weatherSummary.name}</Text>
                            </HStack>
                            <HStack px={4}>
                                <Box>
                                    <IconButton mx={1} color={mode === '24h' ? 'red' : ''} onClick={() => {
                                        setMode('24h')
                                    }} aria-label={'Last 24h'} icon={<FaCalendarDay/>}/>
                                    <IconButton mx={1} color={mode === '7d' ? 'red' : ''} onClick={() => {
                                        setMode('7d')
                                    }} aria-label={'Last 7 days'} icon={<FaCalendarWeek/>}/>
                                    <IconButton mx={1} color={mode === '1m' ? 'red' : ''} onClick={() => {
                                        setMode('1m')
                                    }} aria-label={'Last month'} icon={<FaCalendar/>}/>
                                </Box>
                                <Box ml={5}>
                                    <IconButton mx={1} color={chartType === 'line' ? 'red' : ''} onClick={() => {
                                        setChartType('line')
                                    }} aria-label={'Line chart'} icon={<FaChartLine/>}/>
                                    <IconButton mx={1} color={chartType === 'bar' ? 'red' : ''} onClick={() => {
                                        setChartType('bar')
                                    }} aria-label={'Bar chart'} icon={<FaChartBar/>}/>
                                </Box>
                            </HStack>
                        </Flex>
                    </Heading>
                    <Box boxShadow={'base'} p={3} mb={3}>
                        <SensorSummary
                            key={'temperature'}
                            title="Temperature"
                            average={weatherSummary.avgTemperature}
                            last={weatherSummary.lastTemperature}
                            maximum={weatherSummary.maxTemperature}
                            minimum={weatherSummary.minTemperature}
                            minimumDate={new Date(weatherSummary.minTemperatureDate)}
                            lastDate={new Date(weatherSummary.lastTemperatureDate)}
                            maximumDate={new Date(weatherSummary.maxTemperatureDate)}
                        />
                        {!!weatherSummary.macAddress && !!chart && (
                            <WeatherChart
                                chartType={chartType}
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
                            minimumDate={new Date(weatherSummary.minHumidityDate)}
                            lastDate={new Date(weatherSummary.lastHumidityDate)}
                            maximumDate={new Date(weatherSummary.maxHumidityDate)}
                        />
                        <WeatherChart
                            chartType={chartType}
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
                            minimumDate={new Date(weatherSummary.minLuxDate)}
                            lastDate={new Date(weatherSummary.lastLuxDate)}
                            maximumDate={new Date(weatherSummary.maxLuxDate)}
                        />
                        <WeatherChart
                            chartType={chartType}
                            target="light"
                            title="Light (Lux)"
                            color="yellow"
                            weatherList={chart!}
                        />
                    </Box>
                </Box>
            )}
            <DevicePanel type={DeviceType.WeatherStation} macAddress={macAddress!}/>
        </Box>
    );
}
