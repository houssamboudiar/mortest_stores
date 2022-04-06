
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { IAppState } from '../../../store/store';
import { IProduct } from '../../../product/productReducer';
import {  Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody ,useDisclosure ,useToast} from '@chakra-ui/react'
import { MdEdit, MdDelete, MdAdd, MdRemove } from "react-icons/md"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { AiFillFilePdf } from "react-icons/ai"
import { FaAddressCard } from "react-icons/fa"
import { deleteProduct } from '../../../product/productActions';
import { AddProduct } from './AddProduct';
import { EditProduct } from './EditProduct';
import { addItem, removeItem } from '../../../cart/cartActions';
import { IItem } from '../../../cart/cartReducers';
// import {EditStudent} from './EditStudent'
// import download from 'downloadjs'
// import Axios from 'axios'

// Create the containers interface
interface IProps {
  product:{   
    id:number,
    selling_point: number,
    reference: number,
    article: string,
    img: null,
    unit: number,
    famille: number,
    marque: number,
    prix_U_achat: number,
    prix_detail: number,
    prix_vente_gros: number,
    prix_vente_revendeur: number,
    prix_vente_autre: number,
    stock_alerte: null,
    stock_actuel: null,
    qtte: null,
    ancien_prix: null,
    marge_vente_detail: number,
    marge_vente_grossiste: number,
    marge_vente_revendeur: number,
    marge_vente_autre: number
  },
  inComptoir:boolean,
//   deleteProduct(id:number):void,
}

