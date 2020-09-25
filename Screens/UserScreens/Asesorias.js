import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {styles} from '../../utils/styles';
import {} from 'react-native-modal-dropdown'

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

const IconButton = ({title, order}) => (
    <View>
        <View style={{alignContent: 'center', alignItems: 'center', height: 100, width:100, marginHorizontal: 20, marginVertical: 20}}>
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
        <ScrollView>
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
                <IconButton title='Cirugía Plástica' order={'plastic'}/>
                <IconButton title='Psicología' order={()=>navigation.push('Lista', {filter: 'psico'})}/>
            </View>
        </View>
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
                <IconButton title='Nutrición' order={'nutri'}/>
                <IconButton title='Endocrinología' order={'endocrino'}/>
            </View>
        </View>
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
                <IconButton title='Cardiología' order={'cardio'}/>
                <IconButton title='Psicología SAP' order={'psiSAP'}/>
            </View>
        </View>
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
                <IconButton title='Pediatría' order={'pediatria'}/>
                <IconButton title='Neumonología' order={'neumo'}/>
            </View>
        </View>
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
                <IconButton title='Dermatología' order={'derma'}/>
                <IconButton title='Otorrinología' order={'otorrino'}/>
            </View>
        </View>
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
                <IconButton title='Terapia de lenguaje' order={'lenguaje'}/>
                <IconButton title='Oncología' order={'onco'}/>
            </View>
        </View>
        </ScrollView>
    </ScreenContainer>
    );
}