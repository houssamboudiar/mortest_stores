import React, { useState, useEffect, useCallback, FC} from 'react'
import { Box, Button, Center, Divider, Heading, Icon, Input, 
    InputGroup, InputLeftElement, propNames, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs';
import { useTypedSelector } from '../../../store/store';
import { ItemList } from './ItemList';

interface IProps {

}

const Cart: React.FC<IProps> = (props:IProps) => {
       const {items} = useTypedSelector((state) => state.cartState);

       useEffect(() => {
              console.log(items)
       },[])
       
       return (
              <Box display="flex" flexDir="column" height="80vh" w="100%" borderRadius="4px" overflow="hidden" bg="P3White" boxShadow="task" >
                     <Box paddingTop="10" paddingBottom="5" paddingRight="6" paddingLeft="6" display="flex" w="100%" >
                     <Heading size="lg" color="P3DarkBlueText" >Cart</Heading>
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
                     </Box>
                     <Divider color="P3IconGray"/>
                     <Box
                     itemID="scrollableDiv"
                     height="80vh"
                     overflow="auto"
                     display="flex"
                     flexDirection="column"
                     id="scrollableDiv">
                            {items.map((item:any,i) => {
                                   return <ItemList 
                                          item={item}
                                          key={i} />
                            })}
                     </Box>
              </Box>
       );
}

export default Cart;

