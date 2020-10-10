import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Search,
    Search2,
} from "../../BaseScreens";
import {header} from '../../utils/styles'

const SearchStack = createStackNavigator();
export const SearchStackScreen = () => (
    <SearchStack.Navigator screenOptions ={header}>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Search2" component={Search2} />
    </SearchStack.Navigator>
);