import React from 'react';
import {StyleSheet} from 'react-native'
import {fonts} from '../src/styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'stretch',
        margin: 20,
      },
      button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
      },
      contenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        letterSpacing: 1,
        fontSize: 15,
        fontFamily: fonts.primaryBold,
        textAlign: 'center',
      },
});

export const header = {
    headerStyle: {
      backgroundColor: '#44C2CF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
}