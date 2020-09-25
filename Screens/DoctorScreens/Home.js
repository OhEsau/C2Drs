import React, {useContext, useState, useEffect} from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Button } from '../../src/components';
import {styles} from '../../utils/styles';

import {restoreAsyncData} from '../../utils/conexiones';
import { AuthContext } from "../../utils/authContext";

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export const HomeDoctor = ({ navigation }) => {
    const { signOut } = useContext(AuthContext);
    const [dataUser, setData] = useState([]);
    const [info, setInfo] = useState(true);

    useEffect(()=>{
      async function restoreSimpleData () {
        const response = await restoreAsyncData();
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
  
  return(
    <ScreenContainer>
      <Text style={styles.contenedor}>Bienvenido Doctor {info ? 'Cargando...' : dataUser[1].name} </Text>
      <Button caption="Menú" onPress={() => navigation.toggleDrawer()} style={{marginVertical: 10}}/>
      <Button caption="Salir" onPress={() => signOut()} />
    </ScreenContainer>
  );
}