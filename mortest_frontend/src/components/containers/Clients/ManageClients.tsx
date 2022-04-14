import React, { } from 'react'
import { Accordion, Box, Button, Divider, Heading, Icon, Input, 
    InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react'
import { BsPlus, BsSearch } from 'react-icons/bs';
import { useTypedSelector } from '../../../store/store';
import { ClientsList } from './ClientsList';
import { AddClient } from './AddClient';

interface IProps {

}

const ManageClients: React.FC<IProps> = (props:IProps) => {

       const {clients, loading} = useTypedSelector((state) => state.clientState);
       const { isOpen, onOpen, onClose } = useDisclosure();

       return (
              <Box display="flex" flexDir="column" height="80vh" w="100%" borderRadius="4px" overflow="hidden" bg="P3White" boxShadow="task" >
                     <Box paddingTop="10" paddingBottom="5" paddingRight="6" paddingLeft="6" display="flex" w="100%" >
                     <Heading size="lg" color="P3DarkBlueText" >Clients</Heading>
                     <Box w="100%" display="flex"  justifyContent="flex-end">
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
                            Add Client
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
                     </Box>
                     <Divider color="P3IconGray"/>
                     <AddClient isOpen={isOpen} onOpen={onOpen} onClose={onClose}  />
                     <Box
                     itemID="scrollableDiv"
                     height="80vh"
                     overflow="auto"
                     display="flex"
                     flexDirection="column"
                     id="scrollableDiv">
                            <Accordion allowToggle>
                            {clients.map((client:any,i) => {
                                   return <ClientsList client={client} />
                            })}
                            </Accordion>
                     </Box>
              </Box>
       );
}

export default ManageClients;

