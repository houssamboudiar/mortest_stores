import * as React from 'react';
import {  Avatar, Box, Divider, Heading, Text, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Stat, StatLabel, StatNumber, StatGroup, Button, Icon, useDisclosure} from '@chakra-ui/react'
import { IClient } from '../../../reducers/fournisseurclientReducer';
import { MdEdit, MdDelete } from 'react-icons/md';
import { deleteProduct } from '../../../product/productActions';
import { EditClient } from './EditClient';
import { deleteClient } from '../../../actions/fournisseurclientActions';
import { useDispatch } from 'react-redux';

interface IProps {
       client: IClient;
}

export const ClientsList: React.FC<IProps> = (props:IProps) => {
    const {
        isOpen:isOpenEdit ,
        onOpen:onOpenEdit,
        onClose:onCloseEdit,
    } = useDisclosure() 
    const dispatch = useDispatch();
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
                <EditClient 
                    chosenClient={props.client} 
                    onOpenEdit={onOpenEdit} 
                    isOpenEdit={isOpenEdit} 
                    onCloseEdit={onCloseEdit} 
                />
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
                        <Box w="100%" display="flex" justifyContent="flex-end">
                        <Button 
                                onClick={onOpenEdit}
                                margin="0"
                                bg="P3White" 
                                color="P1yellow"
                                fontWeight="bold"
                                _hover={{ color: "#fbd28e" , bg: "#f8f8f8" }} 
                                _active={{ color : "#fea40f" }}
                                _focus={{border:"0px"}}
                                _disabled={{color:"#fbd28e"  }}>
                            <Icon as={MdEdit} w={5} h={5} />
                        </Button>
                        <Button  
                                onClick={()=>{dispatch(deleteClient(props.client.id));}}
                                bg="P3White" 
                                color="P1red"
                                fontWeight="bold"
                                _hover={{ color: "#fa958c" , bg: "#f8f8f8" }} 
                                _active={{ color : "#fa3422"}}
                                _focus={{border:"0px"}}
                                _disabled={{color:"#fbd28e"}}>
                            <Icon as={MdDelete} w={5} h={5} />
                        </Button>
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

