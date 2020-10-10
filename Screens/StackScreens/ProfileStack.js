import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {PerfilDoctor} from '../DoctorScreens'
import {Perfil } from '../UserScreens'
import {header} from '../../utils/styles'

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => (
    <ProfileStack.Navigator screenOptions ={header}>
      <ProfileStack.Screen name="Perfil" component={Perfil} />
    </ProfileStack.Navigator>
);

export const ProfileStackScreenDoctor = () => (
  <ProfileStack.Navigator screenOptions ={header}>
    <ProfileStack.Screen name="Perfil" component={PerfilDoctor} />
  </ProfileStack.Navigator>
);