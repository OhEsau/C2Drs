import React, {useState, useEffect} from "react";
import {View, Text,} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Input } from 'react-native-elements';
import { Button } from '../../src/components';
import {ListItem, Avatar, Overlay} from 'react-native-elements'
import {FlatList} from 'react-native-gesture-handler'
import {styles} from '../../utils/styles';
import {Splash} from '../../BaseScreens';
import {useUserToken, useListaDoctores} from '../Items'
import {restoreAsyncData, crearCitaApi} from '../../utils/conexiones'

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export const ListaMedicos = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [step, nextStep] = useState(false);
    const [step2, nextStep2] = useState(false);
    const [lista, setLista] = useState([]);
    const [newLista, setNewLista] =useState([]);
    
    const [dataUser, setDataUser] = useState([]);
    const [token, setToken] = useState('');

    const [visible, setVisible] = useState(false);

    const [cardData, setCardData] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [showCita, setShowCita] = useState(false);

    const [cita, setCita] =useState('');
    const [appointment_type, setAppointment_type] = useState('General');
    const [appointment_reason, setAppointment_reason] =useState('Razon del servicio');
    
    useEffect(()=>{
        async function getToken(){
            setToken(await useUserToken());
            const response = await restoreAsyncData()
            if(response!==null){
                setDataUser(response)
            } else {
                console.log('fail!')
            }
            nextStep(true);
        }
        getToken();
    }, [])

    useEffect(()=>{
        async function getLista(){
            setLista(await useListaDoctores(token));
            nextStep2(true)
        }
        if(step){
            getLista();
        }
        else{
            console.log('cargado')
        }
    }, [step])
    
    useEffect(()=>{
        function crearLista(){
            lista.forEach((x)=>{
                if(x!==null){
                    setNewLista(arr => [...arr, {
                        id: x.id,
                        name: x.user.name,
                        first_name: x.user.first_name,
                        last_name: x.user.last_name,
                        email : x.user.email,
                        postgraduate: x.postgraduate,
                        professional_license: x.professional_license,
                        speciality: x.speciality,
                        university: x.university
                    }])
                }
            })
        }
        
        if(step2){
            crearLista();
            setLoading(true);
        }
        else{
            console.log('cargado')
        }
    }, [step2])


    const toggleOverlay = (item) =>{
        setVisible(!visible);
        setCardData(item);
    }

    const onAccept = (fecha) =>{
        console.log(fecha)
        const newDate = fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDay()+' '+fecha.getHours()+':'+fecha.getMinutes()
        console.log(newDate)
        setCita(newDate)
        onHide()
        setVisible(!visible)
        setShowCita(!showCita)
    }

    const onShow = () => {
        setShowDatePicker(true)
    };

    const onHide = () => {
        setShowDatePicker(false)
    }

    const agendarCita = async () => {
        console.log('Creando  nueva cita')
        let estado = {
            date_time: cita,
            patient: dataUser[1].id,
            doctor: cardData.id,
            appointment_reason: appointment_reason,
            appointment_type: appointment_type,
        }
        await crearCitaApi(estado, dataUser[0].access_token);
        navigation.navigate('Consultas', {screen: 'Consultas'})
    }

    const ItemDoctor = ({item}) =>{
        return(
            <ListItem bottomDivider onPress={()=> {toggleOverlay(item)}} >
            <Avatar 
                size='medium'
                rounded
                source={require('../../assets/doctor.png')}
                containerStyle={{backgroundColor: '#44C2CF'}}
            />
            <ListItem.Content>
                <ListItem.Title>{item.name} {item.first_name} {item.last_name}</ListItem.Title>
                <ListItem.Subtitle>{item.speciality}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
        );
    }

    const CardUser = (props) => (
        <View style={{alignItems: 'center'}}>
            <Avatar
                size='xlarge'
                rounded
                source={require('../../assets/doctor.png')}
                containerStyle={{ backgroundColor: '#44C2CF', marginBottom: 20}} />
            <Text style={styles.contenedor}>{props.data.postgraduate}</Text>
            <Text style={styles.contenedor}>{props.data.name} {props.data.first_name} {props.data.last_name}</Text>
            <Text>{props.data.speciality}</Text>
            <Text>Cedula profesional {props.data.professional_license}</Text>
            <Button style={{marginVertical: 10}} caption='Agendar' onPress={onShow} />
            <Button caption='Conocer más' />
        </View>
    )

    const CardFicha = (props) => (
        <View style={{alignItems: 'center', alignItems: 'stretch'}}>
            <Text style={styles.contenedor}>Confirmar Cita</Text>
            <Text style={styles.contenedor}>Fecha: {props.data}</Text>
            <Text style={styles.contenedor}>Doctor: {props.doctor.name}</Text>
            <Text style={styles.contenedor}>ID Doctor: {props.doctor.id}</Text>
            <Text style={styles.contenedor}>Paciente: {props.user[1].name}</Text>
            <Text style={styles.contenedor}>ID Paciente: {props.user[1].id}</Text>
            <Input label='Carácter' value={appointment_type} onChangeText={setAppointment_type} />
            <Input label='Razón' value={appointment_reason} onChangeText={setAppointment_reason} />
            <Button caption='Agendar cita' onPress={agendarCita} />
        </View>
    )

    return(
        <ScreenContainer>
            { loading !== false ?
                <View>
                    <Text style={styles.contenedor}>Doctores</Text>
                    <FlatList 
                        data={newLista}
                        renderItem={ItemDoctor}
                        keyExtractor={item => item.id.toString()}
                    />
                    
                        <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                            <CardUser data={cardData}/>
                        </Overlay>       
                        <DateTimePickerModal
                                isVisible={showDatePicker}
                                mode="datetime"
                                onConfirm={onAccept}
                                onCancel={onHide}
                            />
                        <Overlay isVisible={showCita} 
                            onBackdropPress={()=>{
                                setVisible(!visible)
                                setShowCita(!showCita)}
                            }
                        >
                            <CardFicha data={cita} user={dataUser} doctor={cardData} />
                        </Overlay>
                    
                </View>
                :
                <Splash message='Cargando lista'/>
            }
        </ScreenContainer>
    );
}