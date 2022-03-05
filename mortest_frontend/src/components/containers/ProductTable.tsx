
import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/store';
import { IProduct } from '../../reducers/productReducer';
import { Avatar, Box, Button, Center, Divider, Heading, Icon, Stack, Text, Modal, ModalHeader, ModalCloseButton, ModalOverlay, ModalContent, ModalFooter, ModalBody, useDisclosure, useToast, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import { MdEdit, MdDelete } from "react-icons/md"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { AiFillFilePdf } from "react-icons/ai"
import { FaAddressCard } from "react-icons/fa"
// import {EditStudent} from './EditStudent'
// import download from 'downloadjs'
// import Axios from 'axios'

// Create the containers interface
interface IProductTableProps {
       product: {
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
       }
}

export const ProductTable: React.FC<IProductTableProps> = (product) => {
       if (product === undefined) {
              return (
                     <Tr>
                            <Td >ID</Td>
                            <Td>Name</Td>
                            <Td>Family</Td>
                            <Td>Brand</Td>
                            <Td >Price</Td>
                            <Td >Retail Price</Td>
                            <Td >Previous Price</Td>
                            <Td >Qty</Td>
                     </Tr>
              )
       } else {
              return (
                     <Tr key={product.product.reference}>
                            <Td>{product.product.reference}</Td>
                            <Td>{product.product.article}</Td>
                            <Td>{product.product.famille}</Td>
                            <Td>{product.product.marque}</Td>
                            <Td>{product.product.prix_U_achat}</Td>
                            <Td>{product.product.prix_detail} </Td>
                            <Td>{product.product.ancien_prix} </Td>
                            <Td>{product.product.qtte}</Td>
                     </Tr>
              )
       }
}