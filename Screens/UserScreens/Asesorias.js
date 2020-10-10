import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {styles} from '../../utils/styles';
import {} from 'react-native-modal-dropdown'

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

const IconButton = ({title, order}) => (
    <View style={{alignContent: 'stretch', alignItems: 'center', height: 100, width:100, marginHorizontal: 20, marginVertical: 20}}>
        <View>
            <TouchableOpacity style={{backgroundColor:'#44C2CF'}} onPress={order}>
                <Image source={require('../../assets/doctor.png')} style={{height: 100, width:100}}/>
            </TouchableOpacity>
            <Text style={styles.contenedor}>{title}</Text>
        </View>
    </View>
)

export const Asesorias = ({navigation}) => {
    return(
    <ScreenContainer>
        <ScrollView style={{alignContent: 'center'}}>
            <IconButton title='Cirugía Plástica' order={()=>navigation.push('Lista', {filter: 'plastic'})}/>
            <IconButton title='Psicología' order={()=>navigation.push('Lista', {filter: 'psico'})}/>
            <IconButton title='Nutrición' order={()=>navigation.push('Lista', {filter: 'nutri'})}/>
            <IconButton title='Endocrinología' order={()=>navigation.push('Lista', {filter: 'endocrino'})}/>
            <IconButton title='Cardiología' order={()=>navigation.push('Lista', {filter: 'cardio'})}/>
            <IconButton title='Psicología SAP' order={()=>navigation.push('Lista', {filter: 'psicoSAP'})}/>
            <IconButton title='Pediatría' order={()=>navigation.push('Lista', {filter: 'pediatr'})}/>
            <IconButton title='Neumonología' order={()=>navigation.push('Lista', {filter: 'neumo'})}/>
            <IconButton title='Dermatología' order={()=>navigation.push('Lista', {filter: 'derma'})}/>
            <IconButton title='Otorrinología' order={()=>navigation.push('Lista', {filter: 'otorrino'})}/>
            <IconButton title='Terapia de lenguaje' order={()=>navigation.push('Lista', {filter: 'lenguaje'})}/>
            <IconButton title='Oncología' order={()=>navigation.push('Lista', {filter: 'onco'})}/>
        </ScrollView>
    </ScreenContainer>
    );
}