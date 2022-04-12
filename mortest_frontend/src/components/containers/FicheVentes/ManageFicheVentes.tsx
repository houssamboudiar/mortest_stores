import React, { useState, useEffect, useCallback, FC} from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Divider, Heading, Icon, Input, 
    InputGroup, InputLeftElement, propNames, Skeleton, Spinner, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { BsPlus, BsSearch } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IAppState, useTypedSelector } from '../../../store/store';
import { getAllProducts, getProductPage, getSPFamilleMarque, IProductGetAllAction, IProductGetSPFamilleMarqueAction, loadProduct } from '../../../product/productActions';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { any } from 'prop-types';
import { FaKeyboard } from 'react-icons/fa';
import faker from '@faker-js/faker';
import { IProductState, ISPFamilleMarqueProductState } from '../../../product/productReducer';
import { FicheVentesList } from './FicheVentesList';

interface IProps {

}

const ManageFicheVentes: React.FC<IProps> = (props:IProps) => {

       const {fichesVentes, loading} = useTypedSelector((state) => state.ficheVenteState);

       return (
              <Box display="flex" flexDir="column" height="80vh" w="100%" borderRadius="4px" overflow="hidden" bg="P3White" boxShadow="task" >
                     <Box paddingTop="10" paddingBottom="5" paddingRight="6" paddingLeft="6" display="flex" w="100%" >
                     <Heading size="lg" color="P3DarkBlueText" >Sales</Heading>
                     </Box>
                     <Box paddingRight="6" paddingBottom="8" paddingLeft="6" >
                     <InputGroup size="md">
                            <InputLeftElement pointerEvents="none" children={<BsSearch color="P1Blue" />} />
                            <Input  variant="filled" bg="#eaecee"  
                                   placeholder="Search"
                                   color="black"
                                   _placeholder={{color:"P1Blue"}}
                                   _hover={{ bg: "#f5f8fa" }} 
                                   _active={{ bg: "#f5f8fa"}}
                                   _focus={{bg: "#f5f8fa"}}
                                   _disabled={{bg:"#f5f8fa"}} />                
                     </InputGroup>
                     </Box>
                     <Divider color="P3IconGray"/>
                     <Box
                     itemID="scrollableDiv"
                     height="80vh"
                     overflow="auto"
                     display="flex"
                     flexDirection="column"
                     id="scrollableDiv">
                            <Accordion allowToggle>
                            {fichesVentes.map((fv:any,i) => {
                                   return <FicheVentesList ficheVente={fv} key={i} />
                            })}
                            </Accordion>
                     </Box>
              </Box>
       );
}

export default ManageFicheVentes;

