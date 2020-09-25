import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { Button } from '../src/components';
import { Card, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Dialog from 'react-native-dialog';
import { AuthContext } from "../utils/authContext";
import {Picker} from '@react-native-community/picker';

import { validateAll } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer'
import {styles} from '../utils/styles';


const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const DataUser = ({navigation, route}) => {
    const { signUpClient } = useContext(AuthContext);
    
    const [email, setEmail] = useState(route.params.email);
    const [password, setPassWord] = useState(route.params.password);
    const [client_type, setType] = useState(route.params.client_type);
    const [name, setName] = useState('');
    const [last_name, setLastname] = useState('');
    const [first_name, setFirstName] = useState('');
    const [gender, setGender] = useState(2);
    const [birthday, setBirthday] = useState('01/01/2020');
    const [phone, setPhone] = useState('');
    
    const [visible, setVisible] = useState(false)
    const [mostrar, setMostrar] =useState(false)

    const [finalData, setData] = useState({
      email: '',
      password: '',
      name: '',
      first_name: '',
      last_name: '',
      gender: '',
      birthday: '',
      phone: '',
    });

    const [SignUpErrors, setSignUpErrors] = useState({});

    function validarDatos(){
    setSignUpErrors(null);
    const data = {
      name: name,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    }
      
    const rules = {
      name: 'required',
      first_name: 'required',
      last_name: 'required',
      phone: 'required|min:10|max:10',
    };

    const messages = {
        required: 'Campo Requerido',
        alpha: 'Símbolos no permitidos',
        'phone.min' : 'Número incompleto',
        'phone.max' : 'Solamente 10 dígitos',
    };

    const sanitizationRules = {
      name: 'trim',
      first_name: 'trim',
      last_name: 'trim',
      phone: 'trim'
    }
    
    const dataClean = sanitize(data, sanitizationRules)

    setName(dataClean.name)
    setFirstName(dataClean.first_name)
    setLastname(dataClean.last_name)
    setPhone(dataClean.phone)

    validateAll(dataClean, rules, messages)
      .then(() => {
        showData();
      })
      .catch(err => {
        const formatError = {};
        err.forEach(err => {
          formatError[err.field] = err.message;
        });
      setSignUpErrors(formatError);
      })
    
    }

    function showData () {
      setVisible(!visible);
    }

    function obtenerGenero (genero){
      switch (genero){
        case 0:
          return 'Masculino';
        case 1:
          return 'Femenino';
        case 2:
          return 'Otro';
        default:
          break;
      }
    }

    function nextStep (){
      switch(client_type){
        case 0: //Registro para pacientes
          console.log(finalData);
          signUpClient(finalData);
          showData();
          break;
        case 1: //Registro para doctores
          console.log('Doctor');
          navigation.push('DoctorData', {
            email: email,
            password: password,
            name: name,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            birthday: birthday,
            phone: phone,
          })
          showData();
          break;
        default:
          break;
      }
    }

    useEffect(() => {
      setData(prevState => ({
        ...prevState,
        email: email,
        password: password,
        client_type: client_type,
        name: name,
        first_name: first_name,
        last_name: last_name,
        birthday: birthday,
        gender: gender,
        phone: phone,
      }))

      if(visible){
        setMostrar(true)
      } else {
        setMostrar(false)
      }
    }, [visible, name, last_name, first_name, gender, birthday, phone])

    return (
    <ScrollView>    
    <ScreenContainer>
        <Card style={styles.container}>
        <Text style={styles.contenedor} > Ingrese sus datos personales por favor</Text>
            <Input
                placeholder="Nombre(s)"
                value={name}
                onChangeText={setName}
                textContentType={'name'}
                autoCapitalize={'characters'}
                keyboardType={'default'}
                errorStyle={{ color: 'red' }}
                errorMessage={SignUpErrors ? SignUpErrors.name : null}
            />
            <Input
                placeholder="Apellido Paterno"
                value={first_name}
                onChangeText={setFirstName}
                textContentType={'name'}
                autoCapitalize={'characters'}
                keyboardType={'default'}
                errorStyle={{ color: 'red' }}
                errorMessage={SignUpErrors ? SignUpErrors.first_name : null}
            />
            <Input
                placeholder="Apellido Materno"
                value={last_name}
                onChangeText={setLastname}
                textContentType={'name'}
                autoCapitalize={'characters'}
                keyboardType={'default'}
                errorStyle={{ color: 'red' }}
                errorMessage={SignUpErrors ? SignUpErrors.last_name : null}
            />
            <View style={{paddingVertical: 10}}>
            <Picker 
              selectedValue={gender}
              onValueChange={setGender}
            >
              
              <Picker.Item label="Masculino" value={0} />
              <Picker.Item label="Femenino" value={1} />
              <Picker.Item label="Otro" value={2} />
            </Picker>
            </View>
            <Text style={styles.contenedor} >Fecha de Nacimiento</Text>
            <View style={{alignItems: 'center', paddingVertical: 10}}>
            <DatePicker
              date={birthday} 
              mode="date" 
              placeholder="Fecha de Nacimiento"
              format="DD/MM/YYYY"
              minDate="01/01/1900"
              maxDate="01/01/2020"
              confirmBtnText="Aceptar"
              cancelBtnText="Cambiar"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={setBirthday}
            />
            </View>
            <Input 
              placeholder="Teléfono 10 dígitos"
              value={phone}
              onChangeText={setPhone}
              textContentType={'telephoneNumber'}
              autoCapitalize={'words'}
              keyboardType={'number-pad'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.phone : null}
            />
            <Button 
              disabled = {mostrar}
              caption = "Continuar"
              onPress = {() => validarDatos()}
              loading= {mostrar}
            />
        </Card>
        <View>
        <Dialog.Container visible={mostrar}>
          <Dialog.Title>Confirmar Información</Dialog.Title>
          <Dialog.Description>
            ¿Estás de acuerdo con esta Información?{'\n'}
            Correo: {email},{'\n'}
            Nombre(s): {name},{'\n'}
            Apellido Paterno: {first_name},{'\n'}
            Apellido Materno: {last_name}, {'\n'}
            Sexo: {obtenerGenero(gender)}, {'\n'}
            Fecha de Nac.: {birthday}, {'\n'}
            Teléfono: {phone}, {'\n'}
          </Dialog.Description>
          <Dialog.Button label="Cancelar" onPress={showData} />
          <Dialog.Button label="Continuar" onPress={nextStep} />
        </Dialog.Container>
        </View>
    </ScreenContainer>
    </ScrollView>
    )
}