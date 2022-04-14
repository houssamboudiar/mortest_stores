import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody, useDisclosure, useToast, Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
// import AddProductForm from './AddProductForm'
// import 'react-day-picker/lib/style.css';
import { connect, useDispatch } from 'react-redux';
import { IAppState, useTypedSelector } from '../../../store/store';
import { IProduct } from '../../../product/productReducer';
import { MdEdit, MdDelete, MdCreate } from "react-icons/md"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { AiFillFilePdf } from "react-icons/ai"
import { FaAddressCard } from "react-icons/fa"
import { AddClientForm } from './AddClientForm';
import axios from 'axios';
import { ProductActionTypes } from '../../../product/productActions';
// import {EditStudent} from './EditStudent'
// import download from 'downloadjs'
// import Axios from 'axios'

// Create the containers interface
interface IProps {
       isOpen:any,
       onOpen:any,
       onClose:any,
}

interface FormInputs {
       firstName: string,
       selling_point: string,
       reference: number,
       article: string,
       img: null,
       unit: string,
       famille: number,
       marque: number,
       qtte: number,
       prix_U_achat: string,
       prix_detail: string,
       prix_vente_gros: string,
       prix_vente_revendeur: string,
       prix_vente_autre: string,
}

export const AddClient: React.FC<IProps> = (props:IProps) => {

       const toast = useToast();
       const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>();
       const [editedProduct, setEditedProduct] = useState({
              firstName: null,
              selling_point: null,
              reference: null,
              article: null,
              img: null,
              unit: null,
              famille: null,
              marque: null,
              qtte: null,
              prix_U_achat: null,
              prix_detail: null,
              prix_vente_gros: null,
              prix_vente_revendeur: null,
              prix_vente_autre: null,
       });

       const onSubmit = (data:any) => {
              const validatedProductData = {
                     selling_point: parseInt(data.selling_point),
                     reference: data.reference,
                     article: data.article,
                     img: null,
                     unit: data.unit,
                     famille: parseInt(data.famille),
                     marque: parseInt(data.marque),
                     qtte: parseInt(data.qty),
                     prix_U_achat: data.prixachat,
                     prix_detail: data.prixd,
                     prix_vente_gros: data.prixvg,
                     prix_vente_revendeur: data.prixvr,
                     prix_vente_autre: data.prixva,
              }
              console.log(validatedProductData)
              registerAddedProduct(validatedProductData)
              props.onClose()
        };
 
        /** 
        * Send axios post request then shows a toast depending on its status 
        * */
       async function registerAddedProduct(data: any) {
              dispatch({type:ProductActionTypes.ADD_PRODUCT})
              let access = localStorage.getItem('access token') as string ;
              axios.defaults.headers.common = {'Authorization': `Bearer ${access}`}
              const res = await axios.post('http://127.0.0.1:8000/api/produit_get_post', data)
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
                                                        Product Registration
                                                 </Heading>
                                                 <Text size="md" color="white" marginLeft="3" w="100%" >
                                                        The product has been added successfully
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
                                                        Product Registration
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
       const {selling_point, famille, marque} = useTypedSelector((state) => state.spfamillemarqueState);
       
       useEffect(()=>{
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
                                                        <Heading size="md" fontWeight="500" color="P3DarkBlueText" >Client Registration</Heading>
                                                 </Center>
                                          </Box>
                                   </DrawerHeader>
                                   <Divider color="P3IconGray"></Divider>

                                   <AddClientForm 
                                          selling_point={selling_point}
                                          famille={famille}
                                          marque={marque}
                                          register={register} 
                                          handleSubmit={handleSubmit} 
                                          onSubmit={onSubmit} 
                                          errors={errors} 
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