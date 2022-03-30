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
       selling_point:[],
       famille:[],
       marque:[],
}

export const AddProductForm: React.FC<IProps> = (props:IProps) => {
       // {
       //        "selling_point": 1,
       //        "reference": "1234",
       //        "article": "Body Parts",
       //        "img": null,
       //        "unit": "m²",
       //        "famille": 1,
       //        "marque": 1,
       //        "prix_U_achat": "12345.00",
       //        "prix_detail": "12345.00",
       //        "prix_vente_gros": "12345.00",
       //        "prix_vente_revendeur": "12345.00",
       //        "prix_vente_autre": "12344.99",
       //        "stock_alerte": 12,
       //        "qtte": 120,
       //        "ancien_prix": "123444.00",
       //        "marge_vente_detail": 0.0,
       //        "marge_vente_grossiste": 0.0,
       //        "marge_vente_revendeur": 0.0,
       //        "marge_vente_autre": -8.100445524503848e-05,
       //        "qtte_actuel_stock": 139,
       //        "qtte_achete": 65,
       //        "qtte_vendue": 25,
       //        "qtte_retour_four": 12,
       //        "qtte_retour_client": 12,
       //        "qtte_avarie": 21
       //    }
       useEffect(() => {
       }, [])

       //     var oldValue = null;

       //     function onClickCall(value) {
       //         var ele = document.getElementById('imageFile');
       //         if(typeof ele.click == 'function') {
       //         ele.click()
       //         } else if(typeof ele.onclick == 'function') {
       //         ele.onclick()
       //         }

       //     }
       return (
              <DrawerBody paddingTop="1rem" bg="P3White" >
                     <form /*onSubmit={props.handleSubmit(props.onSubmit)}*/>
                            <Stack paddingTop="1rem" paddingBottom="1rem" paddingLeft="1rem" paddingRight="1em" spacing="24px">
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="reference"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Reference"
                                                        name="reference"
                                                        {...props.register("reference", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This reference is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.reference ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.reference && "3px"}
                                                        _placeholder={props.errors.reference && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.reference && <Text color="P1red" fontWeight="medium" >{props.errors.reference.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.reference && <Text color="P1red" fontWeight="medium" >{props.errors.reference.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 id="article"
                                                 type="text"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="Article"
                                                 name="article"
                                                 {...props.register("article", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This name is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.article ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.article && "3px"}
                                                 _placeholder={props.errors.article && { color: "P1red" }}
                                          />
                                          {props.errors.article && <Text color="P1red" fontWeight="medium" >{props.errors.article.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.article && <Text color="P1red" fontWeight="medium" >{props.errors.article.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Unit'
                                                 paddingBottom="5px"
                                                 id="unit"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="unit"
                                                 {...props.register("unit",{required: 'This is required.'})} 
                                                 borderColor={props.errors.article ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.article && "3px"}
                                                 _placeholder={props.errors.article && { color: "P1red" }}  
                                                 >
                                                        <option value='m'>m</option>
                                                        <option value='m2'>&#13217;</option>
                                                        <option value='g'>g</option>
                                                        <option value='kg'>kg</option>
                                                        <option value='l'>l</option>
                                                 </Select>
                                          </Stack>
                                          {props.errors.unit && <Text color="P1red" fontWeight="medium" >{props.errors.unit.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="qty"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Quantity"
                                                        name="qty"
                                                        {...props.register("qty", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.reference ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.reference && "3px"}
                                                        _placeholder={props.errors.reference && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.qty && <Text color="P1red" fontWeight="medium" >{props.errors.qty.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.qty && <Text color="P1red" fontWeight="medium" >{props.errors.qty.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Selling Point'
                                                 paddingBottom="5px"
                                                 id="article"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="sp"
                                                 {...props.register("sp",{required: 'This is required.'})} 
                                                 borderColor={props.errors.article ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.article && "3px"}
                                                 _placeholder={props.errors.article && { color: "P1red" }}  
                                                 >
                                                        {props.selling_point.map((sp:any,i) => {
                                                               return <option value={sp.id} key={i}>{sp.name}</option>
                                                        })}
                                                 </Select>
                                          </Stack>
                                          {props.errors.unit && <Text color="P1red" fontWeight="medium" >{props.errors.unit.type === 'required' && 'This is required.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Family'
                                                 paddingBottom="5px"
                                                 id="famille"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="famille"
                                                 {...props.register("famille",{required: 'This is required.'})} 
                                                 borderColor={props.errors.article ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.article && "3px"}
                                                 _placeholder={props.errors.article && { color: "P1red" }}   
                                                 >
                                                        {props.famille.map((f:any,i) => {
                                                               return <option value={f.id} key={i}>{f.famille}</option>
                                                        })}
                                                 </Select>
                                          </Stack>
                                          {props.errors.famille && <Text color="P1red" fontWeight="medium" >{props.errors.famille.type === 'required' && 'This is required.'}</Text>}

                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 placeholder='Select Brand'
                                                 paddingBottom="5px"
                                                 id="marque"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="marque"
                                                 {...props.register("marque",{required: 'This is required.'})} 
                                                 borderColor={props.errors.article ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.article && "3px"}
                                                 _placeholder={props.errors.article && { color: "P1red" }}  
                                                 >
                                                        {props.marque.map((m:any,i) => {
                                                               return <option value={m.id} key={i}>{m.marque}</option>
                                                        })}
                                                 </Select>
                                          </Stack>
                                          {props.errors.marque && <Text color="P1red" fontWeight="medium" >{props.errors.marque.type === 'required' && 'This is required.'}</Text>}

                                   </Box>
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="prixachat"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Prix Achat"
                                                        name="prixachat"
                                                        {...props.register("prixachat", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.prixachat ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.prixachat && "3px"}
                                                        _placeholder={props.errors.prixachat && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.prixachat && <Text color="P1red" fontWeight="medium" >{props.errors.prixachat.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prixachat && <Text color="P1red" fontWeight="medium" >{props.errors.prixachat.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="prixvg"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Prix Vente Gros"
                                                        name="prixvg"
                                                        {...props.register("prixvg", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.prixvg ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.prixvg && "3px"}
                                                        _placeholder={props.errors.prixvg && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.prixvg && <Text color="P1red" fontWeight="medium" >{props.errors.prixvg.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prixvg && <Text color="P1red" fontWeight="medium" >{props.errors.prixvg.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="prixvr"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Prix Vente Revendeur"
                                                        name="prixvr"
                                                        {...props.register("prixvr", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.prixvr ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.prixvr && "3px"}
                                                        _placeholder={props.errors.prixvr && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.prixvr && <Text color="P1red" fontWeight="medium" >{props.errors.prixvr.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prixvr && <Text color="P1red" fontWeight="medium" >{props.errors.prixvr.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="prixva"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Prix Vente Autre"
                                                        name="prixva"
                                                        {...props.register("prixva", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.prixva ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.prixva && "3px"}
                                                        _placeholder={props.errors.prixva && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.prixva && <Text color="P1red" fontWeight="medium" >{props.errors.prixva.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prixva && <Text color="P1red" fontWeight="medium" >{props.errors.prixva.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <NumberInput variant="flushed">
                                                 <NumberInputField
                                                        paddingBottom="5px"
                                                        id="prixd"
                                                        type="text"
                                                        color="P2Black"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="Prix Vente Autre"
                                                        name="prixd"
                                                        {...props.register("prixd", {
                                                               maxLength : {
                                                                      value: 20,
                                                                      message: 'This is so long.' // JS only: <p>error message</p> TS only support string
                                                               },
                                                               required: 'This is required.'
                                                        })}                                                               
                                                        borderColor={props.errors.prixd ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.prixd && "3px"}
                                                        _placeholder={props.errors.prixd && { color: "P1red" }}
                                                 />
                                          </NumberInput>
                                          {props.errors.prixd && <Text color="P1red" fontWeight="medium" >{props.errors.prixd.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prixd && <Text color="P1red" fontWeight="medium" >{props.errors.prixd.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   {/* <Box display="flex" flexDir="column" >
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="sex">Gender</FormLabel>
                                                 <Select color="P2Black"
                                                        type="text"
                                                        name="sex"
                                                        ref={props.register()}
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        borderColor={() => props.errors.sex ? "P1red" : "P3Gray"}
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                 </Select>
                                          </Box>
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="dateBirth">Birth date</FormLabel>
                                                 <Box alignItems="center" paddingBottom="5px"  >
                                                        <Input
                                                               placeholder="DD/MM/YYYY"
                                                               variant="flushed"
                                                               name="dateBirth"
                                                               _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                               _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                               borderColor={() => props.errors.dateBirth ? "P1red" : "P3Gray"}
                                                               ref={props.register({
                                                                      required: true, pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                                                               })} />
                                                 </Box>
                                                 {props.errors.dateBirth && <Text color="P1red" fontWeight="medium" >{props.errors.dateBirth.type === 'required' && 'Birth date is required.'}</Text>}
                                                 {props.errors.dateBirth && <Text color="P1red" fontWeight="medium" >{props.errors.dateBirth.type === 'pattern' && 'Birth date is wrong.'}</Text>}
                                          </Box>
                                   </Box>
                            </Stack>
                            <Stack paddingTop="1rem" paddingBottom="1rem" paddingLeft="1rem" paddingRight="1em" spacing="24px">
                                   <Heading size="md" fontWeight="500" color="P3DarkBlueText" >Parental Informations</Heading>
                                   <Heading paddingRight="1em" size="md" fontWeight="300" color="P3DarkBlueText" >Father</Heading>
                                   <Box display="flex" flexDir="column" >
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="firstNameFather">First Name</FormLabel>
                                                 <Input
                                                        id="firstNameFather"
                                                        type="text"
                                                        name="firstNameFather"
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        ref={props.register({ required: true, maxLength: 20 })}
                                                        borderColor={() => props.errors.firstNameFather ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.firstNameFather && "3px"}
                                                        _placeholder={() => props.errors.firstNameFather && { color: "P1red" }}
                                                        placeholder="John"
                                                 />
                                                 {props.errors.firstNameFather && <Text color="P1red" fontWeight="medium" >{props.errors.firstNameFather.type === 'required' && 'This is required.'}</Text>}
                                                 {props.errors.firstNameFather && <Text color="P1red" fontWeight="medium" >{props.errors.firstNameFather.type === 'maxLength' && 'This name is so long.'}</Text>}
                                          </Box>
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="lastNameFather">Last Name</FormLabel>
                                                 <Input
                                                        id="lastNameFather"
                                                        type="text"
                                                        name="lastNameFather"
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        ref={props.register({ required: true, maxLength: 20 })}
                                                        borderColor={() => props.errors.lastNameFather ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.lastNameFather && "3px"}
                                                        _placeholder={() => props.errors.lastNameFather && { color: "P1red" }}
                                                        placeholder="Doe"
                                                 />
                                                 {props.errors.lastNameFather && <Text color="P1red" fontWeight="medium" >{props.errors.lastNameFather.type === 'required' && 'This is required.'}</Text>}
                                                 {props.errors.lastNameFather && <Text color="P1red" fontWeight="medium" >{props.errors.lastNameFather.type === 'maxLength' && 'This name is so long.'}</Text>}
                                          </Box>
                                   </Box>
                                   <Divider paddingRight="1em" color="P3IconGray"></Divider>
                                   <Heading paddingRight="1em" size="md" fontWeight="300" color="P3DarkBlueText" >Mother</Heading>
                                   <Box display="flex" flexDir="column" >
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="firstNameMother">First Name</FormLabel>
                                                 <Input
                                                        id="firstNameMother"
                                                        type="text"
                                                        name="firstNameMother"
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        ref={props.register({ required: true, maxLength: 20 })}
                                                        borderColor={() => props.errors.firstNameMother ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.firstNameMother && "3px"}
                                                        _placeholder={() => props.errors.firstNameMother && { color: "P1red" }}
                                                        placeholder="John"
                                                 />
                                                 {props.errors.firstNameMother && <Text color="P1red" fontWeight="medium" >{props.errors.firstNameMother.type === 'required' && 'This is required.'}</Text>}
                                                 {props.errors.firstNameMother && <Text color="P1red" fontWeight="medium" >{props.errors.firstNameMother.type === 'maxLength' && 'This name is so long.'}</Text>}
                                          </Box>
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="lastNameMother">Last Name</FormLabel>
                                                 <Input
                                                        id="lastNameMother"
                                                        type="text"
                                                        name="lastNameMother"
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        ref={props.register({ required: true, maxLength: 20 })}
                                                        borderColor={() => props.errors.lastNameMother ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.lastNameMother && "3px"}
                                                        _placeholder={() => props.errors.lastNameMother && { color: "P1red" }}
                                                        placeholder="Doe"
                                                 />
                                                 {props.errors.lastNameMother && <Text color="P1red" fontWeight="medium" >{props.errors.lastNameMother.type === 'required' && 'This is required.'}</Text>}
                                                 {props.errors.lastNameMother && <Text color="P1red" fontWeight="medium" >{props.errors.lastNameMother.type === 'maxLength' && 'This name is so long.'}</Text>}
                                          </Box>
                                   </Box>
                                   <Divider paddingRight="1em" color="P3IconGray"></Divider>
                                   <Box display="flex" flexDir="column" >
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="phone">Phone Number</FormLabel>
                                                 <InputGroup>
                                                        <InputLeftElement
                                                               pointerEvents="none"
                                                               children={<PhoneIcon color="gray.300" />}
                                                        />
                                                        <Input variant="flushed"
                                                               type="phone"
                                                               placeholder="0 - 123 - 456 - 789"
                                                               id="phone"
                                                               color="P2Black"
                                                               fontWeight="bold"
                                                               name="phoneParent"
                                                               ref={props.register({
                                                                      required: true, pattern: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
                                                                      , maxLength: 10
                                                               })}
                                                               borderColor={() => props.errors.phoneParent ? "P1red" : "P3Gray"}
                                                               borderBottomWidth={props.errors.phoneParent && "3px"}
                                                               _placeholder={() => props.errors.phoneParent && { color: "P1red" }}
                                                               _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                               _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        />
                                                 </InputGroup>
                                                 {props.errors.phoneParent && <Text color="P1red" fontWeight="medium" >{props.errors.phoneParent.type === 'required' && 'This is required.'}</Text>}
                                                 {props.errors.phoneParent && <Text color="P1red" fontWeight="medium" >{props.errors.phoneParent.type === 'pattern' && 'Wrong phone number.'}</Text>}
                                                 {props.errors.phoneParent && <Text color="P1red" fontWeight="medium" >{props.errors.phoneParent.type === 'maxLength' && 'Wrong phone number.'}</Text>}
                                          </Box>
                                          <Box width="50%" paddingRight="1em">
                                                 <FormLabel color="P2TableGray" htmlFor="emailParent">Email</FormLabel>
                                                 <Input
                                                        id="emailParent"
                                                        name="emailParent"
                                                        ref={props.register({
                                                               required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
                                                        })}
                                                        borderColor={() => props.errors.emailParent ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.emailParent && "3px"}
                                                        _placeholder={() => props.errors.emailParent && { color: "P1red" }}
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        placeholder="john.doe@gmail.com" />
                                                 {props.errors.emailParent && <Text color="P1red" fontWeight="medium" >{props.errors.emailParent.type === 'required' && 'This is required.'}</Text>}
                                                 {props.errors.emailParent && <Text color="P1red" fontWeight="medium" >{props.errors.emailParent.type === 'pattern' && 'Wrong email address.'}</Text>}
                                          </Box>
                                   </Box>
                                   <Box paddingRight="1em" paddingBottom="1rem">
                                          <FormLabel color="P2TableGray" htmlFor="address">Address</FormLabel>
                                          <Input
                                                 id="address"
                                                 type="text"
                                                 name="address"
                                                 color="P2Black"
                                                 fontWeight="bold"
                                                 variant="flushed"
                                                 ref={props.register({ required: true, maxLength: 30 })}
                                                 borderColor={() => props.errors.address ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.address && "3px"}
                                                 _placeholder={() => props.errors.address && { color: "P1red" }}
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                          />
                                          {props.errors.address && <Text color="P1red" fontWeight="medium" >{props.errors.address.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.address && <Text color="P1red" fontWeight="medium" >{props.errors.address.type === 'maxLength' && 'This text is so long.'}</Text>}
                                   </Box>
                            </Stack>
                            <Stack paddingTop="1rem" paddingBottom="1rem" paddingLeft="1rem" paddingRight="1em" spacing="24px">
                                   <Heading size="md" fontWeight="500" color="P3DarkBlueText" >Secondary Informations</Heading>
                                   <Box >
                                          <Box paddingRight="1em" paddingBottom="1rem"  >
                                                 <FormLabel color="P2TableGray" htmlFor="allergies">Allergies</FormLabel>
                                                 <Input
                                                        id="allergies"
                                                        type="text"
                                                        defaultValue={student.allergies}
                                                        onChange={e => setStudent({ ...student, allergies: e.target.value })}
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        name="allergies"
                                                        ref={props.register({ maxLength: 30 })}
                                                        borderColor={() => props.errors.allergies ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.allergies && "3px"}
                                                        _placeholder={() => props.errors.allergies && { color: "P1red" }}
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 />
                                                 {props.errors.allergies && <Text color="P1red" fontWeight="medium" >{props.errors.allergies.type === 'maxLength' && 'This text is so long.'}</Text>}
                                          </Box>
                                          <Box paddingRight="1em" paddingBottom="1rem">
                                                 <FormLabel color="P2TableGray" htmlFor="diseases">Diseases</FormLabel>
                                                 <Input
                                                        id="diseases"
                                                        type="text"
                                                        defaultValue={student.diseases}
                                                        onChange={e => setStudent({ ...student, diseases: e.target.value })}
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        name="diseases"
                                                        ref={props.register({ maxLength: 30 })}
                                                        borderColor={() => props.errors.diseases ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.diseases && "3px"}
                                                        _placeholder={() => props.errors.diseases && { color: "P1red" }}
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 />
                                                 {props.errors.diseases && <Text color="P1red" fontWeight="medium" >{props.errors.diseases.type === 'maxLength' && 'This text is so long.'}</Text>}
                                          </Box>
                                          <Box paddingRight="1em" paddingBottom="1rem">
                                                 <FormLabel color="P2TableGray" htmlFor="intolerances">Intolerances</FormLabel>
                                                 <Input
                                                        id="intolerances"
                                                        type="text"
                                                        defaultValue={student.intolerances}
                                                        onChange={e => setStudent({ ...student, intolerances: e.target.value })}
                                                        color="P2Black"
                                                        fontWeight="bold"
                                                        variant="flushed"
                                                        name="intolerances"
                                                        ref={props.register({ maxLength: 30 })}
                                                        borderColor={() => props.errors.intolerances ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.intolerances && "3px"}
                                                        _placeholder={() => props.errors.intolerances && { color: "P1red" }}
                                                        _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                        _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 />
                                                 {props.errors.intolerances && <Text color="P1red" fontWeight="medium" >{props.errors.intolerances.type === 'maxLength' && 'This text is so long.'}</Text>}
                                          </Box>
                                   </Box> */}
                            </Stack>
                     </form>
              </DrawerBody>
       )

}