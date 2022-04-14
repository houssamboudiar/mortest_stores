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

export const AddClientForm: React.FC<IProps> = (props:IProps) => {

       useEffect(() => {
       }, [])

       return (
              <DrawerBody paddingTop="1rem" bg="P3White" >
                     <form >
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
                                                 borderColor={props.errors.unit ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.unit && "3px"}
                                                 _placeholder={props.errors.unit && { color: "P1red" }}  
                                                 >
                                                        <option value='m'>m</option>
                                                        <option value='m²'>&#13217;</option>
                                                        <option value='g'>g</option>
                                                        <option value='Kg'>kg</option>
                                                        <option value='L'>l</option>
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
                                                        borderColor={props.errors.qty ? "P1red" : "P3Gray"}
                                                        borderBottomWidth={props.errors.qty && "3px"}
                                                        _placeholder={props.errors.qty && { color: "P1red" }}
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
                                                 id="selling_point"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="selling_point"
                                                 {...props.register("selling_point",{required: 'This is required.'})} 
                                                 borderColor={props.errors.selling_point ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.selling_point && "3px"}
                                                 _placeholder={props.errors.selling_point && { color: "P1red" }}  
                                                 >
                                                        {props.selling_point.map((selling_point:any,i) => {
                                                               return <option value={selling_point.id} key={i}>{selling_point.name}</option>
                                                        })}
                                                 </Select>
                                          </Stack>
                                          {props.errors.selling_point && <Text color="P1red" fontWeight="medium" >{props.errors.selling_point.type === 'required' && 'This is required.'}</Text>}
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
                                                 borderColor={props.errors.famille ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.famille && "3px"}
                                                 _placeholder={props.errors.famille && { color: "P1red" }}   
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
                                                 borderColor={props.errors.marque ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.marque && "3px"}
                                                 _placeholder={props.errors.marque && { color: "P1red" }}  
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
                            </Stack>
                     </form>
              </DrawerBody>
       )

}