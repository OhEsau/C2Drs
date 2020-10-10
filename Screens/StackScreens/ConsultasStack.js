import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Consultas} from '../UserScreens'
import {ConsultasDoctor} from '../DoctorScreens'
import {header} from '../../utils/styles'
import {CallScreen} from '../Items'


const ConsultaStack = createStackNavigator();

export const Consulta = () => (
    <ConsultaStack.Navigator screenOptions ={header}>
        <ConsultaStack.Screen name='Consultas' component={Consultas} />
        <ConsultaStack.Screen name='VideoCall' component={CallScreen} />
    </ConsultaStack.Navigator>
)

export const ConsultaDoctor = () => (
    <ConsultaStack.Navigator screenOptions ={header}>
        <ConsultaStack.Screen name='Consultas' component={ConsultasDoctor} />
        <ConsultaStack.Screen name='VideoCall' component={CallScreen} />
    </ConsultaStack.Navigator>
)