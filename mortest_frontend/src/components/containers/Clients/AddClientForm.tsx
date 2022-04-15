import React, { useState, useEffect, useCallback } from 'react'
import {
       Box, Button, Divider, DrawerBody, FormLabel, Heading, Input,
       InputGroup, InputLeftElement, Select, Stack, Text, css, Avatar, IconButton, Center, NumberInput, NumberInputField
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

}

export const AddClientForm: React.FC<IProps> = (props:IProps) => {

       useEffect(() => {
       }, [])

       return (
              <DrawerBody paddingTop="1rem" bg="P3White" >
                     <form >
                            <Stack paddingTop="1rem" paddingBottom="1rem" paddingLeft="1rem" paddingRight="1em" spacing="24px">
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 id="nom"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Name"
                                                 name="nom"
                                                 {...props.register("nom", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This name is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.nom ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.nom && "3px"}
                                                 _placeholder={props.errors.nom && { color: "P1red" }}
                                          />
                                          {props.errors.nom && <Text color="P1red" fontWeight="medium" >{props.errors.nom.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.nom && <Text color="P1red" fontWeight="medium" >{props.errors.nom.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Type'
                                                 paddingBottom="5px"
                                                 id="type"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="type"
                                                 {...props.register("type",{required: 'This is required.'})} 
                                                 borderColor={props.errors.type ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.type && "3px"}
                                                 _placeholder={props.errors.type && { color: "P1red" }}  
                                                 >
                                                        <option value='Détaillant'>Détaillant</option>
                                                        <option value='Grossiste'>Grossiste</option>
                                                        <option value='Revendeur'>Revendeur</option>
                                                        <option value='Autre'>Autre</option>                                                 </Select>
                                          </Stack>
                                          {props.errors.type && <Text color="P1red" fontWeight="medium" >{props.errors.type.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Etat Civil'
                                                 paddingBottom="5px"
                                                 id="etat_civile"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="etat_civile"
                                                 {...props.register("etat_civile",{required: 'This is required.'})} 
                                                 borderColor={props.errors.etat_civile ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.etat_civile && "3px"}
                                                 _placeholder={props.errors.etat_civile && { color: "P1red" }}  
                                                 >
                                                        <option value="M.">M.</option>
                                                        <option value="Mme">Mme</option>
                                                        <option value="SARL">SARL</option>
                                                        <option value="EURL">EURL</option>
                                                        <option value="ETS">ETS</option>
                                                        <option value="autre">Autre</option>
                                                 </Select>
                                          </Stack>
                                          {props.errors.etat_civile && <Text color="P1red" fontWeight="medium" >{props.errors.etat_civile.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 id="email"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Email"
                                                 name="email"
                                                 {...props.register("email", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This email is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.',
                                                        pattern : {
                                                               value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                                                               message: 'This email is invalid.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                 })}                                                               
                                                 borderColor={props.errors.email ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.email && "3px"}
                                                 _placeholder={props.errors.email && { color: "P1red" }}
                                          />
                                          {props.errors.email && <Text color="P1red" fontWeight="medium" >{props.errors.email.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.email && <Text color="P1red" fontWeight="medium" >{props.errors.email.type === 'maxLength' && 'This name is so long.'}</Text>}
                                          {props.errors.email && <Text color="P1red" fontWeight="medium" >{props.errors.email.type === 'pattern' && 'This email is invalid.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="telephone"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Telephone"
                                                        name="telephone"
                                                        {...props.register("telephone", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This telephone is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.',
                                                               pattern : {
                                                                      value: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
                                                                      message: 'This telephone is invalid.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                        })}                                                               
                                                        borderColor={props.errors.telephone ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.telephone && "3px"}
                                                        _placeholder={props.errors.telephone && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.telephone && <Text color="P1red" fontWeight="medium" >{props.errors.telephone.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.telephone && <Text color="P1red" fontWeight="medium" >{props.errors.telephone.type === 'maxLength' && 'This name is so long.'}</Text>}
                                          {props.errors.telephone && <Text color="P1red" fontWeight="medium" >{props.errors.telephone.type === 'pattern' && 'This telephone is invalid.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 id="wilaya"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Wilaya"
                                                 name="wilaya"
                                                 {...props.register("wilaya", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This name is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.wilaya ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.wilaya && "3px"}
                                                 _placeholder={props.errors.wilaya && { color: "P1red" }}
                                          />
                                          {props.errors.wilaya && <Text color="P1red" fontWeight="medium" >{props.errors.wilaya.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.wilaya && <Text color="P1red" fontWeight="medium" >{props.errors.wilaya.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 id="ville"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Ville"
                                                 name="ville"
                                                 {...props.register("ville", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This name is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.ville ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.ville && "3px"}
                                                 _placeholder={props.errors.ville && { color: "P1red" }}
                                          />
                                          {props.errors.ville && <Text color="P1red" fontWeight="medium" >{props.errors.ville.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.ville && <Text color="P1red" fontWeight="medium" >{props.errors.ville.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 id="address"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Addresss"
                                                 name="address"
                                                 {...props.register("address", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This address is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.address ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.address && "3px"}
                                                 _placeholder={props.errors.address && { color: "P1red" }}
                                          />
                                          {props.errors.address && <Text color="P1red" fontWeight="medium" >{props.errors.address.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.address && <Text color="P1red" fontWeight="medium" >{props.errors.address.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                            </Stack>
                     </form>
              </DrawerBody>
       )

}