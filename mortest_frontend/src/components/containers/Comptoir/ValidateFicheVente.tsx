import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody, useDisclosure, useToast, Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
// import AddProductForm from './AddProductForm'
// import 'react-day-picker/lib/style.css';
import { connect, useDispatch } from 'react-redux';
import { IAppState, useTypedSelector } from '../../../store/store';
import { IProduct } from '../../../product/productReducer';
import { MdEdit, MdDelete, MdCreate } from "react-icons/md"
import { getSPFamilleMarque, ProductActionTypes } from '../../../product/productActions';
import axios from 'axios';
import { ValidateFicheVenteForm } from './ValidateFicheVenteForm';
import { IItem } from '../../../cart/cartReducers';
// import {EditStudent} from './EditStudent'
// import download from 'downloadjs'
// import Axios from 'axios'

// Create the containers interface
interface IProps {
       isOpen:any,
       onOpen:any,
       onClose:any,
       items:any,
}

interface FormInputs {
}

export const ValidateFicheVente: React.FC<IProps> = (props:IProps) => {

       const toast = useToast();
       const { selectedSpoint } = useTypedSelector((state) => state.spointState);
       const { selectedCaisse } = useTypedSelector((state) => state.caisseState);
       const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>();

       let ficheVenteProducts = (items:any) => {
              const p = new Array();
              items.forEach((element:IItem,i:any) => {
                     p.push({
                            "id": i+1,
                            "depot": 1,
                            "produit": element.item.id,
                            "quantite": element.qty,
                            "numero_lot": 1,
                            "prix": element.price,
                     })
              });
              return p;
       }

       let totalPrice = (items:any) => {
              let tp=0
              items.forEach((element:IItem) => {
                     tp = tp + element.price;
              });
              return tp;
       }

       const onSubmit = (data:any) => {
              console.log(data)
              const validatedProductData = {
                     selling_point: selectedSpoint.id,
                     type_fiche: data.type_fiche,
                     client: parseInt(data.client),
                     type_client: data.type_client,
                     type_payment: data.type_payment,
                     montant_reg_client: parseInt(data.montant_reg_client),
                     caisse: selectedCaisse.id,
                     observation: data.observation,
                     totalachats: totalPrice(props.items),
                     produits: ficheVenteProducts(props.items),
              }
              console.log(validatedProductData)
              registerFicheVente(validatedProductData)
              props.onClose()
        };
 
        /** 
        * Send axios post request then shows a toast depending on its status 
        * */
       async function registerFicheVente(data: any) {
              dispatch({type:ProductActionTypes.ADD_PRODUCT})
              let access = localStorage.getItem('access token') as string ;
              axios.defaults.headers.common = {'Authorization': `Bearer ${access}`}
              const res = await axios.post('http://127.0.0.1:8000/api/venteclient_get_post', data)
              if (res.status == 201) {
                     toast({
                            position: "bottom-left",
                            render: () => (
                                   <Box p="4" color="white" display="flex" w="100%" bg="P3green" borderRadius="7px">
                                          <Center h="100%" >
                                                 <Icon as={MdCreate} w={8} h={8} />
                                          </Center>
                                          <Box w="100%" flexDir="row" >
                                                 <Heading size="md" color="white" marginTop="1" marginLeft="3" marginBottom="3" >
                                                        Fiche Vente Registration
                                                 </Heading>
                                                 <Text size="md" color="white" marginLeft="3" w="100%" >
                                                        The file has been added successfully
                                                 </Text>
                                          </Box>
                                   </Box>
                            ),
                            duration: 5000,
                     })
              } else {
                     toast({
                            position: "bottom-left",
                            render: () => (
                                   <Box p="4" color="white" display="flex" w="100%" bg="P1red" borderRadius="7px">
                                          <Center h="100%" >
                                                 <Icon as={MdDelete} w={8} h={8} />
                                          </Center>
                                          <Box w="100%" flexDir="row" >
                                                 <Heading size="md" color="white" marginTop="1" marginLeft="3" marginBottom="3" >
                                                        Fiche Vente Registration
                                                 </Heading>
                                                 <Text size="md" color="white" marginLeft="3" w="100%" >
                                                        Unable to add this product
                                                 </Text>
                                          </Box>
                                   </Box>
                            ),
                            duration: 700,
                     })
              }
       }
       const dispatch = useDispatch();
       const {clients} = useTypedSelector((state) => state.clientState);
       const {depots} = useTypedSelector((state) => state.depotState);
       
       useEffect(()=>{
              dispatch(getSPFamilleMarque())
       },[])
       
       return (
              <Drawer
              size="xs"
              isOpen={props.isOpen}
              onClose={props.onClose}
              placement="right"
              >
                     <DrawerOverlay>
                            <DrawerContent bg="MainBg">
                                   <DrawerHeader>
                                          <Box display="flex" paddingTop="0.5rem" paddingBottom="0.5rem" >
                                                 <Center>
                                                        <Heading size="md" fontWeight="500" color="P3DarkBlueText" >Fiche Vente Registration</Heading>
                                                 </Center>
                                          </Box>
                                   </DrawerHeader>
                                   <Divider color="P3IconGray"></Divider>

                                   <ValidateFicheVenteForm
                                          register={register}
                                          handleSubmit={handleSubmit}
                                          onSubmit={onSubmit}
                                          errors={errors}
                                          clients={clients} 
                                          depots={depots}                                   
                                   />

                                   <Divider color="P3IconGray"></Divider>
                                   <DrawerFooter>
                                          <form onSubmit={handleSubmit(onSubmit)}>
                                                 <Box paddingRight="2rem" >
                                                        <Button
                                                               border="0px"
                                                               size="sm"
                                                               marginRight="1rem"
                                                               variant="outline"
                                                               onClick={props.onClose}
                                                               color="P1red"
                                                               fontWeight="bold"
                                                               _hover={{ color: "#f89f96" }}
                                                               _active={{ color: "#f63927" }}
                                                               _focus={{ border: "0px" }}
                                                               _disabled={{ color: "#fcbcb6" }}>
                                                               Cancel
                                                        </Button>
                                                        <Button marginRight="1rem"
                                                               type="submit"
                                                               size="sm"
                                                               bg="P1Blue"
                                                               color="P3White"
                                                               fontWeight="bold"
                                                               _hover={{ bg: "#6abcf0" }}
                                                               _active={{ bg: "#0080d1" }}
                                                               _focus={{ border: "0px" }}
                                                               _disabled={{ bg: "#aed8f3" }}>
                                                               Submit
                                                        </Button>
                                                 </Box>
                                          </form>
                                   </DrawerFooter>
                            </DrawerContent>
                     </DrawerOverlay>
              </Drawer>
       )

}