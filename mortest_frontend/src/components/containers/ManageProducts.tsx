import React, { useState, useEffect} from 'react'
import { Box, Button, Center, Divider, Heading, Icon, Input, 
    InputGroup, InputLeftElement, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { ProductList } from './ProductList'
// import { AddStudent } from './AddStudent'
// import { Search2Icon } from '@chakra-ui/icons'
import { BsPlus, BsSearch } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
// import 'react-day-picker/lib/style.css';
import {connect, useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IProduct } from '../../reducers/productReducer';
import { IAppState, useTypedSelector } from '../../store/store';
import { ProductTable } from './ProductTable';
import { AddProduct } from './AddProduct';
import { getAllProducts, ProductActionTypes } from '../../actions/productActions';

interface ManageProductsProps {
}

export const ManageProducts: React.FC<ManageProductsProps> = () => {

       const { products } = useTypedSelector((state) => state.productState);
       const [viewMode, setViewMode] = useState(true);
       const { isOpen, onOpen, onClose } = useDisclosure();
       return (
              <Box display="flex" flexDir="column" height="80vh" w="100%" borderRadius="4px" overflow="hidden" bg="P3White" boxShadow="task" >
                     <Box paddingTop="10" paddingBottom="5" paddingRight="6" paddingLeft="6" display="flex" w="100%" >
                     <Heading size="lg" color="P3DarkBlueText" >Products</Heading>
                     <Box w="100%" display="flex"  justifyContent="flex-end" >
                            <Button 
                                   //   onClick={()=>{dispatch(studentActions.getStudentPage(store.getState().students.lastStudent))}}
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
                     </Box>
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
                     <AddProduct isOpen={isOpen} onClose={onClose}  />
                     </Box>
                     <Divider color="P3IconGray"/>
                     <Box
                     itemID="scrollableDiv"
                     height="80vh"
                     overflow="auto"
                     display="flex"
                     flexDirection="column"
                     id="scrollableDiv">
                     {/* {!s.loading && <div style={{alignSelf: "center"}}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                     {s.page &&
                     <InfiniteScroll
                     dataLength={s.page.length}
                     next={()=>{dispatch(studentActions.getStudentPage())}}
                     style={{ display: 'flex', flexDirection: 'column' }}
                     hasMore={s.page.length!=s.count}
                     inverse={false}
                     loader={<div style={{alignSelf: "center"}}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                     endMessage={<span></span>}
                     scrollableTarget="scrollableDiv">
                     {s.page.map(function(student,i){
                            return <StudentList student={student} students={students} fetchDataPage={fetchDataPage} key={i} />
                     })}
                     </InfiniteScroll>} */}
                            {products&&viewMode&&products.map((product) => {
                                   return <ProductList product={product}
                                          //  fetchDataPage={fetchDataPage} 
                                          key={product.reference} />
                            })}

                            {products&&!viewMode&&<Box _hover={{ bg: "#f8f8f8" }} w="100%" borderRadius="4px" bg="P3White">
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
                                                        {products.map((product) => {
                                                               return <>
                                                                             <ProductTable product={product}
                                                                                           //  fetchDataPage={fetchDataPage} 
                                                                                           key={product.reference} />
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

                     </Box>
              </Box>
       );
}


// /** 
//  * Manage Student Task
//  * */
// const ManageStudents = () => {
//     const dispatch = useDispatch()
//     const toast = useToast()
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const [students, setStudents] = useState([])
//     const s = useSelector(state => state.students)
//     const history = useHistory()
//     /** 
//      * Get students page from API
//      * */
//     function fetchDataPage() {
//     }
    
//     useEffect(() => {

//         dispatch(studentActions.getStudentCount())
//         dispatch(studentActions.getStudentPage())
//     }, [])

// }


