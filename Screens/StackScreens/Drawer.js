import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {TabsScreen, TabsScreenDoctor} from '../StackScreens/Tabs';
import {Consulta, ConsultaDoctor} from './ConsultasStack';
import {Asesoria, AsesoriaDoctor} from './AsesoriaStack';
import {ProfileStackScreen, ProfileStackScreenDoctor}from './ProfileStack';
import {Expedientes, ExpedientesDoctor} from './ExpedienteStack';
import {Tratamiento, TratamientoDoctor} from './TratamientosStack';
import {Doctor} from './ContactosStack';

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Consultas" component={Consulta} />
    <Drawer.Screen name="Asesorias" component={Asesoria} />
    <Drawer.Screen name="Perfil" component={ProfileStackScreen} />
    <Drawer.Screen name="Expediente" component={Expedientes} />
    <Drawer.Screen name="Tratamiento" component={Tratamiento} />
    <Drawer.Screen name="Doctores" component={Doctor} />
  </Drawer.Navigator>
);

export const DrawerScreenDoctor = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={TabsScreenDoctor} />
    <Drawer.Screen name="Consultas" component={ConsultaDoctor} />
    <Drawer.Screen name="Asesorias" component={AsesoriaDoctor} />
    <Drawer.Screen name="Perfil" component={ProfileStackScreenDoctor} />
    <Drawer.Screen name="Expediente" component={ExpedientesDoctor} />
    <Drawer.Screen name="Tratamiento" component={TratamientoDoctor} />
  </Drawer.Navigator>
);