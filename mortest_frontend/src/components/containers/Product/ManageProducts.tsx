
// interface ManageProductsProps extends PropsFromRedux {
//        products: IProduct[];
// }


// const ManageProducts: FC<ManageProductsProps> = (props: ManageProductsProps) => {
       
//        const products = props.products;
//        const [viewMode, setViewMode] = useState(true);
//        const { isOpen, onOpen, onClose } = useDisclosure();
//        // props.fetchProducts();

// }

// // Grab the characters from the store and make them available on props
// const mapStateToProps = (store: IAppState) => {
//        return {
//          products: store.productState.products,
//        };
// };

// const mapDispatchToProps = (dispatch: ThunkDispatch<IProductState, null, IProductGetAllAction> & Dispatch ) => {
//        return {
//               getAllProducts: () => dispatch(getAllProducts()),
//               fetchProducts: () => dispatch(fetchProducts()),
//        };
// }

// const connector = connect(mapStateToProps, mapDispatchToProps)

// type PropsFromRedux = ConnectedProps<typeof connector>

// export default connector(ManageProducts);

import React, { useState, useEffect, useCallback, FC} from 'react'
import { Box, Button, Center, Divider, Heading, Icon, Input, 
    InputGroup, InputLeftElement, propNames, Skeleton, Spinner, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { ProductList } from './ProductList'
import { BsPlus, BsSearch } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IAppState, useTypedSelector } from '../../../store/store';
import { ProductTable } from './ProductTable';
import { AddProduct } from './AddProduct';
import { getAllProducts, getProductPage, getSPFamilleMarque, IProductGetAllAction, IProductGetSPFamilleMarqueAction, loadProduct } from '../../../product/productActions';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { any } from 'prop-types';
import { FaKeyboard } from 'react-icons/fa';
import faker from '@faker-js/faker';
import { IProductState, ISPFamilleMarqueProductState } from '../../../product/productReducer';
import { isAbsolute } from 'path';

interface IProps {
       getProductPage(next:any):void,
       loadProduct():void,
       inComptoir:boolean,
}

const ManageProducts: React.FC<IProps> = (props:IProps) => {

       const dispatch = useDispatch();
       const {products, loading, next, count} = useTypedSelector((state) => state.productState);
       const [viewMode, setViewMode] = useState(true);
       const { isOpen, onOpen, onClose } = useDisclosure();

       useEffect(() => {
              props.loadProduct();
       },[])
       
       // const deleteProduct = (id:number) => {
       //        dispatch(deleteProduct(id));
       // }
       
       const loadNextPage = () => {
              props.getProductPage(next)
              console.log(products)
       }
       return (
              <Box display="flex" flexDir="column" height="80vh" w="100%" borderRadius="4px" overflow="hidden" bg="P3White" boxShadow="task" >
                     <Box paddingTop="10" paddingBottom="5" paddingRight="6" paddingLeft="6" display="flex" w="100%" >
                     <Heading size="lg" color="P3DarkBlueText" >Products</Heading>
                     {!props.inComptoir&&<Box w="100%" display="flex"  justifyContent="flex-end" >
                            <Button 
                                   onClick={()=>{setViewMode(!viewMode)}}
                                   size="sm"
                                   marginRight="10px" 
                                   p="0"
                                   bg="P3White" 
                                   color="#109cf1"
                                   fontWeight="bold"
                                   _hover={{ color: "#34aff9" }} 
                                   _active={{ color: "#098edf"}}
                                   _focus={{border:"0px"}}
                                   _disabled={{color:"#c2cfe0"}}
                                   >
                            Switch
                            <Icon marginLeft="5px" as={BiRefresh} w={7} h={7} />
                            </Button>
                            <Button size="sm" 
                                   p="0"
                                   bg="P3White" 
                                   color="#109cf1"
                                   fontWeight="bold"
                                   _hover={{ color: "#34aff9" }} 
                                   _active={{ color: "#098edf"}}
                                   _focus={{border:"0px"}}
                                   _disabled={{color:"#c2cfe0"}}
                                   onClick={onOpen}
                                   >
                            Add Product
                            <Icon as={BsPlus} w={7} h={7} />
                            </Button>
                     </Box>}
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
                     <AddProduct isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                     </Box>
                     <Divider color="P3IconGray"/>
                     {loading &&
                     <Skeleton startColor='P3White' endColor='P3Gray'>
                            <Box
                            itemID="scrollableDiv"
                            height="80vh"
                            overflow="auto"
                            display="flex"
                            flexDirection="column"
                            id="scrollableDiv">
                            </Box>
                     </Skeleton>
                     }
                     {!loading &&
                     <Box
                     itemID="scrollableDiv"
                     height="80vh"
                     overflow="auto"
                     display="flex"
                     flexDirection="column"
                     id="scrollableDiv">
                     {/* {loading && <div style={{alignSelf: "center"}}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>} */}
                     <InfiniteScroll
                     dataLength={products.length}
                     next={()=>{loadNextPage()}}
                     style={{ display: 'flex', flexDirection: 'column' }}
                     hasMore={products.length!=count}
                     inverse={false}
                     loader={<div style={{alignSelf: "center"}}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                     endMessage={<span></span>}
                     scrollableTarget="scrollableDiv"
                     >
                            {viewMode&&products.map((product:any,i) => {
                                   return <ProductList 
                                          product={product}
                                          inComptoir={props.inComptoir}
                                          // deleteProduct={deleteProduct}
                                          key={i} />
                            })}
                            
                            {!viewMode&&<Box _hover={{ bg: "#f8f8f8" }} w="100%" borderRadius="4px" bg="P3White">
                                   <Center>
                                          <Box marginTop="2" marginBottom="2"  display="flex" w="100%" >
                                                 <Table size='sm' variant='striped' colorScheme='blackAlpha'>
                                                        <Thead>
                                                               <Tr>
                                                                      <Th >ID</Th>
                                                                      <Th>Name</Th>
                                                                      <Th>Family</Th>
                                                                      <Th>Brand</Th>
                                                                      <Th >Price</Th>
                                                                      <Th >Retail Price</Th>
                                                                      <Th >Previous Price</Th>
                                                                      <Th >Qty</Th>
                                                               </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                        {products.map((product:any) => {
                                                               return <>
                                                                             <ProductTable product={product}
                                                                                           //  fetchDataPage={fetchDataPage} 
                                                                                           key={product.reference+product.qtte} />
                                                                      </>
                                                        })}
                                                        </Tbody>
                                                        <Tfoot>
                                                               <Tr>
                                                                      <Th >ID</Th>
                                                                      <Th>Name</Th>
                                                                      <Th>Family</Th>
                                                                      <Th>Brand</Th>
                                                                      <Th >Price</Th>
                                                                      <Th >Retail Price</Th>
                                                                      <Th >Previous Price</Th>
                                                                      <Th >Qty</Th>
                                                               </Tr>
                                                        </Tfoot>
                                                 </Table>
                                          </Box>
                                   </Center>
                            </Box>}
                     </InfiniteScroll>
                     </Box>
                     }
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

export default connector(ManageProducts);

