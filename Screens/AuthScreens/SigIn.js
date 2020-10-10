import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Input, Card } from 'react-native-elements';
import { validateAll } from 'indicative/validator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../src/components';
import {styles} from '../../utils/styles';

import { AuthContext } from "../../utils/authContext";

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export const SignIn = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);

    const [emailAddress, setemailAddress] = useState('esauolvera@live.com');
    const [password, setPassword] = useState('1234qwer');
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
                        .then(async () => {
                            await signIn(data);
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
