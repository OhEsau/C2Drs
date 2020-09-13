import React, { useEffect, useCallback, useState, useContext } from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Button } from '../src/components';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from "../utils/authContext";
import AsyncStorage from "@react-native-community/async-storage";

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

async function restoreAsyncData() {
  try{
    const datos = await JSON.parse( await AsyncStorage.getItem('datosUsuario'));
    return datos;
  } catch(e){
    console.log('error en funcion datosUsuario')
    alert(e)
  }
}

export const Profile = ({ navigation }) => {
    const { signOut } = useContext(AuthContext);
    const [dataUser, setData] = useState([]);
    const [info, setInfo] = useState(true);
    useEffect(()=>{
      async function restoreSimpleData () {
        const response = await restoreAsyncData();
        console.log(response[1].name);
        if(response!==null){
          setData(response)
          setInfo(false)
        }
        else{
          console.log('falló');
        }
      }
      restoreSimpleData();
    }, [])
  
    return (
      <ScreenContainer>
        <Text>{info ? 'Cargando...' : 'Bienvenido ' + dataUser[1].name}</Text>
        <Button caption="Drawer" onPress={() => navigation.toggleDrawer()} />
        <Button caption="Sign Out" onPress={() => signOut()} />
      </ScreenContainer>
    );
  };

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