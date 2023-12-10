import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import WeatherDTO from '../../dto/WeatherDTO';
import moment from 'moment';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function WeatherChart({
  weatherList,
  target,
  title,
  color,
}: {
  weatherList: Array<WeatherDTO>;
  target: 'temperature' | 'humidity' | 'pressure' | 'light';
  title: string;
  color: string;
}) {
  const labels = weatherList.map((w) =>
    moment(w.createdDate).format('DD-MMM-YYYY HH:mm:ss')
  );
  const [data] = useState({
    // type: 'bar',
    labels: labels,
    datasets: [
      {
        label: 'value by Date',
        data: weatherList.map((w) => {
          switch (target) {
            case 'temperature':
              return w.temperature;
            case 'humidity':
              return w.humidity;
            case 'pressure':
              return w.pressure;
            case 'light':
              return w.lux;
            default:
              return w.temperature;
          }
        }),
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Chart {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box>
            <Heading>{title}</Heading>
            <Line data={data} />
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
