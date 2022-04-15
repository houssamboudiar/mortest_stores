import React, { useState, useEffect, useCallback } from 'react'
import {
       Box, Button, Divider, DrawerBody, FormLabel, Heading, Input,
       InputGroup, InputLeftElement, Select, Stack, Text, css, Avatar, IconButton, Center, NumberInput, NumberInputField
} from '@chakra-ui/react'
import { AddIcon, AttachmentIcon, PhoneIcon } from '@chakra-ui/icons'
// import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { ErrorMessage } from '@hookform/error-message';

interface sellingp {
       id:number,
       name:any,
}

interface famille {
       id:number,
       name:any,
}

interface marque {
       id:number,
       name:any,
}

interface IProps {
       errors:any,
       register:any,
       handleSubmit:any,
       onSubmit:any,
       client:any
}

export const EditClientForm: React.FC<IProps> = (props:IProps) => {

       const [newClient, setNewClient] = useState({})

       const handleChange= (e: any) => {
              const { name, value } = e.currentTarget;
              console.log("e.currentTarget")
              setNewClient({ ...newClient, [name]: value });
       }

       useEffect(() => {
              setNewClient(props.client)
       }, [])

       return (
              <DrawerBody paddingTop="1rem" bg="P3White" >
                     <form >
                            <Stack paddingTop="1rem" paddingBottom="1rem" paddingLeft="1rem" paddingRight="1em" spacing="24px">                                
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.client.nom}
                                                 onChangeCapture={handleChange}
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
                                                 paddingBottom="5px"
                                                 id="type"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="type"
                                                 defaultValue={props.client.type}
                                                 {...props.register("type",{required: 'This is required.'})} 
                                                 borderColor={props.errors.type ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.type && "3px"}
                                                 _placeholder={props.errors.type && { color: "P1red" }} 
                                                 onChangeCapture={handleChange} 
                                                 >
                                                        <option value='Détaillant'>Détaillant</option>
                                                        <option value='Grossiste'>Grossiste</option>
                                                        <option value='Revendeur'>Revendeur</option>
                                                        <option value='Autre'>Autre</option>  
                                                 </Select>
                                          </Stack>
                                          {props.errors.type && <Text color="P1red" fontWeight="medium" >{props.errors.type.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 paddingBottom="5px"
                                                 id="etat_civil"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="etat_civil"
                                                 defaultValue={props.client.etat_civil}
                                                 {...props.register("etat_civil",{required: 'This is required.'})} 
                                                 borderColor={props.errors.etat_civil ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.etat_civil && "3px"}
                                                 _placeholder={props.errors.etat_civil && { color: "P1red" }} 
                                                 onChangeCapture={handleChange} 
                                                 >
                                                        <option value="M.">M.</option>
                                                        <option value="Mme">Mme</option>
                                                        <option value="SARL">SARL</option>
                                                        <option value="EURL">EURL</option>
                                                        <option value="ETS">ETS</option>
                                                        <option value="autre">Autre</option>
                                                 </Select>
                                          </Stack>
                                          {props.errors.etat_civil && <Text color="P1red" fontWeight="medium" >{props.errors.etat_civil.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.client.email}
                                                 onChangeCapture={handleChange}
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
                                                               message: 'This name is so long.' // JS only: <p>error message</p> TS only support string
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
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.client.telephone}
                                                 onChangeCapture={handleChange}
                                                 id="telephone"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="telephone"
                                                 name="telephone"
                                                 {...props.register("telephone", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This telephone is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.',
                                                        pattern : {
                                                               value: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
                                                               message: 'This phone number is invalid.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                 })}                                                               
                                                 borderColor={props.errors.telephone ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.telephone && "3px"}
                                                 _placeholder={props.errors.telephone && { color: "P1red" }}
                                          />
                                          {props.errors.telephone && <Text color="P1red" fontWeight="medium" >{props.errors.telephone.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.telephone && <Text color="P1red" fontWeight="medium" >{props.errors.telephone.type === 'maxLength' && 'This name is so long.'}</Text>}
                                          {props.errors.telephone && <Text color="P1red" fontWeight="medium" >{props.errors.telephone.type === 'pattern' && 'This phone number is invalid.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.client.wilaya}
                                                 onChangeCapture={handleChange}
                                                 id="wilaya"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Name"
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
                                                 defaultValue={props.client.ville}
                                                 onChangeCapture={handleChange}
                                                 id="ville"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Name"
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
                                                 defaultValue={props.client.adress}
                                                 onChangeCapture={handleChange}
                                                 id="adress"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="adress"
                                                 name="adress"
                                                 {...props.register("adress", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This name is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.adress ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.adress && "3px"}
                                                 _placeholder={props.errors.adress && { color: "P1red" }}
                                          />
                                          {props.errors.adress && <Text color="P1red" fontWeight="medium" >{props.errors.adress.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.adress && <Text color="P1red" fontWeight="medium" >{props.errors.adress.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                            </Stack>
                     </form>
              </DrawerBody>
       )

}