export const ProductList: React.FC<IProps> = (props:IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen:isOpenEdit ,
        onOpen:onOpenEdit,
        onClose:onCloseEdit,
      } = useDisclosure() 
    const dispatch = useDispatch();

    const addItemCart = () => {
        let item: IItem = {item:props.product,price:props.product.prix_U_achat,qty:1}
        dispatch(addItem(item))
    }

    const removeItemCart = () => {
        let item: IItem = {item:props.product,price:props.product.prix_U_achat,qty:1}
        dispatch(removeItem(item))
    }

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
                                
                            <EditProduct 
                                chosenProduct={props.product} 
                                onOpenEdit={onOpenEdit} 
                                isOpenEdit={isOpenEdit} 
                                onCloseEdit={onCloseEdit} 
                            />
                            
                            {/* <Modal size="5xl" isOpen={isOpen1} onClose={onClose1}>
                                <ModalOverlay />
                                <ModalContent > 
                                    <ModalHeader  fontSize="26px" color="P3DarkBlueText" fontWeight="500" fontFamily="body">Student Review</ModalHeader>
                                    <ModalCloseButton _focus="_disabled" />
                                    <ModalBody>
                                    <Box marginBottom="20px"  display="flex" flexDirection="row" >
                                        
                                            <Box marginLeft="35px" width="100%" display="flex" flexDir='column' >
                                                <Box width="100%" justifyContent="space-between"  display="flex" flexDir='column'>
                                                <Text marginTop="10px" fontSize="20px" color="P3DarkBlueText" fontFamily="body">Basic Informations</Text>
                                                    
                                                    <Box flexDir="row" display="flex">
                                                        <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                            <Text color="P2TableGray" fontFamily="body" >First Name:</Text> 
                                                            <Text fontWeight="bold" color="P2Black" fontFamily="body" >{props.student.firstName} </Text> 
                                                            
                                                        </Box>
                                                        <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                            <Text color="P2TableGray" fontFamily="body" >Last Name:</Text>
                                                            <Text fontWeight="bold" color="P2Black" fontFamily="body" >{props.student.lastName}</Text>
                                                        </Box>
                                                    </Box>
                                                    
                                                    <Box display="flex" flexDirection="row">
                                                        <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                            <Text color="P2TableGray" fontFamily="body" >Birthday:</Text> 
                                                            <Text fontWeight="bold" color="P2Black" fontFamily="body"> {props.student.dateBirth} </Text> 
                                                        </Box>
                                                            <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column"> 
                                                                <Text color="P2TableGray" fontFamily="body">Gender:</Text>
                                                                <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.sex}</Text>
                                                            </Box>
                                                    </Box>

                                            </Box>
                                            <Box width="100%" justifyContent="space-between"  display="flex" flexDir='column'>
                                                <Text marginTop="10px" fontSize="20px" color="P3DarkBlueText" fontFamily="body">Parental Informations</Text>
                                                    <Box display="flex" flexDirection="row">
                                                        
                                                        <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                            <Text color="P2TableGray" fontFamily="body" >Section:</Text>
                                                            <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.section}</Text>
                                                        </Box>
                                                        
                                                        <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                            <Text color="P2TableGray" fontFamily="body" >Email Parent:</Text> 
                                                            <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.parent[0].emailParent} </Text> 
                                                        </Box>
                                                    </Box>


                                            </Box>

                                            <Box justifyContent="space-between" marginTop="10px" display="flex" flex="1">
                                                
                                                <Box width="50%" justifyContent="space-between" marginTop="10px" display="flex" flex="1" flexDirection="column">


                                                    <Text color="P2TableGray" fontFamily="body">Father Name :</Text> 
                                                    <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.parent[0].firstNameFather + " " + props.student.parent[0].lastNameFather}   </Text> 
                                                </Box>
                                                <Box width="50%" justifyContent="space-between" marginTop="10px" display="flex" flex="1" flexDirection="column">

                                                        <Text color="P2TableGray" fontFamily="body">Mother Name:</Text> 
                                                        <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.parent[0].firstNameMother + " " + props.student.parent[0].lastNameMother} </Text> 

                                                </Box>

                                                
                                            </Box>
                                            
                                            <Box justifyContent="space-between" marginTop="10px" display="flex" flex="1" >

                                                
                                                        <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                            <Text color="P2TableGray" fontFamily="body" >Parent Number:</Text> 
                                                            <Text fontWeight="bold" color="P2Black" fontFamily="body"> {props.student.parent[0].phoneParent} </Text> 
                                                        </Box>

                                                        <Box width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                            <Text color="P2TableGray" fontFamily="body" >address:</Text> 
                                                            <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.address} </Text>
                                                        </Box>

                                            
                                                

                                        </Box>
                                        <Box width="100%" justifyContent="space-between"  display="flex" flexDir='column'>
                                                <Text marginTop="10px" fontSize="20px" color="P3DarkBlueText" fontFamily="body">Secondary Informations</Text>
                                                <Box justifyContent="space-between"  display="flex" flex="1">

                                                    <Box  width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                        <Text color="P2TableGray" fontFamily="body" >Allergies:</Text> 
                                                        <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.allergies} </Text>
                                                    </Box>
                                                    <Box  width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                        <Text color="P2TableGray" fontFamily="body" >Intolerances:</Text>
                                                        <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.intolerances}</Text>
                                                    </Box>
                                                    <Box  width="50%" justifyContent="space-between" marginTop="5px" display="flex" flex="1" flexDirection="column">
                                                        <Text color="P2TableGray" fontFamily="body">diseases:</Text>
                                                        <Text fontWeight="bold" color="P2Black" fontFamily="body">{props.student.diseases}</Text>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            
                                        </Box>
                                        <Box justifyContent="space-around" marginLeft="35px" marginRight="35px" display="flex" flexDirection="column">
                                                <Box>
                                                    <Avatar  size="3xl" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                                                    
                                                </Box>
                                                <Box >
                                                    <Text textAlign="center">Code Bare</Text>
                                                </Box>
                                            </Box>

                                    </Box>
                                    
                                    </ModalBody>
                                    <ModalFooter justifyContent="flex-end" alignItems="center" flexDir="row"  >
                                            <Box  margin="10px" >
                                                <Button 
                                                leftIcon={<AiFillFilePdf />}
                                                onClick={downloadFile}
                                                bg="P3DarkBlueText" 
                                                color="P3White"
                                                fontWeight="bold"
                                                _hover={{ bg: "#6abcf0" }} 
                                                _active={{ bg : "#0080d1"}}
                                                _focus={{border:"0px"}}
                                                _disabled={{bg:"#aed8f3"}}>Documents</Button>
                                            </Box>
                                            <Box margin="10px">
                                                <Button leftIcon={<FaAddressCard />}
                                                bg="P3DarkBlueText" 
                                                color="P3White"
                                                fontWeight="bold"
                                                _hover={{ bg: "#6abcf0" }} 
                                                _active={{ bg : "#0080d1"}}
                                                _focus={{border:"0px"}}
                                                _disabled={{bg:"#aed8f3"}}>Print Card</Button>
                                            </Box>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal> */}

                            {/* modal of delete  */}
                            
                            <Modal  isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                
                                <ModalContent top='10rem'>
                                <Center marginTop="10px">
                                    <Icon  color="P1red" as={IoIosCloseCircleOutline} w={20} h={20} />
                                </Center>
                                    
                                    <ModalBody>
                                    <Text marginBottom="15px" fontSize='25px' textAlign='center'>
                                        Are Your Sure?
                                            </Text>
                                    <Box textAlign="center" marginBottom="10px">
                                        <Text>You will not able to recover this product</Text>
                                    </Box>
                                    </ModalBody>
                                    <ModalFooter justifyContent='center'>
                                        <Button
                                        onClick={onClose}
                                        mr={10} 
                                        _focus={{ border: "0px" }}
                                        colorScheme="gray"
                                        >Cancel</Button>
                                        <Button
                                            onClick={()=>{
                                                // props.deleteProduct(props.product.id);
                                                dispatch(deleteProduct(props.product.id));
                                                onClose();
                                                }
                                            }
                                            bg="P1red"
                                            color="P3White"
                                            fontWeight="bold"
                                            _hover={{ bg: "P1red" }}
                                            _active={{ bg: "red.500" }}
                                            _focus={{ border: "0px" }}
                                            _disabled={{ color: "#fbd28e" }}>
                                    
                                        Delete
                                    </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>

                                <Avatar size="sm" fontWeight="400" name={props.product.article} />
                                <Box marginLeft="1rem" >
                                    <Text fontSize="lg" overflow="hidden" color="P2Black" >
                                        {props.product.article}
                                    </Text>
                                    <Text fontSize="xs" fontWeight="regular" color="P3Gray" >#{props.product.reference}</Text>
                                </Box>
                            </Box>
                            <Box  display="flex"  justifyContent="flex-end" >
                                <Stack  direction="row" spacing={7}>
                                    {props.inComptoir&&<>
                                    <Button 
                                            onClick={()=>{addItemCart()}}
                                            margin="0"
                                            bg="P3White" 
                                            color="P1Blue"
                                            fontWeight="bold"
                                            _hover={{ color: "#fbd28e" , bg: "#f8f8f8" }} 
                                            _active={{ color : "#fea40f" }}
                                            _focus={{border:"0px"}}
                                            _disabled={{color:"#fbd28e"  }}>
                                        <Icon as={MdAdd} w={5} h={5} />
                                    </Button>
                                    {/* <Button  
                                            onClick={()=>{removeItemCart()}}
                                            bg="P3White" 
                                            color="P1red"
                                            fontWeight="bold"
                                            _hover={{ color: "#fa958c" , bg: "#f8f8f8" }} 
                                            _active={{ color : "#fa3422"}}
                                            _focus={{border:"0px"}}
                                            _disabled={{color:"#fbd28e"}}>
                                        <Icon as={MdRemove} w={5} h={5} />
                                    </Button> */}
                                    </>}
                                    {!props.inComptoir&&<>
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
                                            onClick={()=>{dispatch(deleteProduct(props.product.id));}}
                                            // onClick={onOpen}
                                            bg="P3White" 
                                            color="P1red"
                                            fontWeight="bold"
                                            _hover={{ color: "#fa958c" , bg: "#f8f8f8" }} 
                                            _active={{ color : "#fa3422"}}
                                            _focus={{border:"0px"}}
                                            _disabled={{color:"#fbd28e"}}>
                                        <Icon as={MdDelete} w={5} h={5} />
                                    </Button>
                                    </>}
                                    
                                </Stack>
                        </Box>
                    </Box>
                </Center>
                <Divider color="P3IconGray"/>
            </Box>
        )
    }
}

