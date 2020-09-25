import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Consultas} from '../UserScreens'
import {ConsultasDoctor} from '../DoctorScreens'
import {header} from '../../utils/styles'


const ConsultaStack = createStackNavigator();

export const Consulta = () => (
    <ConsultaStack.Navigator screenOptions ={header}>
        <ConsultaStack.Screen name='Consultas' component={Consultas} />
    </ConsultaStack.Navigator>
)

export const ConsultaDoctor = () => (
    <ConsultaStack.Navigator screenOptions ={header}>
        <ConsultaStack.Screen name='Consultas' component={ConsultasDoctor} />
    </ConsultaStack.Navigator>
)