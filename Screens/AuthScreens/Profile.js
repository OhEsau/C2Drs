import React, { useEffect, useCallback, useState, useContext } from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Button } from '../../src/components';
import {styles} from '../../utils/styles';

import { AuthContext } from "../../utils/authContext";
import {restoreAsyncData} from '../../utils/conexiones';

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const Profile = ({ navigation }) => {
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
  
    return (
      <ScreenContainer>
        <Text>{info ? 'Cargando...' : 'Bienvenido ' + dataUser[1].name}</Text>
        <Button caption="Drawer" onPress={() => navigation.toggleDrawer()} />
        <Button caption="Sign Out" onPress={() => signOut()} />
      </ScreenContainer>
    );
  };