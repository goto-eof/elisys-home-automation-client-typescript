import {Box, Stat, StatGroup, StatLabel, StatNumber} from "@chakra-ui/react";

export default function SensorSummary({
                                          minimum,
                                          maximum,
                                          average,
                                          last,
                                          title,
                                          lastDate, minimumDate, maximumDate
                                      }: {
    minimum: number;
    maximum: number;
    average: number;
    last: number;
    lastDate: Date;
    minimumDate: Date,
    maximumDate: Date,
    title: string;
}) {
    return (
        <StatGroup>
            <Stat>
                <StatLabel>Minimum {title}</StatLabel>
                <Box fontSize={'0.5em'}>{minimumDate.toISOString()}</Box>
                <StatNumber>{minimum}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel minH={'0em'}>Last {title}</StatLabel>
                <Box fontSize={'0.5em'}>{lastDate.toISOString()}</Box>
                <StatNumber>{last}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel>Maximum {title}</StatLabel>
                <Box fontSize={'0.5em'}>{maximumDate.toISOString()}</Box>
                <StatNumber>{maximum}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel>Average {title}</StatLabel>
                <StatNumber>{average}</StatNumber>
            </Stat>
        </StatGroup>
    );
}
