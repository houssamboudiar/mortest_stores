import React, { useState, useEffect, useCallback } from 'react'
import {
       Box, Button, Divider, DrawerBody, FormLabel, Heading, Input,
       InputGroup, InputLeftElement, Select, Stack, Text, css, Avatar, IconButton, Center, NumberInput, NumberInputField, Textarea
} from '@chakra-ui/react'
import { AddIcon, AttachmentIcon, PhoneIcon } from '@chakra-ui/icons'
// import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { ErrorMessage } from '@hookform/error-message';

interface IProps {
       errors:any,
       register:any,
       handleSubmit:any,
       onSubmit:any,
       // to make
       clients:any,
       depots:any,
}

export const ValidateFicheVenteForm: React.FC<IProps> = (props:IProps) => {
       useEffect(() => {
       }, [])

       return (
              <DrawerBody paddingTop="1rem" bg="P3White" >
                     <form >
                            <Stack paddingTop="1rem" paddingBottom="1rem" paddingLeft="1rem" paddingRight="1em" spacing="24px">
                                   {/* Type Fiche */}
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Type Fiche'
                                                 paddingBottom="5px"
                                                 id="type_fiche"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="type_fiche"
                                                 {...props.register("type_fiche",{required: 'This is required.'})} 
                                                 borderColor={props.errors.type_fiche ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.type_fiche && "3px"}
                                                 _placeholder={props.errors.type_fiche && { color: "P1red" }}  
                                                 >
                                                        <option value='Bon de livraison'>Bon de livraison</option>
                                                        <option value='Facture'>Facture</option>
                                                        <option value='BL sans montant'>BL sans montant</option>
                                                        <option value='Facture Proformat'>Facture Proformat</option>
                                                 </Select>
                                          </Stack>
                                          {props.errors.type_fiche && <Text color="P1red" fontWeight="medium" >{props.errors.type_fiche.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   {/* Client */}
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Client'
                                                 paddingBottom="5px"
                                                 id="client"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="client"
                                                 {...props.register("client",{required: 'This is required.'})} 
                                                 borderColor={props.errors.client ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.client && "3px"}
                                                 _placeholder={props.errors.client && { color: "P1red" }}  
                                                 >
                                                        {props.clients.map((client:any,i: React.Key) => {
                                                               return <option value={client.id} key={i}>{client.nom}</option>
                                                        })}
                                                 </Select>
                                          </Stack>
                                          {props.errors.client && <Text color="P1red" fontWeight="medium" >{props.errors.client.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   {/* Type Client */}
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Type Client'
                                                 paddingBottom="5px"
                                                 id="type_client"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="type_client"
                                                 {...props.register("type_client",{required: 'This is required.'})} 
                                                 borderColor={props.errors.type_client ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.type_client && "3px"}
                                                 _placeholder={props.errors.type_client && { color: "P1red" }}  
                                                 >
                                                        <option value='Détaillant'>Détaillant</option>
                                                        <option value='Grossiste'>Grossiste</option>
                                                        <option value='Revendeur'>Revendeur</option>
                                                        <option value='Autre'>Autre</option>
                                                 </Select>
                                          </Stack>
                                          {props.errors.type_client && <Text color="P1red" fontWeight="medium" >{props.errors.type_client.type === 'required' && 'This is required.'}</Text>}
                                   </Box>

                                   {/* Payment Type */}
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Payment Type'
                                                 paddingBottom="5px"
                                                 id="type_payment"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="type_payment"
                                                 {...props.register("type_payment",{required: 'This is required.'})} 
                                                 borderColor={props.errors.type_payment ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.type_payment && "3px"}
                                                 _placeholder={props.errors.type_payment && { color: "P1red" }}  
                                                 >
                                                        <option value='A Terme'>A Terme</option>
                                                        <option value='Espece'>Espece</option>
                                                        <option value='Virement'>Virement</option>
                                                        <option value='Chéque'>Chéque</option>
                                                 </Select>
                                          </Stack>
                                          {props.errors.type_payment && <Text color="P1red" fontWeight="medium" >{props.errors.type_payment.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   {/* Paid */}
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="montant_reg_client"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Montant Reg Client"
                                                        name="montant_reg_client"
                                                        {...props.register("montant_reg_client", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.montant_reg_client ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.montant_reg_client && "3px"}
                                                        _placeholder={props.errors.montant_reg_client && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.montant_reg_client && <Text color="P1red" fontWeight="medium" >{props.errors.montant_reg_client.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.montant_reg_client && <Text color="P1red" fontWeight="medium" >{props.errors.montant_reg_client.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   {/* Depot */}
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Depot'
                                                 paddingBottom="5px"
                                                 id="depot"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="depot"
                                                 {...props.register("depot",{required: 'This is required.'})} 
                                                 borderColor={props.errors.depot ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.depot && "3px"}
                                                 _placeholder={props.errors.depot && { color: "P1red" }}  
                                                 >
                                                        {props.depots.map((depot:any,i: React.Key) => {
                                                               return <option value={depot.id} key={i}>{depot.nom}</option>
                                                        })}
                                                 </Select>
                                          </Stack>
                                          {props.errors.depot && <Text color="P1red" fontWeight="medium" >{props.errors.depot.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   {/* Observation */}
                                   <Box paddingRight="1em">
                                          <Textarea 
                                                 resize={'none'}
                                                 paddingBottom="5px"
                                                 id="observation"
                                                 type="text"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Observation"
                                                 name="observation"
                                                 {...props.register("observation", {
                                                        maxLength : {
                                                               value: 250,
                                                               message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                 })}                                                               
                                                 borderColor={props.errors.observation ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.observation && "3px"}
                                                 _placeholder={props.errors.observation && { color: "P1red" }}
                                          />
                                          {props.errors.observation && <Text color="P1red" fontWeight="medium" >{props.errors.observation.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                            </Stack>
                     </form>
              </DrawerBody>
       )

}