import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Button } from '../src/components';
import { Card, Input } from 'react-native-elements';
import { validateAll } from 'indicative/validator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { update } from "lodash";

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
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const UserRegister = ({navigation, route}) => {
    const [emailAddress, setemailAddress] = useState('');
    const [confirmEmailAddress, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPass] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});
    const [textEntry, setEntry] = useState(true);
    const [disabledButton, activateButton] = useState(false);
    
    const data = {
        trueEmail: emailAddress,
        truePassword: password,
    };

    const updateSecureTextEntry = () => {
        setEntry(!textEntry);
    }

    const updateButton = () =>{
        console.log(disabledButton ? 'encendido' : 'apagado')
        activateButton(!disabledButton);
    }

    const compareData = () =>{
        if(password===confirm_password && emailAddress===confirmEmailAddress){
            updateButton();
        }
    }

    const handleRegister = () =>{
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
                    //await userData(data);
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
        <ScreenContainer>
            <Card style={styles.container}>
                <Text>Nueva cuenta de {route.params.client_type ? 'Paciente' : 'Doctor'}</Text>
                <Text>Por favor, ingrese sus datos correctos</Text>
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
                    onChangeText={setemailAddress, updateButton}
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
                    value={confirmEmailAddress}
                    onChangeText={setConfirmEmail, updateButton}
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
                <Input
                    placeholder="Confirmar Contraseña"
                    value={confirm_password}
                    onChangeText={setConfirmPass}
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
                    disabled={false}
                    caption="Continuar"
                    onPress={updateButton}
                    loading = {false}
                />
            </Card>
        </ScreenContainer>
    )
}