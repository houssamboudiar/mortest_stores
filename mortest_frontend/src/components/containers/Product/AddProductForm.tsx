import React, { useState, useEffect, useCallback } from 'react'
import {
       Box, Button, Divider, DrawerBody, FormLabel, Heading, Input,
       InputGroup, InputLeftElement, Select, Stack, Text, css, Avatar, IconButton, Center
} from '@chakra-ui/react'
import { AddIcon, AttachmentIcon, PhoneIcon } from '@chakra-ui/icons'
// import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { ErrorMessage } from '@hookform/error-message';

interface IProps {
       errors:any,
       register:any,
       handleSubmit:any,
}

export const AddProductForm: React.FC<IProps> = (props:IProps) => {
       // export interface IProduct {
       //        selling_point: number,
       //        reference: number,
       //        article: string,
       //        img: null,
       //        unit: number,
       //        famille: number,
       //        marque: number,
       //        prix_U_achat: number,
       //        prix_detail: number,
       //        prix_vente_gros: number,
       //        prix_vente_revendeur: number,
       //        prix_vente_autre: number,
       //        stock_alerte: null,
       //        stock_actuel: null,
       //        qtte: null,
       //        ancien_prix: null,
       //        marge_vente_detail: number,
       //        marge_vente_grossiste: number,
       //        marge_vente_revendeur: number,
       //        marge_vente_autre: number
       // }
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
                                          <Box display="flex" flexDir="column" >
                                                 <Box width="50%" paddingRight="1em">
                                                        <FormLabel color="P2TableGray" htmlFor="firstName">First Name</FormLabel>
                                                        <Input
                                                               paddingBottom="5px"
                                                               id="firstName"
                                                               type="text"
                                                               color="P2Black"
                                                               fontWeight="bold"
                                                               variant="flushed"
                                                               _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                               _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                               placeholder="John"
                                                               name="firstName"
                                                               {...props.register("firstName", {
                                                                      maxLength : {
                                                                        value: 20,
                                                                        message: 'This name is so long.' // JS only: <p>error message</p> TS only support string
                                                                      },
                                                                      required: 'This is required.'
                                                               })}                                                               
                                                               borderColor={props.errors.firstName ? "P1red" : "P3Gray"}
                                                               borderBottomWidth={props.errors.firstName && "3px"}
                                                               _placeholder={props.errors.firstName && { color: "P1red" }}
                                                        />
                                                        <ErrorMessage errors={props.errors} name="firstName" />
                                                        {props.errors.firstName && <Text color="P1red" fontWeight="medium" >{props.errors.firstName.type === 'required' && 'This is required.'}</Text>}
                                                        {props.errors.firstName && <Text color="P1red" fontWeight="medium" >{props.errors.firstName.type === 'maxLength' && 'This name is so long.'}</Text>}
                                                 </Box>
                                                 <Box width="50%" paddingRight="1em">
                                                        <FormLabel color="P2TableGray" htmlFor="lastName">Last Name</FormLabel>
                                                        <Input
                                                               id="lastName"
                                                               type="text"
                                                               name="lastName"
                                                               color="P2Black"
                                                               fontWeight="bold"
                                                               variant="flushed"
                                                               // _hover={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                               // _focus={{ borderColor: "P1Blue", borderBottomWidth: "3px" }}
                                                               placeholder="Doe"
                                                               // ref={props.register({ required: true, maxLength: 20 })}
                                                               // borderColor={props.errors.lastName ? "P1red" : "P3Gray"}
                                                               // borderBottomWidth={props.errors.lastName && "3px"}
                                                               // _placeholder={props.errors.lastName && { color: "P1red" }}
                                                        />
                                                        {/* {props.errors.lastName && <Text color="P1red" fontWeight="medium" >{props.errors.lastName.type === 'required' && 'This is required.'}</Text>} */}
                                                        {/* {props.errors.lastName && <Text color="P1red" fontWeight="medium" >{props.errors.lastName.type === 'maxLength' && 'This name is so long.'}</Text>} */}
                                                 </Box>
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