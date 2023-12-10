import { Box, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box>
      <Text>Elisys Home Automation Client</Text>
      <Text>
        Elisys Home Automation Client is the front-end side of the Elisys
        software suite. Currently it allows to control relays remotely and analyze information about Weather
        sensors. In particular, through Elisys Home Automation Client it is
        possible to visualize the minimum temperature/humidity/lux value,
        maximum temperature/humidity/lux value, average temperature/humidity/lux
        value and the last temperature/humidity/lux retrieved from sensors.
        Moreover, E.H.A.C. allows to visualize a chart of the last 24 hours of
        the temperature, humidity and lux.
      </Text>
    </Box>
  );
}
