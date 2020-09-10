import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { validateAll } from 'indicative/validator';
import { View, Text } from 'react-native';
import {
    Input,
    Card,
    Button
} from 'react-native-elements';

import { AuthContext } from '../../utils/authContext';

const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
            const jsonValue = await AsyncStorage.getItem('token');
            console.log(JSON.stringify(jsonValue))
        } catch (error){
            console.log(error);
        }
    }

const SignInScreen = ({ navigation }) => {

    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [user, setCuenta] = useState({user_name: ''});
    const [SignUpErrors, setSignUpErrors] = useState({});

    const { signIn, signUp } = useContext(AuthContext);

    const handleSignIn = () => {
        // https://indicative.adonisjs.com
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6|max:40'
        };

        const data = {
            email: emailAddress,
            password: password,
        };

        const messages = {
            required: field => `se necesita ${field}`,
            'username.alpha': 'Símbolos no permitidos',
            'email.email': 'Ingrese un correo válido por favor',
            'password.min': '¿Contraseña Incorrecta?'
        };

        fetch('https://con2doc.live/authentication/token/', {
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
        .then((responseData) => {
            console.log('primer paso, user data');
            console.log(
                "POST Response", "Response Body -> "+ JSON.stringify(responseData)
            )
            console.log('bienvenido: ' + responseData[1].name);
            console.log('asignacion del token')
            saveToken(responseData[0].access_token);
            console.log(responseData[0].access_token)
            setCuenta({user_name: responseData[1].name})
            console.log('log: '+user);
        })
        .catch(error => {
            console.log(error);
        });

        validateAll(data, rules, messages)
            .then(() => {
                signIn({ emailAddress, password, user});
            })
            .catch(err => {
                const formatError = {};
                err.forEach(err => {
                    formatError[err.field] = err.message;
                });
                setSignUpErrors(formatError);
            });
    };

    return (
        <View>
            <Card>
                <Input
                    label={'Email'}
                    placeholder="Email"
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                />
                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    title="Sign in"
                    onPress={() => handleSignIn()}
                />
                <Text style={{ marginLeft: 100 }} onPress={() => signUp()}>
                    No Acount? Sign Up
                </Text>
            </Card>
        </View>
    );
};

export default SignInScreen;