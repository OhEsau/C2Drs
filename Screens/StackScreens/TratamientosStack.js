import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {TratamientosDoctor} from '../DoctorScreens';
import {Tratamientos} from '../UserScreens';
import {header} from '../../utils/styles'

const TratamientosStack = createStackNavigator();

export const Tratamiento = () => (
    <TratamientosStack.Navigator screenOptions ={header}>
        <TratamientosStack.Screen name='Tratamientos' component={Tratamientos} />
    </TratamientosStack.Navigator>
);

export const TratamientoDoctor = () => (
    <TratamientosStack.Navigator screenOptions ={header}>
        <TratamientosStack.Screen name='Tratamientos' component={TratamientosDoctor} />
    </TratamientosStack.Navigator>
);