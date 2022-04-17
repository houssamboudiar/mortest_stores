import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import {  Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody ,useDisclosure ,useToast, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from '@chakra-ui/react'
import { MdEdit, MdDelete, MdAdd, MdRemove } from "react-icons/md"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { deleteProduct } from '../../../product/productActions';
import { addItem, removeItem } from '../../../cart/cartActions';
import { IItem } from '../../../cart/cartReducers';
import { IFicheVente } from '../../../reducers/fournisseurclientReducer';

interface IProps {
       ficheVente:IFicheVente;
}

export const FicheVentesList: React.FC<IProps> = (props:IProps) => {

    if(props.ficheVente===undefined){
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
                            <Box w="95%" alignSelf="center" display="flex">
                                   <Avatar size="sm" fontWeight="400" name={props.ficheVente.type_fiche} />
                                   <Box marginLeft="1rem" >
                                          <Text fontSize="lg" overflow="hidden" color="P2Black" >
                                          Mohammed Mekhlof
                                          </Text>
                                          <Text fontSize="xs" fontWeight="regular" color="P3Gray" >#{props.ficheVente.date}</Text>
                                   </Box>
                            </Box>
                    </Box>
                            <AccordionIcon />
                     </AccordionButton>
                            <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                            </AccordionPanel>
              </AccordionItem>
            </Box>
        )
    }
}
