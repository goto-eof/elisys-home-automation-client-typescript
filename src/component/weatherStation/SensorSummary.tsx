import {Stat, StatGroup, StatLabel, StatNumber} from "@chakra-ui/react";

export default function SensorSummary({
                                          minimum,
                                          maximum,
                                          average,
                                          last,
                                          title,
                                      }: {
    minimum: number;
    maximum: number;
    average: number;
    last: number;
    title: string;
}) {
    return (
        <StatGroup>
            <Stat>
                <StatLabel>Minimum {title}</StatLabel>
                <StatNumber>{minimum}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel minH={'0em'}>Last {title}</StatLabel>
                <StatNumber>{last}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel>Maximum {title}</StatLabel>
                <StatNumber>{maximum}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel>Average {title}</StatLabel>
                <StatNumber>{average}</StatNumber>
            </Stat>
        </StatGroup>
    );
}
