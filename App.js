import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "./utils/authContext";
import {AuthStackScreen} from './Screens/AuthScreen'
import {
  CreateAccount,
  Search,
  Home,
  Details,
  Search2,
  Splash,
  Welcome,
  NewRegister,
} from "./Screens";

import {Profile} from './Screens/Profile'
import AsyncStorage from "@react-native-community/async-storage";

import {iniciarSesion, registrarPaciente, registrarDoctor} from './src/helpers/conexiones'

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const DrawerScreenDoctor = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken, client_type }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      client_type ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false
          }}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={DrawerScreenDoctor}
          options={{
            animationEnabled: false
          }}
        />
      )
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

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
            alert('Acceso completado');
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