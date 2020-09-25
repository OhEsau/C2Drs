import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Button } from '../../src/components';
import { Card, Input } from 'react-native-elements';
import { validateAll } from 'indicative/validator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../utils/styles';

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const UserRegister = ({navigation, route}) => {
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('1234qwer');
    const [confirm_email, setConfirmEmail] = useState('');
    const [confirm_password, setConfirmPass] = useState('1234qwer');
    const [SignUpErrors, setSignUpErrors] = useState({});
    const [textEntry, setEntry] = useState(true);
    
    const [loginButton, enableButton] = useState(true)
    const [loading, nowLoading] = useState(false);
    const [isValidEmail, compareEmail] = useState(false);
    const [isValidPassword, comparePassword] = useState(false);

    const [errorEmail, setErrorEmail] =useState('');
    const [errorPass, setErrorPass] = useState('');

    // cambio de valor para mostrar u ocultar la contraseña
    const updateSecureTextEntry = () => {
        setEntry(!textEntry);
    }

    //Verificación del correo
    async function verificarEmailAPI (email){
        nowLoading(true);
        const verificacion = await fetch('https://conn2drs.herokuapp.com/authentication/emailverify/', {
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then((response)=> response.json())
        .then((responseData) => {
            if(responseData[0] === "Este email ya esta registrado"){
                alert('Este email ya esta registrado')
                return false;
            } else {
                console.log('fail')
                navigation.push('DataUser',{
                    client_type: route.params.client_type,
                    email: emailAddress,
                    password: password
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        });
        nowLoading(false)
    }

    // funcion para comprobar el email
    useEffect(()=>{
        if(confirm_email!==''){
            if(confirm_email !== emailAddress){
                setErrorEmail('Correo no coincide');
                compareEmail(false);
            } else{
                setErrorEmail(null);
                compareEmail(true);            
            }
        }                
    },[confirm_email, emailAddress])

    // funcion para comprobar la contraseña
    useEffect(()=>{     
        if(confirm_password!==''){
            if(confirm_password !== password){
                setErrorPass('Contraseña no coincide');
                comparePassword(false)
            } else{
                setErrorPass(null);
                comparePassword(true);
            }
        }
    }, [confirm_password, password])

    // funcion para activar el boton de ingreso
    useEffect(() => {
        function habilitarBoton (){
            if(isValidPassword && isValidEmail){
                enableButton(false)
            }
            else{
                enableButton(true)
            }
        }
        habilitarBoton();
        
    }, [isValidEmail, isValidPassword])

    const handleRegister = () =>{
        data = {
            email: emailAddress,
            password: password
        }
        const rules = {
            email: 'required|email',
            password: 'required|string|min:8|max:40'
        };

        const messages = {
            required: field => `se necesita ${field}`,
            'username.alpha': 'Símbolos no permitidos',
            'email.email': 'Ingrese un correo válido por favor',
            'password.min': '¿Contraseña Incorrecta?'
        };

        try{
            validateAll(data, rules, messages)
                .then(async() => {
                    verificarEmailAPI(emailAddress)
                })
            .catch(err => {
                const formatError = {};
                err.forEach(err => {
                    formatError[err.field] = err.message;
                });
                setSignUpErrors(formatError);
            });
        }catch(e){
            console.log(e.message);
        }
    }

    return(
        <ScrollView>
            <ScreenContainer>
            <Card style={styles.container}>
                <Text style={styles.contenedor} >Nueva cuenta de {route.params.client_type ? 'Doctor' : 'Paciente'}</Text>
                <Text style={styles.contenedor} >Por favor, ingrese sus datos correctos</Text>
                <Input
                    placeholder="Correo Electrónico"
                    leftIcon={
                        <Icon
                            name='envelope-o'
                            color='black'
                            size={20}
                        />
                    }
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    textContentType={'emailAddress'}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
                />
                <Input
                    placeholder="Confirmar Correo"
                    leftIcon={
                        <Icon
                            name='envelope-o'
                            color='black'
                            size={20}
                        />
                    }
                    value={confirm_email}
                    onChangeText={setConfirmEmail}
                    textContentType={'emailAddress'}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorEmail}
                />
                <Input
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry = {textEntry ? true : false}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                    rightIcon={                        
                        <TouchableOpacity onPress={()=>updateSecureTextEntry()}>
                            {
                                textEntry ?
                                <Icon 
                                    name='eye'
                                    color='black'
                                    size={20}
                                />
                                :
                                <Icon 
                                    name='eye-slash'
                                    color='gray'
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    }
                />
                <Input
                    placeholder="Confirmar Contraseña"
                    value={confirm_password}
                    onChangeText={setConfirmPass}
                    secureTextEntry = {textEntry ? true : false}
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorPass}
                    rightIcon={                        
                        <TouchableOpacity onPress={()=>updateSecureTextEntry()}>
                            {
                                textEntry ?
                                <Icon 
                                    name='eye'
                                    color='black'
                                    size={20}
                                />
                                :
                                <Icon 
                                    name='eye-slash'
                                    color='gray'
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    }
                />

                <Button
                    disabled={loginButton}
                    caption="Continuar"
                    onPress={() => handleRegister()} //verificar email
                    loading = {loading}
                />
            </Card>
            </ScreenContainer>
        </ScrollView>
    )
}