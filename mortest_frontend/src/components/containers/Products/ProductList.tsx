
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
import { AddProduct } from './AddProduct';
import { EditProduct } from './EditProduct';
import { addItem, removeItem } from '../../../cart/cartActions';
import { IItem } from '../../../cart/cartReducers';
import { BiBasket, BiMoney } from 'react-icons/bi';
import { IFicheVenteProduit } from '../../../reducers/fournisseurclientReducer';
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
                                            bg="P3White" 
                                            color="#109cf1"
                                            fontWeight="bold"
                                            _hover={{ color: "#34aff9" }} 
                                            _active={{ color: "#098edf"}}
                                            _focus={{border:"0px"}}
                                            _disabled={{color:"#c2cfe0"}}
                                            margin="0"
                                    >
                                        <Icon as={MdAdd} w={5} h={5} />
                                    </Button>
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