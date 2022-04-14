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
       selling_point:sellingp[],
       famille:famille[],
       marque:marque[],
       product:any
}

export const EditProductForm: React.FC<IProps> = (props:IProps) => {

       const [newProduct, setNewProduct] = useState({})

       const handleChange= (e: any) => {
              const { name, value } = e.currentTarget;
              console.log("e.currentTarget")
              setNewProduct({ ...newProduct, [name]: value });
       }

       useEffect(() => {
              setNewProduct(props.product)
              console.log(props.selling_point.filter((x)=>x.id==props.product.selling_point)[0].id == 1)
       }, [])

       return (
              <DrawerBody paddingTop="1rem" bg="P3White" >
                     <form >
                            <Stack paddingTop="1rem" paddingBottom="1rem" paddingLeft="1rem" paddingRight="1em" spacing="24px">                                
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.reference}
                                                 onChangeCapture={handleChange}
                                                 id="reference"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
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
                                          {props.errors.reference && <Text color="P1red" fontWeight="medium" >{props.errors.reference.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.reference && <Text color="P1red" fontWeight="medium" >{props.errors.reference.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.article}
                                                 onChangeCapture={handleChange}
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
                                                 paddingBottom="5px"
                                                 id="unit"
                                                 color="P2Black"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 name="unit"
                                                 defaultValue={props.product.unit}
                                                 {...props.register("unit",{required: 'This is required.'})} 
                                                 borderColor={props.errors.unit ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.unit && "3px"}
                                                 _placeholder={props.errors.unit && { color: "P1red" }} 
                                                 onChangeCapture={handleChange} 
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
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.qtte}
                                                 onChangeCapture={handleChange}
                                                 id="qtte"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="qtte"
                                                 name="qtte"
                                                 {...props.register("qtte", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This qtte is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.qtte ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.qtte && "3px"}
                                                 _placeholder={props.errors.qtte && { color: "P1red" }}
                                          />
                                          {props.errors.qtte && <Text color="P1red" fontWeight="medium" >{props.errors.qtte.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.qtte && <Text color="P1red" fontWeight="medium" >{props.errors.qtte.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Stack spacing={3}>
                                                 <Select 
                                                 isRequired
                                                 variant='flushed' 
                                                 paddingBottom="5px"
                                                 id="selling_point"
                                                 onChangeCapture={handleChange} 
                                                 defaultValue={props.selling_point.filter((x)=>x.id==props.product.selling_point)[0].id}
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
                                                               return <option 
                                                                             value={selling_point.id} 
                                                                             key={i}
                                                                      >
                                                                      {selling_point.name}
                                                                      </option>
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
                                                 onChangeCapture={handleChange}
                                                 defaultValue={props.famille.filter((x)=>x.id==props.product.famille)[0].id} 
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
                                                 onChangeCapture={handleChange} 
                                                 defaultValue={props.marque.filter((x)=>x.id==props.product.marque)[0].id} 
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
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.prix_U_achat}
                                                 onChangeCapture={handleChange}
                                                 id="prix_U_achat"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="prix_U_achat"
                                                 name="prix_U_achat"
                                                 {...props.register("prix_U_achat", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This prix_U_achat is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.prix_U_achat ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.prix_U_achat && "3px"}
                                                 _placeholder={props.errors.prix_U_achat && { color: "P1red" }}
                                          />
                                          {props.errors.prix_U_achat && <Text color="P1red" fontWeight="medium" >{props.errors.prix_U_achat.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prix_U_achat && <Text color="P1red" fontWeight="medium" >{props.errors.prix_U_achat.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.prix_vente_gros}
                                                 onChangeCapture={handleChange}
                                                 id="prix_vente_gros"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="prix_vente_gros"
                                                 name="prix_vente_gros"
                                                 {...props.register("prix_vente_gros", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This prix_vente_gros is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.prix_vente_gros ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.prix_vente_gros && "3px"}
                                                 _placeholder={props.errors.prix_vente_gros && { color: "P1red" }}
                                          />
                                          {props.errors.prix_vente_gros && <Text color="P1red" fontWeight="medium" >{props.errors.prix_vente_gros.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prix_vente_gros && <Text color="P1red" fontWeight="medium" >{props.errors.prix_vente_gros.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.prix_vente_revendeur}
                                                 onChangeCapture={handleChange}
                                                 id="prix_vente_revendeur"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="prix_vente_revendeur"
                                                 name="prix_vente_revendeur"
                                                 {...props.register("prix_vente_revendeur", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This prix_vente_revendeur is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.prix_vente_revendeur ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.prix_vente_revendeur && "3px"}
                                                 _placeholder={props.errors.prix_vente_revendeur && { color: "P1red" }}
                                          />
                                          {props.errors.prix_vente_revendeur && <Text color="P1red" fontWeight="medium" >{props.errors.prix_vente_revendeur.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prix_vente_revendeur && <Text color="P1red" fontWeight="medium" >{props.errors.prix_vente_revendeur.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.prix_vente_autre}
                                                 onChangeCapture={handleChange}
                                                 id="prix_vente_autre"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="prix_vente_autre"
                                                 name="prix_vente_autre"
                                                 {...props.register("prix_vente_autre", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This prix_vente_autre is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.prix_vente_autre ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.prix_vente_autre && "3px"}
                                                 _placeholder={props.errors.prix_vente_autre && { color: "P1red" }}
                                          />
                                          {props.errors.prix_vente_autre && <Text color="P1red" fontWeight="medium" >{props.errors.prix_vente_autre.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prix_vente_autre && <Text color="P1red" fontWeight="medium" >{props.errors.prix_vente_autre.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                                   <Box paddingRight="1em">
                                          <Input
                                                 paddingBottom="5px"
                                                 defaultValue={props.product.prix_detail}
                                                 onChangeCapture={handleChange}
                                                 id="prix_detail"
                                                 type="number"
                                                 color="P2Black"
                                                 variant="flushed"
                                                 _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                 placeholder="prix_detail"
                                                 name="prix_detail"
                                                 {...props.register("prix_detail", {
                                                        maxLength : {
                                                               value: 20,
                                                               message: 'This prix_detail is so long.' // JS only: <p>error message</p> TS only support string
                                                        },
                                                        required: 'This is required.'
                                                 })}                                                               
                                                 borderColor={props.errors.prix_detail ? "P1red" : "P3Gray"}
                                                 borderBottomWidth={props.errors.prix_detail && "3px"}
                                                 _placeholder={props.errors.prix_detail && { color: "P1red" }}
                                          />
                                          {props.errors.prix_detail && <Text color="P1red" fontWeight="medium" >{props.errors.prix_detail.type === 'required' && 'This is required.'}</Text>}
                                          {props.errors.prix_detail && <Text color="P1red" fontWeight="medium" >{props.errors.prix_detail.type === 'maxLength' && 'This name is so long.'}</Text>}
                                   </Box>
                            </Stack>
                     </form>
              </DrawerBody>
       )

}