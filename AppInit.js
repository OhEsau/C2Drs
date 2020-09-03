import React, {useContext} from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

import { AuthContext } from './utils/authContext';

const AppInit = ({navigation}) => {
  const { signOut } = useContext(AuthContext);
    return (
      <View style={styles.container}>
        <Text style={{flex: 1}}>signIn.user.name</Text>
      <Button
        title="Salir"
        onPress={() => {signOut()}}
      />
      </View>
    );
};

export default AppInit;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});