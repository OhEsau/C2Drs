import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "./utils/authContext";
import { Splash } from "./BaseScreens";
import {RootStackScreen} from './Screens/StackScreens/RootStack'

import {iniciarSesion, registrarPaciente, registrarDoctor} from './utils/conexiones'

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [message, setMessage] = React.useState('Espere un segundo por favor');
  const [client_type, setClientType] = React.useState('');

  const authContext = React.useMemo(() => {
    return {
      signIn: async (data) => {
        setIsLoading(true);
        try {
          setMessage('Iniciando Sesión')
          const acceso = await iniciarSesion(data);
          if(acceso){
            setMessage('Esperando Token')
            let jsonValue = await AsyncStorage.getItem('datosUsuario');
            jsonValue = JSON.parse(jsonValue);
            setUserToken(jsonValue[0].access_token);
            setClientType(jsonValue[1].client_type);
            console.log('cliente: ' + jsonValue[1].client_type);
            setIsLoading(false);
          }
          else{
            alert('Inicio Fallido')
          }
          setIsLoading(false);
        } catch(e){
          console.log(e)
        }
        setIsLoading(false);
      },
      signUpClient: async (data) => {
        setIsLoading(true)
        setMessage('Registrando nuevo usuario')
        try{
          const registro = await registrarPaciente(data);
          setMessage('Regresando al menú')
          alert('Registro Exitoso!')
        } catch(e){
          console.log(e);
          alert('Fallo el Registro');
        }
        setIsLoading(false);
      },
      signUpDoctor: async (data1, data2) => {
        console.log('primero: ' +data1 + 'segundo' + data2)
        setIsLoading(true)
        setMessage('Registrando nuevo Medico')
        try{
          const registro = await registrarDoctor(data1, data2);
          setMessage('Regresando al menú')
          alert('Registro Exitoso!')
        } catch(e){
          console.log(e);
          alert('Fallo el Registro');
        }
        setIsLoading(false);
      },
      signOut: async () => {
        setIsLoading(true);
        setMessage('Saliendo de la aplicación')
        try{
          await AsyncStorage.removeItem('datosUsuario')
          setUserToken(null);
        } catch (e){
          console.log(e)
        }
        setIsLoading(false)
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash message = {message}/>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} client_type={client_type}/>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};