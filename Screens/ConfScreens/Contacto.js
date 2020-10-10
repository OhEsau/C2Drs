import React from "react";
import {View, Text} from 'react-native';
import {styles} from '../../utils/styles';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );

export const Contacto = () => (
    <ScreenContainer>
      <Text>Información para contacto</Text>
    </ScreenContainer>
);