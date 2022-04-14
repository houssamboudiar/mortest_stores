import * as React from 'react';
import {  Avatar, Box, Divider, Heading, Text, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Stat, StatLabel, StatNumber, StatGroup} from '@chakra-ui/react'
import { IClient } from '../../../reducers/fournisseurclientReducer';

interface IProps {
       client: IClient;
}

export const ClientsList: React.FC<IProps> = (props:IProps) => {

    if(props.client===undefined){
        return (
            <Box h="100%" w="100%" borderRadius="4px" overflow="hidden" bg="P3White">
                <Box p="6" >
                    <Heading>
                        Loading . . .
                    </Heading>
                </Box>
                <Divider color="P3IconGray"/>
            </Box>
        )
    }else{
        return (
            <Box   _hover={{ bg: "#f8f8f8" }} w="100%" borderRadius="4px" bg="P3White">
                <AccordionItem>
                    <AccordionButton>
                        <Box  marginTop="2" marginBottom="2" marginRight="6" marginLeft="6" display="flex" w="100%" >
                                <Box w="100%" display="flex" alignItems={'center'}>
                                    <Avatar size="md" fontWeight="600" name={props.client.nom} />
                                    <Box marginLeft="1rem">
                                        <Text fontSize="lg" overflow="hidden" fontWeight="bold" color="P2Black" >
                                        {props.client.nom}
                                        </Text>
                                        <Box textAlign={'start'} >
                                            <Text fontSize="xs" fontWeight="bold" color="P3Gray" >{props.client.type}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={0} >
                    </AccordionPanel>
              </AccordionItem>
            </Box>
        )
    }
}
