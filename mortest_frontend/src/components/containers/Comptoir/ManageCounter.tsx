import React, { useState, useEffect} from 'react'
import { Box, Button, Center, Divider, Heading, Icon, Input, 
    InputGroup, InputLeftElement, propNames, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { BsPlus, BsSearch } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IAppState, useTypedSelector } from '../../../store/store';
import { fetchProducts, getAllProducts, getProductPage, getSPFamilleMarque, IProductGetAllAction, IProductGetSPFamilleMarqueAction, loadProduct } from '../../../product/productActions';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { IProductState, ISPFamilleMarqueProductState } from '../../../product/productReducer';
import ManageProducts from '../Product/ManageProducts';

interface IProps {

}

const ManageCounter: React.FC<IProps> = (props:IProps) => {

       useEffect(() => {

       },[])

       return (
              <Box width={"50%"} height={"50%"}>
                     <ManageProducts inComptoir={true} ></ManageProducts>
              </Box>
       );
}

// Grab the characters from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
       return {
         products: store.productState.products,
       };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IProductState, null, IProductGetAllAction> & Dispatch) => {
       return {
              getProductPage: (url:string) => dispatch(getProductPage(url)),
              loadProduct: () => dispatch(loadProduct()),
       };
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ManageCounter);

