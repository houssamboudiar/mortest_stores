import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import {  Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody ,useDisclosure ,useToast, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Tag, TagLabel, Stat, StatHelpText, StatLabel, StatNumber, StatGroup, Flex, useColorModeValue, StatArrow} from '@chakra-ui/react'
import { MdEdit, MdDelete, MdAdd, MdRemove } from "react-icons/md"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { deleteProduct } from '../../../product/productActions';
import { addItem, removeItem } from '../../../cart/cartActions';
import { IItem } from '../../../cart/cartReducers';
import { IFicheVente } from '../../../reducers/fournisseurclientReducer';
import { ProductList } from '../Product/ProductList';
import { FicheVenteProduitList } from './FicheVenteProduitList';
import { BiBasket, BiMoney } from 'react-icons/bi';
import { stat } from 'fs';
import { title } from 'process';

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
                                <Box w="100%" display="flex" alignItems={'center'}>
                                    <Avatar size="md" fontWeight="600" name={props.ficheVente.type_fiche} />
                                    <Box marginLeft="1rem">
                                        <Text fontSize="lg" overflow="hidden" fontWeight="bold" color="P2Black" >
                                        {props.ficheVente.client_name}
                                        </Text>
                                        <Box textAlign={'start'} >
                                            <Text fontSize="xs" fontWeight="bold" color="P3Gray" >#{props.ficheVente.date}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box w="100%" display="flex" justifyContent="flex-end">
                                    <StatGroup>
                                        <Stat textAlign={'start'}>
                                            <StatLabel fontSize="md" fontWeight="bold">Sold</StatLabel>
                                            <StatNumber fontSize="lg" whiteSpace={'nowrap'} >{props.ficheVente.client_solde} DA</StatNumber>
                                        </Stat>
                                        <Stat textAlign={'start'} marginLeft="6">
                                            <StatLabel fontSize="md" fontWeight="bold">Reste</StatLabel>
                                            <StatNumber whiteSpace={'nowrap'} fontSize="lg" >{props.ficheVente.reste_a_payer} DA</StatNumber>
                                        </Stat>
                                    </StatGroup>
                                </Box>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={0} >
                            {props.ficheVente.produits.map((p:any,i) => {
                                   return <FicheVenteProduitList product={p} key={i} />
                            })}
                    </AccordionPanel>
              </AccordionItem>
            </Box>
        )
    }
}
