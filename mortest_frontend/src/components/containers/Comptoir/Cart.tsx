import React, { useState, useEffect, useCallback, FC} from 'react'
import { Box, Button, Center, Divider, Heading, Icon, Input, 
    InputGroup, InputLeftElement, propNames, Stack, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs';
import { useTypedSelector } from '../../../store/store';
import { ItemList } from './ItemList';
import { MdBuild , MdCall, MdCheck, MdClearAll } from "react-icons/md"
import { clearItems } from '../../../cart/cartActions';
import { useDispatch } from 'react-redux';
import { Image } from '@chakra-ui/react'
import EmptyData from './../../../../images/nodata.svg';

interface IProps {

}

const Cart: React.FC<IProps> = (props:IProps) => {
       const dispatch = useDispatch();
       const {items} = useTypedSelector((state) => state.cartState);

       useEffect(() => {
              console.log(items)
       },[])
       
       return (
              <Box display="flex" flexDir="column" height="80vh" w="100%" borderRadius="4px" overflow="hidden" bg="P3White" boxShadow="task" >
                     <Box paddingTop="10" paddingBottom="5" paddingRight="6" paddingLeft="6" display="flex" w="100%" >
                     <Heading size="lg" color="P3DarkBlueText" >Cart</Heading>
                     </Box>
                     {/* <Box p={3} >
                     </Box> */}
                     <Divider color="P3IconGray"/>
                     {(items.length==0)&&
                     <Box 
                            display="flex"
                            alignSelf="center" 
                            alignItems="center" 
                            height="80vh"
                     >
                            <Box>
                                   <Image src={EmptyData} maxW='xs' maxH='xs' alt='Empty Cart'/>
                            </Box>
                     </Box>}
                     {(items.length!=0)&&<Box
                     itemID="scrollableDiv"
                     height="80vh"
                     overflow="auto"
                     display="flex"
                     flexDirection="column"
                     id="scrollableDiv"
                     >
                            {items.map((item:any,i) => {
                                   return <ItemList 
                                          item={item}
                                          key={i} />
                            })}
                     </Box>}
                     <Divider color="P3IconGray"/>
                     <Box p={4} justifyContent="flex-end" display="flex">
                            <Stack direction='row' spacing={4}>
                                   <Button 
                                          disabled={items.length==0}
                                          onClick={()=>{dispatch(clearItems())}}
                                          leftIcon={<MdClearAll />} 
                                          colorScheme='telegram' 
                                          variant='solid'>
                                          Clear
                                   </Button>
                                   <Button leftIcon={<MdCheck />} colorScheme='green' variant='solid'>
                                          Validate
                                   </Button>
                            </Stack>
                     </Box>
              </Box>
       );
}

export default Cart;

