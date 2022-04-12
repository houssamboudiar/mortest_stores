import * as React from 'react';
import {  Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody ,useDisclosure ,useToast, Badge, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Tag, TagLabel} from '@chakra-ui/react'
import { MdAdd, MdRemove } from "react-icons/md"
import { IItem } from '../../../cart/cartReducers';
import { removeItem } from '../../../cart/cartActions';
import { useDispatch } from 'react-redux';
import { BiBasket, BiMoney, BiRefresh } from 'react-icons/bi';

// Create the containers interface
interface IProps {
  item:IItem
}

export const ItemList: React.FC<IProps> = (props:IProps) => {
    const dispatch = useDispatch();
    const removeItemCart = () => {
        let item: IItem = {item:props.item.item,price:props.item.item.prix_U_achat,qty:1}
        dispatch(removeItem(item))
    }

    if(props.item.item===undefined){
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
                <Center>
                    <Box  marginTop="2" marginBottom="2" marginRight="6" marginLeft="6" display="flex" w="100%" >
                            <Box 
                            w="95%" 
                            alignSelf="center" 
                            display="flex" 
                            alignItems="center" >
                                <Avatar size="sm" fontWeight="400" name={props.item.item.article} />
                                <Box marginLeft="1rem" >
                                    <Text fontSize="lg" overflow="hidden" color="P2Black" >
                                        {props.item.item.article}
                                    </Text>
                                    <Text fontSize="xs" fontWeight="regular" color="P3Gray" >#{props.item.item.reference}</Text>
                                </Box>
                            </Box>
                            <Box  display="flex"  justifyContent="flex-end" >
                                <Box    alignSelf="center" 
                                        display="flex" 
                                        alignItems="center"
                                        marginLeft="1rem">
                                    <Tag size='lg' colorScheme='purple' borderRadius='full'>
                                        <Icon mr="3px" as={BiBasket} w={5} h={5} />
                                        <TagLabel fontWeight="light" >{props.item.qty}</TagLabel>
                                    </Tag>
                                    <Tag marginLeft="1rem" size='lg' colorScheme='green' borderRadius='full'>
                                        <Icon mr="3px" as={BiMoney} w={5} h={5} />
                                        <TagLabel fontWeight="light" >{props.item.price} DA</TagLabel>
                                    </Tag>
                                </Box>
                                <Stack  direction="row" spacing={7}>
                                    <Button  
                                            onClick={()=>{removeItemCart()}}
                                            bg="P3White" 
                                            color="P1red"
                                            fontWeight="bold"
                                            _hover={{ color: "#fa958c" , bg: "#f8f8f8" }} 
                                            _active={{ color : "#fa3422"}}
                                            _focus={{border:"0px"}}
                                            _disabled={{color:"#fbd28e"}}>
                                        <Icon as={MdRemove} w={5} h={5} />
                                    </Button>
                                </Stack>
                            </Box>
                    </Box>
                </Center>
                <Divider color="P3IconGray"/>
            </Box>
        )
    }
}