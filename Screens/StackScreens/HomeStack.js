import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Details,
} from "../../BaseScreens";
import {Home} from '../UserScreens'
import {HomeDoctor} from '../DoctorScreens'
import {header} from '../../utils/styles'

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions ={header}>
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

export const HomeStackScreenDoctor = () => (
  <HomeStack.Navigator screenOptions ={header}>
    <HomeStack.Screen name="Home" component={HomeDoctor} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
  </HomeStack.Navigator>
);