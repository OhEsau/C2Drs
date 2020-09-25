import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    CreateAccount,
    Welcome,
    NewRegister,
  } from "../BaseScreens";

import {SignIn} from '../Screens/SigIn'
import {UserRegister} from '../Screens/UserRegister'
import {DataUser} from '../Screens/DataUser'
import {DoctorData} from '../Screens/DoctorData'

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions ={{
    headerStyle: {
      backgroundColor: '#44C2CF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
    <AuthStack.Screen
      name="Welcome"
      component={Welcome}
      options={{ title: "Bienvenido" }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Iniciar Sesión" }}
    />
    <AuthStack.Screen
      name="NewRegister"
      component={NewRegister}
      options={{ title: "Nuevo Registro" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Crear cuenta" }}
    />
    <AuthStack.Screen
      name="UserRegister"
      component={UserRegister}
      options={{ title: "Registrar Nuevo Usuario" }}
    />
    <AuthStack.Screen
      name="DataUser"
      component={DataUser}
      options={{ title: "Registrar" }}
    />
    <AuthStack.Screen
      name="DoctorData"
      component={DoctorData}
      options={{ title: "Registro Doctor" }}
    />
  </AuthStack.Navigator>
);