import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Asesorias, ListaMedicos} from '../UserScreens'
import { AsesoriasDoctor} from '../DoctorScreens'
import {header} from '../../utils/styles'

const AsesoriaStack = createStackNavigator();

export const Asesoria = () => (
    <AsesoriaStack.Navigator screenOptions ={header}>
        <AsesoriaStack.Screen name='Asesorias' component={Asesorias} />
        <AsesoriaStack.Screen name='Lista' component={ListaMedicos} />
    </AsesoriaStack.Navigator>
)

export const AsesoriaDoctor = () => (
    <AsesoriaStack.Navigator screenOptions ={header}>
        <AsesoriaStack.Screen name='Asesorias' component={AsesoriasDoctor} />
    </AsesoriaStack.Navigator>
)