import React, {useEffect, useState} from "react";
import {View, Text} from 'react-native';
import { Button } from '../../src/components';
import {styles} from '../../utils/styles';
import {listaCitas, restoreAsyncData} from '../../utils/conexiones'
import {FlatList} from 'react-native-gesture-handler'
import {ListItem, Avatar, Overlay} from 'react-native-elements'
import {Splash} from '../../BaseScreens';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
export const Consultas = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [newDataList, setNewDataList] = useState([]);
  const [info, setInfo] = useState(false);
  const [step, nextStep] = useState(false);
  const [pendent, setPendent] = useState({
    id: '',
    basic: {
      fecha: '',
      name: '',
      speciality: '',
    },
    advanced:{
      razon: '',
    },
    status: '',
  });
  const [overPendent, setOverPendent] = useState(false);

  useEffect(()=>{
    async function restoreSimpleData(){
      const response = await restoreAsyncData();
      if(response!==null){
        setData(response);
        const citas = await listaCitas(response[0].access_token);
        if(citas!==null){
          setDataList(citas);
          console.log('Citas recibidas: ' + JSON.stringify(citas[0]))
          nextStep(true)
        } else {
          alert('fallo obtener lista')
        }
      } else {
        alert('fallo obtener datos')
      }
    }
    restoreSimpleData();
  }, [])

  useEffect(()=>{
    function crearLista(){
      dataList.forEach((x)=>{
        if(x!==null){
          setNewDataList(arreglo => [...arreglo, {
            id: x.id,
            status : x.accept,
            basic : {
              fecha : x.date_time,
              name: x.doctor.user.name + ' ' + x.doctor.user.first_name,
              speciality: x.doctor.speciality
            },
            advanced : {
              razon: x.appointment_reason,
            },
          }
          ])
        }
      })
      setInfo(true);
    }
    
    crearLista();
    
  }, [step])

  useEffect(()=>{
    const handleChange = e => {
      setPendent(e);
    };
    handleChange(pendent)
  }, [overPendent])

  const crearFicha = (item) =>{
    setPendent(item);
    toggleOverlayPendent();
  }

  const toggleOverlayPendent= () =>{
    setOverPendent(!overPendent)
  };

  const videoLlamada= () =>{
    toggleOverlayPendent();
    navigation.push('VideoCall');
  }

  const AccionCita = (props) =>{
    return(
      <View>
        <Text>{props.data.id}</Text>
        <Text>{props.data.basic.name}</Text>
        <Button caption='Agendar cita' onPress={videoLlamada} />
      </View>
    )
  }
  const ListaCita = ({item}) =>{
    if(item.status===null){
      return (
        <ListItem onPress={()=> crearFicha(item)}>
          <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'}}>
            <Avatar 
              size="small"
              rounded
              icon={{name: 'calendar', color: 'white', type: 'font-awesome'}}
              overlayContainerStyle={{backgroundColor: '#44C2CF'}}
            />
            <View>
              <Text style={styles.contenedor}>Día: {item.basic.fecha}</Text>
              <Text style={styles.contenedor}>{item.basic.name}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <Avatar 
              size="small"
              rounded
              icon={{name: 'clock-o', color: 'white', type: 'font-awesome'}}
              overlayContainerStyle={{backgroundColor: '#006cff'}}
            />
            <Text>PENDIENTE</Text>
          </View>
          </View>
        </ListItem>
      );
    } else if(item.status===true){
      return (
        <ListItem onPress={()=> crearFicha(item)}>
          <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'}}>
            <Avatar 
              size="small"
              rounded
              icon={{name: 'calendar', color: 'white', type: 'font-awesome'}}
              overlayContainerStyle={{backgroundColor: '#44C2CF'}}
            />
            <View>
              <Text style={styles.contenedor}>Día: {item.basic.fecha}</Text>
              <Text style={styles.contenedor}>{item.basic.name}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <Avatar 
              size="small"
              rounded
              icon={{name: 'clock-o', color: 'white', type: 'font-awesome'}}
              overlayContainerStyle={{backgroundColor: '#18cc04'}}
            />
            <Text>ACEPTADA</Text>
          </View>
          </View>
        </ListItem>
      );
    
    } else if(item.status===false){
      return (
        <ListItem onPress={()=> crearFicha()}>
          <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'}}>
            <Avatar 
              size="small"
              rounded
              icon={{name: 'calendar', color: 'white', type: 'font-awesome'}}
              overlayContainerStyle={{backgroundColor: '#44C2CF'}}
            />
            <View>
              <Text style={styles.contenedor}>Día: {item.basic.fecha}</Text>
              <Text style={styles.contenedor}>{item.basic.name}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <Avatar 
              size="small"
              rounded
              icon={{name: 'clock-o', color: 'white', type: 'font-awesome'}}
              overlayContainerStyle={{backgroundColor: '#e30000'}}
            />
            <Text>CANCELADA</Text>
          </View>
          </View>
        </ListItem>
      );
    }
  }
  return(
    <ScreenContainer>
      { info ?
      <View>
        <Text style={styles.contenedor}>Consultas</Text>
        <FlatList 
          data={newDataList}
          renderItem={ListaCita}
          keyExtractor={item => item.id}
        />
        <Overlay isVisible={overPendent} onBackdropPress={()=>toggleOverlayPendent()}>
          <AccionCita data={pendent} />
        </Overlay>
      </View>
      :
        <Splash message='Cargando lista de citas'/>
      }
      
    </ScreenContainer>
  )
};