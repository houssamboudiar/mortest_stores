import React, { useState, useEffect, useCallback, FC} from 'react'
import { Box, Button, Center, Divider, Flex, Heading, HStack, Icon, Input, 
    InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, propNames, Select, Stack, Table, TableCaption, Tag, TagLabel, TagLeftIcon, Tbody, Td, Tfoot, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs';
import { useTypedSelector } from '../../../store/store';
import { ItemList } from './ItemList';
import { MdBuild , MdCall, MdCheck, MdClearAll } from "react-icons/md"
import { clearItems } from '../../../cart/cartActions';
import { useDispatch } from 'react-redux';
import { Image } from '@chakra-ui/react'
import EmptyData from './../../../../images/nodata.svg';
import { ValidateFicheVente } from './ValidateFicheVente';
import { FaChevronDown } from 'react-icons/fa';
import { CaisseActionTypes, SpointActionTypes } from '../../../actions/spActions';

interface IProps {

}

const Cart: React.FC<IProps> = (props:IProps) => {
       const dispatch = useDispatch();
       const {items} = useTypedSelector((state) => state.cartState);
       const { isOpen, onOpen, onClose } = useDisclosure();

       const setCaisse = (caisses:any, selectedCaisse:any) => {
              dispatch({type:CaisseActionTypes.LOADING_CAISSES})
              dispatch({type: CaisseActionTypes.SET_CAISSE, caisses:caisses,selectedCaisse:selectedCaisse})
       }
       
       const {caisses, selectedCaisse, loading} = useTypedSelector((state) => state.caisseState);

       useEffect(() => {
       },[])
       
       return (
              <Box display="flex" flexDir="column" height="80vh" w="100%" borderRadius="4px" overflow="hidden" bg="P3White" boxShadow="task" >
                            <Box paddingTop="10" paddingBottom="5" paddingRight="6" paddingLeft="6" display="flex" w="100%" >
                            <Heading size="lg" color="P3DarkBlueText" >Cart</Heading>
                            {!loading&&<Box w="100%" display="flex"  justifyContent="flex-end">
                                   <Menu>
                                          <MenuButton>
                                                 <HStack>
                                                 <Tag p={2} size={'md'} variant='outline' colorScheme='linkedin'>
                                                 <TagLabel mr={'0.5em'} ml={'0.5em'} fontWeight={'bold'} fontSize={'md'} >{selectedCaisse.nom}</TagLabel>
                                                 <TagLeftIcon as={FaChevronDown} />
                                                 </Tag>
                                                 </HStack>
                                          </MenuButton>
                                          <MenuList
                                                 bg={useColorModeValue('gray.200', 'gray.700')}
                                                 borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                                 {caisses.map((caisse:any,i) => {
                                                        return  <MenuItem  color={'black'} onClick={()=>{setCaisse(caisses,caisse)}} value={caisse.id}key={i}>{caisse.nom}</MenuItem>
                                                 })}
                                          </MenuList>
                                   </Menu>
                            </Box>}
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
                     <ValidateFicheVente items={items} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
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
                                   <Button 
                                          disabled={items.length==0}
                                          leftIcon={<MdCheck />} 
                                          colorScheme='green' 
                                          variant='solid'
                                          onClick={onOpen}>
                                          Validate
                                   </Button>
                            </Stack>
                     </Box>
              </Box>
       );
}

export default Cart;

