import {Box, Button, FormControl, FormLabel, Heading, HStack, Input, Text, useToast} from "@chakra-ui/react";
import DeviceDTO from "../dto/DeviceDTO";
import {useEffect, useState} from "react";
import DeviceService from "../service/DeviceService";
import DeviceType from "../dto/DeviceType";

export default function DevicePanel({macAddress, type}: { type: DeviceType, macAddress: string }) {

    useEffect(() => {
        loadDevice();
    }, [macAddress]);

    const loadDevice = async () => {

        let device: DeviceDTO = await DeviceService.retrieveDevice({
            macAddress: macAddress,
            type: type
        })
        setDevice(device);
        setFormData({name: device.name, description: device.description});
    };

    const [device, setDevice] = useState<DeviceDTO>();

    const [formData, setFormData] = useState<{ name: string, description: string }>({
        name: "",
        description: DeviceType.Uknown
    });

    const updateValue = (event: any) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };
    const toast = useToast();

    const submit = async (e: any) => {
        e.preventDefault();
        try {
            let deviceUpdated: DeviceDTO = await DeviceService.update({
                ...device!,
                name: formData.name,
                description: formData.description
            });
            toast({
                title: 'Success!',
                description: "Device information updated successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (e: any) {
            toast({
                title: 'Error',
                description: "Unable to update device information",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={3}>
            <Heading>Device</Heading>
            <Text fontSize={'0.6em'}>last Ack: {device?.lastAck ? device?.lastAck.toString() : ''}</Text>
            <form onSubmit={submit}>
                <HStack>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input value={formData.name} name={"name"} type={"text"}
                               onChange={updateValue}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input value={formData.description} name={"description"} type={"text"}
                               onChange={updateValue}/>
                    </FormControl>
                </HStack>
                <Button m={3} type={"submit"}>Submit</Button>
            </form>
        </Box>
    );
}