// Grab the characters from the store and make them available on props

    // const toast = useToast()
    // const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure()
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const { isOpen:isOpen1, onOpen:onOpen1, onClose:onClose1 } = useDisclosure()
    /** 
     * Delete Student Request
     * */
    // async function deleteStudent () {
    //         const res =await server.delete(`/deleteStudent/${props.student._id}`)
    //         if(res.status==200){
    //             toast({
    //                 position: "bottom",
    //                 render: () => (
    //                     <Box p="4" color="white" display="flex" w="100%" bg="rgba(59, 153, 59, 0.8)" borderRadius="7px" p="5" >
    //                         <Center h="100%" >
    //                             <Icon as={MdDelete} w={8} h={8} />
    //                         </Center>
    //                         <Box w="100%" flexDir="row" >
    //                             <Heading size="md" color="white" marginTop="1" marginLeft="3" marginBottom="3" >
    //                                 Deletion Process
    //                             </Heading>
    //                             <Text size="md" color="white" marginLeft="3" w="100%" >
    //                                 Student has been deleted successfully
    //                             </Text>
    //                         </Box>
    //                     </Box>
    //                 ),
    //                 duration: 700,
    //             })
    //             props.fetchDataPage([]);
    //         }else{
    //             toast({
    //                 position: "bottom",
    //                 render: () => (
    //                     <Box p="4" color="white" display="flex" w="100%" bg="P1red" borderRadius="7px" p="5" >
    //                         <Center h="100%" >
    //                             <Icon as={MdDelete} w={8} h={8} />
    //                         </Center>
    //                         <Box w="100%" flexDir="row" >
    //                             <Heading size="md" color="white" marginTop="1" marginLeft="3" marginBottom="3" >
    //                                 Deletion Process
    //                             </Heading>
    //                             <Text size="md" color="white" marginLeft="3" w="100%" >
    //                                 Unable to delete this student
    //                             </Text>
    //                         </Box>
    //                     </Box>
    //                 ),
    //                 duration: 700,
    //             })
    //         }
    // }

    /** 
     * Delete Student Request
     * */
    // async function generateDocument(){
    //     const res =await server.get(`/generateDocument/${props.student._id}`)
    //     if(res.status==200){
    //         toast({
    //             position: "bottom",
    //             render: () => (
    //                 <Box p="4" color="white" display="flex" w="100%" bg="rgba(59, 153, 59, 0.8)" borderRadius="7px" p="5" >
    //                     <Center h="100%" >
    //                         <Icon as={MdDelete} w={8} h={8} />
    //                     </Center>
    //                     <Box w="100%" flexDir="row" >
    //                         <Heading size="md" color="white" marginTop="1" marginLeft="3" marginBottom="3" >
    //                             Document Download
    //                         </Heading>
    //                         <Text size="md" color="white" marginLeft="3" w="100%" >
    //                             Student document has been generated successfully
    //                         </Text>
    //                     </Box>
    //                 </Box>
    //             ),
    //             duration: 700,
    //         })
    //     }else{
    //         toast({
    //             position: "bottom",
    //             render: () => (
    //                 <Box p="4" color="white" display="flex" w="100%" bg="P1red" borderRadius="7px" p="5" >
    //                     <Center h="100%" >
    //                         <Icon as={MdDelete} w={8} h={8} />
    //                     </Center>
    //                     <Box w="100%" flexDir="row" >
    //                         <Heading size="md" color="white" marginTop="1" marginLeft="3" marginBottom="3" >
    //                             Download Process
    //                         </Heading>
    //                         <Text size="md" color="white" marginLeft="3" w="100%" >
    //                             Unable to download this student
    //                         </Text>
    //                     </Box>
    //                 </Box>
    //             ),
    //             duration: 700,
    //         })
    //     }
    // }

    // method
    // const downloadFile = () => {
    //     Axios({
    //         url: `http://localhost:5000/api/generateDocument/${props.student._id}`,
    //         method: 'GET',
    //         responseType: 'blob', // important
    //         }).then((response) => {
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', `${props.student.firstName}${props.student.lastName}.pdf`);
    //         document.body.appendChild(link);
    //         link.click();
    //         });
    // }
    /** 
     * Resturn LOADING until the data comes
     * */