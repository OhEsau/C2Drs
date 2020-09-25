import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {ExpedienteDoctor} from '../DoctorScreens';
import {Expediente} from '../UserScreens';
import {header} from '../../utils/styles'

const ExpedienteStack = createStackNavigator();

export const Expedientes = () => (
    <ExpedienteStack.Navigator screenOptions={header}>
        <ExpedienteStack.Screen name='Expediente' component={Expediente} />
    </ExpedienteStack.Navigator>
);

export const ExpedientesDoctor = () => (
    <ExpedienteStack.Navigator screenOptions ={header}>
        <ExpedienteStack.Screen name='Expediente' component={ExpedienteDoctor} />
    </ExpedienteStack.Navigator>
);