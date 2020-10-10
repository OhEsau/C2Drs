import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {HomeStackScreen, HomeStackScreenDoctor} from '../StackScreens/HomeStack'
import {SearchStackScreen} from '../StackScreens/SearchStack'

const Tabs = createBottomTabNavigator();
export const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

export const TabsScreenDoctor = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreenDoctor} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);