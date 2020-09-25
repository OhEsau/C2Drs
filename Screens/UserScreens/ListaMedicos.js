import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {styles} from '../../utils/styles'

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export const ListaMedicos = ({route}) => {
    return (
        <ScreenContainer>
            <Text>Lista de Doctores {route.params.filter}</Text>
        </ScreenContainer>
    );
}