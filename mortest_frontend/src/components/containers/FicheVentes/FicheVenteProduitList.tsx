
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { IAppState } from '../../../store/store';
import { IProduct } from '../../../product/productReducer';
import {  Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody ,useDisclosure ,useToast, Tag, TagLabel} from '@chakra-ui/react'
import { MdEdit, MdDelete, MdAdd, MdRemove } from "react-icons/md"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { AiFillFilePdf } from "react-icons/ai"
import { FaAddressCard } from "react-icons/fa"
import { deleteProduct } from '../../../product/productActions';
import { addItem, removeItem } from '../../../cart/cartActions';
import { IItem } from '../../../cart/cartReducers';
import { BiBasket, BiMoney } from 'react-icons/bi';
import { IFicheVenteProduit } from '../../../reducers/fournisseurclientReducer';
// import {EditStudent} from './EditStudent'
// import download from 'downloadjs'
// import Axios from 'axios'

// Create the containers interface
interface IProps {
    product:IFicheVenteProduit,
}

export const FicheVenteProduitList: React.FC<IProps> = (props:IProps) => {

    if(props.product===undefined){
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
                            // onClick={onOpen1}  
                            w="95%" 
                            alignSelf="center" 
                            display="flex" 
                            alignItems="center" >
                                <Avatar size="sm" fontWeight="400" name={props.product.article} />
                                <Box marginLeft="1rem" >
                                    <Text fontSize="lg" overflow="hidden" color="P2Black" >
                                        {props.product.article}
                                    </Text>
                                    <Text fontSize="xs" fontWeight="regular" color="P3Gray" >#{props.product.produit_reference}</Text>
                                </Box>
                            </Box>
                            <Box  display="flex"  justifyContent="flex-end" >
                                <Stack  direction="row" spacing={7}>
                                    <Box  display="flex"  justifyContent="flex-end" >
                                        <Box    alignSelf="center" 
                                                display="flex" 
                                                alignItems="center"
                                                marginLeft="1rem">
                                            <Tag size='lg' colorScheme='purple' borderRadius='full'>
                                                <Icon mr="3px" as={BiBasket} w={5} h={5} />
                                                <TagLabel fontWeight="light" >{props.product.quantite}</TagLabel>
                                            </Tag>
                                            <Tag marginLeft="1rem" size='lg' colorScheme='green' borderRadius='full'>
                                                <Icon mr="3px" as={BiMoney} w={5} h={5} />
                                                <TagLabel fontWeight="light" >{props.product.prix} DA</TagLabel>
                                            </Tag>
                                        </Box>
                                    </Box>
                                </Stack>
                        </Box>
                    </Box>
                </Center>
                <Divider color="P3IconGray"/>
            </Box>
        )
    }
}