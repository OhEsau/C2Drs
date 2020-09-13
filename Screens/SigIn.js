import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import { Input, Card } from 'react-native-elements';
import { validateAll } from 'indicative/validator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../src/components';

import { AuthContext } from "../utils/authContext";
import { update } from "lodash";

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export const SignIn = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);

    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [textEntry, setEntry] = useState(true);
    const [visibleStatusBar, setVisibleStatusBar] = useState(false);

    const [SignUpErrors, setSignUpErrors] = useState({});

    const data = {
        email: emailAddress,
        password: password,
    };

    const changeVisibilityStatusBar = () => {
        setVisibleStatusBar(!visibleStatusBar);
    };

    const updateSecureTextEntry = () => {
        setEntry(!textEntry);
    }

    useEffect(()=>{
        if(visibleStatusBar){
            const handleSignIn = () => {
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
                            await userData(data);
                        })
                    .catch(err => {
                        const formatError = {};
                        err.forEach(err => {
                            formatError[err.field] = err.message;
                        });
                        setSignUpErrors(formatError);
                        changeVisibilityStatusBar();
                    });
                }catch(e){
                    console.log(e.message);
                }
            };
            handleSignIn();
        } else {
            console.log('...')
        }
    },[visibleStatusBar])

    const userData = async (data) => {
        const ficha = await fetch('http://3.21.252.81/authentication/token/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                })
            })
            .then((response)=> response.json())
            .then(async (responseData) => {
                console.log(
                    "POST Response", "Response Body -> "+ JSON.stringify(responseData)
                )
                if(responseData.error!=null || responseData.Error!=null){
                    responseData.error ? alert('error: ' + JSON.stringify(responseData.error_description)) : null
                    responseData.Error ? alert('error: ' + JSON.stringify(responseData.Error)) : null
                    return null;
                }
                else{
                    await saveToken(responseData);
                    signIn({data});
                }
            })
            .catch(error => {
                console.log(error.message);
            });
            if(ficha === null){
                console.log('error')
                changeVisibilityStatusBar();
            }
    }
    
    const saveToken = async (dataApi) => {
        try {
            await AsyncStorage.setItem('datosUsuario', JSON.stringify(dataApi));
            let jsonValue = await AsyncStorage.getItem('datosUsuario');
            jsonValue = JSON.parse(jsonValue);
            console.log('async token: '+JSON.stringify(jsonValue[0].access_token))
        } catch (error){
            console.log(error.message);
        }
    }
  
    return (
        <ScreenContainer>
            <Card>
                <Input 
                    label={'Email'}
                    placeholder="Email"
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    textContentType={'emailAddress'}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
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
                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    caption={'Ingresar'}
                    onPress={changeVisibilityStatusBar}
                    disabled={visibleStatusBar}
                    loading={visibleStatusBar}
                />
                <TouchableOpacity onPress={() => navigation.push('CreateAccount')}>
                <Text style={{ marginLeft: 100 }}>
                    Registrate aquí
                </Text>
                </TouchableOpacity>
            </Card>
        </ScreenContainer>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});
