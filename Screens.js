import React, { useEffect, useCallback, useState, useContext } from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Button } from './src/components';
import { Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from "./utils/authContext";
import AsyncStorage from "@react-native-community/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({ navigation }) => (
  <ScreenContainer>
    <Text>Master List Screen</Text>
    <Button
      caption="React Native by Example"
      onPress={() =>
        navigation.push("Details", { name: "React Native by Example " })
      }
    />
    <Button
      caption="React Native School"
      onPress={() =>
        navigation.push("Details", { name: "React Native School" })
      }
    />
    <Button caption="Drawer" onPress={() => navigation.toggleDrawer()} />
  </ScreenContainer>
);

export const Details = ({ route }) => (
  <ScreenContainer>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </ScreenContainer>
);

export const Search = ({ navigation }) => (
  <ScreenContainer>
    <Text>Search Screen</Text>
    <Button caption="Search 2" onPress={() => navigation.push("Search2")} />
    <Button
      caption="React Native School"
      onPress={() => {
        navigation.navigate("Home", {
          screen: "Details",
          params: { name: "React Native School" }
        });
      }}
    />
  </ScreenContainer>
);

export const Search2 = () => (
  <ScreenContainer>
    <Text>Search2 Screen</Text>
  </ScreenContainer>
);

export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
);

export const Welcome = ({navigation}) => (
  <ScreenContainer>
    <Card style={styles.container}>
      <Text>Bienvenido</Text>
      <Button
        caption="Ingresar"
        onPress={() => navigation.push('SignIn')}
      />
      <Button
        caption="Registrarse"
        onPress={() => navigation.push('NewRegister')}
      />
    </Card>
  </ScreenContainer>
);

export const NewRegister = ({navigation}) => (
  <ScreenContainer>
    <Card style={styles.container}>
      <Text>Por favor seleccione la opción deseada para crear una nueva cuenta</Text>
      <Button
        caption="Soy Paciente"
        onPress={() => navigation.push('UserRegister', {client_type: 1})}
      />
      <Button
        caption="Soy Doctor"
        onPress={() => navigation.push('UserRegister', {client_type: 0})}
      />
    </Card>
  </ScreenContainer>
);

export const CreateAccount = () => {
  const { signUp } = useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button caption="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
};