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
import { AddProductForm } from './AddProductForm';
import { getSPFamilleMarque } from '../../../product/productActions';
import axios from 'axios';
// import {EditStudent} from './EditStudent'
// import download from 'downloadjs'
// import Axios from 'axios'

// Create the containers interface
interface IProps {
       // product: {
       //        selling_point: number,
       //        reference: number,
       //        article: string,
       //        img: null,
       //        unit: number,
       //        famille: number,
       //        marque: number,
       //        prix_U_achat: number,
       //        prix_detail: number,
       //        prix_vente_gros: number,
       //        prix_vente_revendeur: number,
       //        prix_vente_autre: number,
       //        stock_alerte: null,
       //        stock_actuel: null,
       //        qtte: null,
       //        ancien_prix: null,
       //        marge_vente_detail: number,
       //        marge_vente_grossiste: number,
       //        marge_vente_revendeur: number,
       //        marge_vente_autre: number
       // }
       isOpen:any,
       onClose:any,
}

interface FormInputs {
       firstName: string
}

export const AddProduct: React.FC<IProps> = (props:IProps) => {
       /** 
 * Component that handles student registration drawer and api request
 * */
       const toast = useToast();
       const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>();

       // const [studentPicture, setstudentPicture] = useState("")

       // const [student, setStudent] = useState({
       //        firstName: '',
       //        lastName: '',
       //        sex: 'Male',
       //        dateBirth: '',
       //        address: '',
       //        parent: {
       //               firstNameFather: '',
       //               lastNameFather: '',
       //               firstNameMother: '',
       //               lastNameMother: '',
       //               phoneParent: '',
       //               emailParent: '',
       //        },
       //        allergies: '',
       //        diseases: '',
       //        intolerances: '',
       // })
        // const handleFileRead = async (event) => {
        //        const file = event.target.files[0]
        //        console.log(file)
        //        const base64 = await convertBase64(file)
        //        setstudentPicture(base64)
        // }
 
        // const convertBase64 = (file) => {
        //        return new Promise((resolve, reject) => {
        //               const fileReader = new FileReader();
        //               fileReader.readAsDataURL(file)
        //               fileReader.onload = () => {
        //                      resolve(fileReader.result);
        //               }
        //               fileReader.onerror = (error) => {
        //                      reject(error);
        //               }
        //        })
        // }
        /** 
         * Collects and validates AddStudentForm data then send is as parameter on registerStudent
         * */
        const onSubmit = (data:any) => {
              const validatedProductData = {
                     selling_point: parseInt(data.sp),
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
              registerProduct(validatedProductData)
              props.onClose()
        };
 
        /** 
        * Send axios post request then shows a toast depending on its status 
        * */
       async function registerProduct(data: any) {
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
                                                        The New product has been added successfully
                                                 </Text>
                                          </Box>
                                   </Box>
                            ),
                            duration: 5000,
                     })
              } else {
                     toast({
                            position: "bottom",
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
              dispatch(getSPFamilleMarque())
       },[])
       
       return (
              <Drawer
                     size="xs"
                     isOpen={props.isOpen}
                     placement="right"
                     onClose={props.onClose}>
                     <DrawerOverlay>
                            <DrawerContent bg="MainBg">
                                   <DrawerHeader>
                                          <Box display="flex" paddingTop="0.5rem" paddingBottom="0.5rem" >
                                                 <Center>
                                                        <Heading size="md" fontWeight="500" color="P3DarkBlueText" >Product Registration</Heading>
                                                 </Center>
                                          </Box>
                                   </DrawerHeader>
                                   <Divider color="P3IconGray"></Divider>
                                   <AddProductForm 
                                          selling_point={selling_point}
                                          famille={famille}
                                          marque={marque}
                                          register={register} 
                                          handleSubmit={handleSubmit} 
                                          onSubmit={onSubmit} 
                                          errors={errors} />
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