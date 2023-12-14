import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import AlarmClockConfigurationResposeDTO from "../../dto/AlarmClockConfigurationResposeDTO";
import {useParams} from "react-router-dom";
import AlarmClockService from "../../service/AlarmClockService";
import DeviceType from "../../dto/DeviceType";
import AlarmClockConfigurationCronResponseDTO from "../../dto/AlarmClockConfigurationCronResponseDTO";
import {FaPlus, FaTrash} from "react-icons/all";
import AlarmClockConfigurationRequestDTO from "../../dto/AlarmClockConfigurationRequestDTO";
import DevicePanel from "../DevicePanel";

export default function AlarmClockPanel() {

    const {macAddress} = useParams();

    const [configuration, setConfiguration] = useState<AlarmClockConfigurationResposeDTO>();
    const [idx, setIdx] = useState<number>(0);
    const [formData, setFormData] = useState<{
        timezoneSeconds: number,
        alarmIntervalMinutes: number
    }>({
        alarmIntervalMinutes: -1,
        timezoneSeconds: -1
    });

    const [cronList, setCronList] = useState<Array<AlarmClockConfigurationCronResponseDTO>>([]);

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
            setFormData({
                alarmIntervalMinutes: configuration.alarmIntervalMinutes,
                timezoneSeconds: configuration.timezoneSeconds
            });
            setCronList(configuration.cronList);
        }
    };

    const toast = useToast();
    const submitForm = async (event: any) => {
        event.preventDefault();
        try {
            let newConfiguration: AlarmClockConfigurationResposeDTO = {
                ...configuration!,
                timezoneSeconds: formData.timezoneSeconds,
                alarmIntervalMinutes: formData.alarmIntervalMinutes,
                cronList: cronList
            };

            newConfiguration = await AlarmClockService.update(newConfiguration);
            setConfiguration(newConfiguration);
            toast({
                title: 'Success!',
                description: "Alarm clock configuration updated successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (e: any) {
            toast({
                title: 'Error',
                description: "Unable to update alarm clock configuration",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });

        }
    };

    const updateValue = (event: any) => {
        setFormData({...formData, [event.target.name]: Number(event.target.value)})
    };

    const updateItem = (cronItem: AlarmClockConfigurationCronResponseDTO) => {
        setCronList(cronList.map(cron => {
            if (cron.id === cronItem.id && cron._idx === cronItem._idx) {
                return cronItem;
            } else {
                return cron;
            }
        }));
    };

    const removeItem = (cronItem: AlarmClockConfigurationCronResponseDTO) => {
        setCronList(cronList.filter(item => item.id !== cronItem.id));
    };

    const newItem = () => {
        console.log(cronList);
        const crons = [...cronList];
        crons.unshift({
            cron: "",
            id: undefined,
            description: "",
            _idx: idx
        });
        setIdx(idx + 1);
        setCronList(crons)
    };


    return (
        <Box w={'full'}>
            <DevicePanel type={DeviceType.AlarmClock} macAddress={macAddress!}/>
            <Heading>Alarm clock</Heading>
            <form style={{width: '100%'}} onSubmit={submitForm}>
                <HStack>
                    <FormControl mr={2}>
                        <FormLabel>Timezone seconds</FormLabel>
                        <Input value={formData.timezoneSeconds} name={"timezoneSeconds"} type={"number"}
                               onChange={updateValue}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Buzz duration in minutes</FormLabel>
                        <Input value={formData.alarmIntervalMinutes} name={"alarmIntervalMinutes"} type={"number"}
                               onChange={updateValue}/>
                    </FormControl>
                </HStack>
                <Heading>
                    <HStack p={2}>
                        <Text>Cron strings</Text>
                        <IconButton aria-label={"New"} onClick={() => {
                            newItem()
                        }} icon={<FaPlus/>}/>
                        <Button ml={2} type={"submit"}>Submit</Button>
                    </HStack>
                </Heading>
                {cronList && cronList.map((cronItem: AlarmClockConfigurationCronResponseDTO, index: number) =>
                    <CronItem removeItem={removeItem}
                              updateItem={updateItem}
                              key={'cron-item-' + index} cronItem={cronItem}/>)}
                {!configuration?.cronList && <Text>No data</Text>}
                <Button type={"submit"}>Submit</Button>
            </form>
        </Box>
    );
}


function CronItem({cronItem, removeItem, updateItem}: {
    cronItem: AlarmClockConfigurationCronResponseDTO,
    removeItem: (item: AlarmClockConfigurationCronResponseDTO) => void,
    updateItem: (item: AlarmClockConfigurationCronResponseDTO) => void
}) {

    const updateValue = (e: any) => {
        const value = e.target.value;
        const newCronItem = {...cronItem, cron: value};
        updateItem(newCronItem);
    };

    const updateDescription = (e: any) => {
        const value = e.target.value;
        const newCronItem = {...cronItem, description: value};
        updateItem(newCronItem);
    };

    return (<Box w={'full'}>
        <FormControl w={'full'}>
            <HStack p={2} w={'full'}>
                <VStack w={'full'}>
                    <FormLabel>Cron time</FormLabel>
                    <Input mr={3} onChange={updateValue} name={"cron-" + cronItem.id} value={cronItem.cron}
                           type={"text"}/>
                </VStack>
                <VStack>
                    <FormLabel>Description</FormLabel>
                    <Input mr={3} onChange={updateDescription} name={"desc-" + cronItem.id} value={cronItem.description}
                           type={"text"}/>
                </VStack>
                <VStack>
                    <FormLabel>Actions</FormLabel>
                    <IconButton aria-label={"Delete"} onClick={() => {
                        removeItem(cronItem)
                    }} icon={<FaTrash/>}/>
                </VStack>

            </HStack>

        </FormControl>
    </Box>);
}