import {Box, Button, FormControl, FormLabel, Input, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import AlarmClockConfigurationResposeDTO from "../../dto/AlarmClockConfigurationResposeDTO";
import {useParams} from "react-router-dom";
import AlarmClockService from "../../service/AlarmClockService";
import DeviceType from "../../dto/DeviceType";
import AlarmClockConfigurationCronResponseDTO from "../../dto/AlarmClockConfigurationCronResponseDTO";

export default function AlarmClockPanel() {

    const {macAddress} = useParams();

    const [configuration, setConfiguration] = useState<AlarmClockConfigurationResposeDTO>();

    const [formData, setFormData] = useState<{
        timezoneSeconds: number,
        alarmIntervalMinutes: number
    }>({
        alarmIntervalMinutes: -1,
        timezoneSeconds: -1
    });

    useEffect(() => {
        loadConfiguration();
    }, []);

    const loadConfiguration = async () => {
        if (macAddress) {
            const configuration = await AlarmClockService.retrieveAlarmClockConfiguration({
                macAddress: macAddress!,
                type: DeviceType.AlarmClock
            });
            setConfiguration(configuration);
        }
    };


    const submitForm = (event: any) => {
        event.preventDefault();
    };

    const updateValue = (event: any) => {
        setFormData({...formData, [event.target.name]: Number(event.target.valueOf())})
    };

    return (
        <Box>
            <form onClick={submitForm}>
                <FormControl>
                    <FormLabel>Timezone seconds</FormLabel>
                    <Input name={"timezoneSeconds"} type={"number"} onChange={updateValue}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Buzz duration in minutes</FormLabel>
                    <Input name={"alarmIntervalMinutes"} type={"number"} onChange={updateValue}/>
                </FormControl>
                <FormLabel>Cron strings</FormLabel>
                {configuration?.cronList && configuration.cronList.map(cronItem => <CronItem
                    key={'cron-item-' + cronItem.id} cronItem={cronItem}/>)}
                {!configuration?.cronList && <Text>No data</Text>}
                <Button type={"submit"}>Submit</Button>
            </form>
        </Box>
    );
}


function CronItem({cronItem}: { cronItem: AlarmClockConfigurationCronResponseDTO }) {
    return (<Box>
        <FormControl>
            <FormLabel>Buzz time in minutes</FormLabel>
            <Input name={"cron-" + cronItem.id} type={"text"}/>
        </FormControl>
    </Box>);
}