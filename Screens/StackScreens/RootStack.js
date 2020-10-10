import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {DrawerScreen, DrawerScreenDoctor} from './Drawer'
import {AuthStackScreen} from './AuthStack'

const RootStack = createStackNavigator();
export const RootStackScreen = ({ userToken, client_type }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      client_type ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreenDoctor}
          options={{
            animationEnabled: false
          }}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false
          }}
        />
      )
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);