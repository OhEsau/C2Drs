import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Doctores} from '../UserScreens'
import {header} from '../../utils/styles'

const ContactosStack = createStackNavigator();

export const Doctor = () => (
    <ContactosStack.Navigator screenOptions ={header}>
        <ContactosStack.Screen name='Doctores' component={Doctores} />
    </ContactosStack.Navigator>
);