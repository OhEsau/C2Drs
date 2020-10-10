import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button } from '../../src/components';
import { Card, Input } from 'react-native-elements';
import Dialog from 'react-native-dialog';

import { validateAll } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer'

import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../utils/styles';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from "../../utils/authContext";

import {verificarCedula} from '../../utils/conexiones'

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const DoctorData = ({route}) => {
  const { signUpDoctor } = useContext(AuthContext);
  const [SignUpErrors, setSignUpErrors] = useState({});
  
  const [tarjetaProfesional, setTarjetaProfesional] = useState(true);
  const [curp, setCurp] = useState('aaaa000000xxxxxx00');
  const [rfc, setRFC] =useState('aaaa000000xxx');
  const [cfdi, setCFDI] = useState('qwerasd0000');
  const [domicilio, setDomicilio] = useState('Conocido 1');
  const [domicilioParticular, setDomicilioParticular] = useState('Conocido Particular 1');
  const [contactPhone, setContactPhone] = useState('1234567890');
  const [reference, setReference] = useState('Cerca');

  const [tarjetaBanco, setTarjetaBanco] = useState(false);
  const [name_account_owner, setAccountOwner] = useState(route.params.name);
  const [bank, setBank] = useState('BANCO GIDONEZ');
  const [account, setAccount] = useState('1234567890');
  const [clabe, setClabe] = useState('1234567890');

  const [tarjetaCedula, setTarjetaCedula] = useState(false);
  const [cedula, setCedula] = useState('');
  const [university, setUniversity] = useState('');
  const [postgraduate, setPostgraudate] = useState('Oncólogia');
  const [speciality, setSpeciality] = useState('');
  const [nameCedula, setNameCedula] = useState('');
  const [firstNameCedula, setFirstNameCedula] = useState('');
  const [lastNameCedula, setLastNameCedula] = useState('');

  const [activado, setActivado] = useState(true);
  const [mostrar, setMostrar]  =useState(false);



  const [finalData, setData] = useState({
    email: route.params.email,
    password: route.params.password,
    name: route.params.name,
    first_name: route.params.first_name,
    last_name: route.params.last_name,
    gender: route.params.gender,
    birthday: route.params.birthday,
    phone: route.params.phone,
  });

  const [datosDoctor, setDatosDoctor] = useState({
    curp: '',
    rfc: '',
    cfdi: '',
    domicilio: '',
    domicilioParticular: '',
    contactPhone: '',
    reference: '',
    name_account_owner: '',
    bank: '',
    account: '',
    clabe: '',
    cedula: '',
    university: '',
    speciality: '',
    postgraduate: '',
  })

  useEffect(() => {
    setDatosDoctor(prevState => ({
      ...prevState,
      curp: curp,
      rfc: rfc,
      cfdi: cfdi,
      domicilio: domicilio,
      domicilioParticular: domicilioParticular,
      contactPhone: contactPhone,
      reference: reference,
      bank: bank,
      account: account,
      clabe: clabe,
      cedula: cedula,
      postgraduate: postgraduate,
      university: university,
      speciality: speciality,
      name_account_owner: name_account_owner,
      firstNameCedula: firstNameCedula,
      lastNameCedula: lastNameCedula,
    }))
  }, [ curp, rfc, cfdi, domicilio, domicilioParticular, contactPhone, reference, name_account_owner, bank, account, clabe, cedula, university, postgraduate, speciality, firstNameCedula, lastNameCedula, nameCedula])

  function activarBoton(){
    setActivado(!activado)
  }

  useEffect(()=>{
    const handleChange = e => {
      setNameCedula(e);
    };
    handleChange(nameCedula)
  }, [nameCedula])

  useEffect(()=>{
    const cambioTitulo = e => {
      setPostgraudate(e);
    };
    cambioTitulo(postgraduate)
  }, [postgraduate])

  function level1 () {
    setTarjetaProfesional(true)
    setTarjetaBanco(false)
    setTarjetaCedula(false)
    setMostrar(false)
  }

  function level2 () {
    setTarjetaProfesional(false)
    setTarjetaBanco(true)
    setTarjetaCedula(false)
    setMostrar(false)
  }

  function level3 () {
    setTarjetaProfesional(false)
    setTarjetaBanco(false)
    setTarjetaCedula(true)
    setMostrar(false)
  }

  function level4 (){
    setTarjetaProfesional(false)
    setTarjetaBanco(false)
    setTarjetaCedula(false)
    setMostrar(true)
  }

  function validarInfo(){
    const rules = {
        curp: 'required',
        rfc: 'required',
        cfdi: 'required',
        domicilio: 'required',
        domicilioParticular: 'required',
        contactPhone: 'required',
        reference: 'required',
        name_account_owner: 'required',
        bank: 'required',
        account: 'required',
        clabe: 'required',
        cedula: 'required',
        university: 'required',
        speciality: 'required',
        postgraduate: 'required',
    }

    const messages = {
      required: field => `se necesita ${field}`,
      alpha: 'Símbolos no permitidos',
      max : 'Máximo excedido',
    };

    const sanitizationRules = {
        curp: 'trim',
        rfc: 'trim',
        cfdi: 'trim',
        domicilio: 'trim',
        domicilioParticular: 'trim',
        contactPhone: 'trim',
        reference: 'trim',
        name_account_owner: 'trim',
        bank: 'trim',
        account: 'trim',
        clabe: 'trim',
        cedula: 'trim',
        university: 'trim',
        speciality: 'trim',
        postgraduate: 'trim',
    }

    const dataClean = sanitize(datosDoctor, sanitizationRules)
    setCurp(dataClean.curp);
    setRFC(dataClean.rfc);
    setCFDI(dataClean.cfdi);
    setDomicilio(dataClean.domicilio);
    setDomicilioParticular(dataClean.domicilioParticular);
    setContactPhone(dataClean.contactPhone);
    setReference(dataClean.reference);
    setAccountOwner(dataClean.name_account_owner);
    setBank(dataClean.bank);
    setAccount(dataClean.account);
    setClabe(dataClean.clabe);
    setCedula(dataClean.cedula);
    setUniversity(dataClean.university);
    setPostgraudate(dataClean.postgraduate);
    setSpeciality(dataClean.speciality);

    validateAll(dataClean, rules, messages)
      .then(() => {
        level4();
      })
      .catch(err => {
        console.log(datosDoctor)
        const formatError = {};
        err.forEach(err => {
          formatError[err.field] = err.message;
        });
      setSignUpErrors(formatError);
      })
  }
  
  const IconoAyuda = (props) => {
    return(
      <TouchableOpacity>
        <Icon
          name='question'
          color='gray'
          size={20}
        />
      </TouchableOpacity>
    );
  }

  const comprobarCedula = async (cedula) => {
    const verificacion = await verificarCedula(cedula)
    if (verificacion){
      let datosCedula = await AsyncStorage.getItem('cedula');
      datosCedula = JSON.parse(datosCedula);
      setUniversity(datosCedula.universidad);
      setSpeciality(datosCedula.titulo);
      setNameCedula(datosCedula.nombre);
      setFirstNameCedula(datosCedula.paterno);
      setLastNameCedula(datosCedula.materno);
      activarBoton();
    }
    else {
      alert('error al leer cedula')
    }
  }

  return (
    <ScreenContainer>
      {
        tarjetaProfesional ?
        <ScrollView>
        <Card>
          <Card.Title style={styles.contenedor}>Ingrese sus datos profesionales por favor</Card.Title>
          <Text style={styles.contenedor}>*Estos datos son opcionales y puede registrarlos después</Text>
          <Card.Divider />
            <Input
              label="*C.U.R.P"
              placeholder="*C.U.R.P"
              value={curp}
              onChangeText={setCurp}
              textContentType={'none'}
              autoCapitalize={'characters'}
              keyboardType={'default'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.name : null}
              rightIcon={
                <IconoAyuda ayuda={'curp'}/>
              }
            />
            <Input
              label="*R.F.C"
              placeholder="*R.F.C"
              value={rfc}
              onChangeText={setRFC}
              textContentType={'none'}
              autoCapitalize={'characters'}
              keyboardType={'default'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.name : null}
              rightIcon={
                <IconoAyuda ayuda={'rfc'}/>
              }
            />
            <Input
              label="*Folio Fiscal"
              placeholder="*Folio Fiscal"
              value={cfdi}
              onChangeText={setCFDI}
              textContentType={'none'}
              autoCapitalize={'characters'}
              keyboardType={'default'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.name : null}
              rightIcon={
                <IconoAyuda ayuda={'folio'}/>
              }
            />
            <Input
              label="*Domicilio Fiscal"
              placeholder="*Domicilio Fiscal"
              value={domicilio}
              onChangeText={setDomicilio}
              textContentType={'none'}
              autoCapitalize={'words'}
              keyboardType={'default'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.name : null}
              rightIcon={ <IconoAyuda ayuda={'Domicilio_Fiscal'}/> }
            />
            <Input
              label="*Domicilio Particular"
              placeholder="*Domicilio Particular"
              value={domicilioParticular}
              onChangeText={setDomicilioParticular}
              textContentType={'none'}
              autoCapitalize={'words'}
              keyboardType={'default'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.name : null}
              rightIcon={ <IconoAyuda ayuda={'Domicilio_Particular'}/> }
            />
            <Input
              label="*Teléfono de Contacto"
              placeholder="*Teléfono de Contacto"
              value={contactPhone}
              onChangeText={setContactPhone}
              textContentType={'none'}
              autoCapitalize={'characters'}
              keyboardType={'number-pad'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.name : null}
              rightIcon={ <IconoAyuda ayuda={'Contacto'}/> }
            />
            <Input
              label="*Referencia"
              placeholder="*Referencia"
              value={reference}
              onChangeText={setReference}
              textContentType={'none'}
              autoCapitalize={'sentences'}
              keyboardType={'default'}
              errorStyle={{ color: 'red' }}
              errorMessage={SignUpErrors ? SignUpErrors.name : null}
              rightIcon={ <IconoAyuda ayuda={'referencia'}/> }
            />
            <Button 
              onPress={level2} 
              caption="Siguiente"
            />
        </Card>
        </ScrollView>
          :
          null
      }
      {
        tarjetaBanco ?
          <View>
            <ScrollView>
              <Card>
                <Card.Title style={styles.contenedor}>Datos Bancarios</Card.Title>
                <Text style={styles.contenedor}>*Estos datos son opcionales y puede registrarlos después</Text>
                <Card.Divider />
                <Input
                  label="*Titular de la cuenta"
                  placeholder="*Titular de la cuenta"
                  value={name_account_owner}
                  onChangeText={setAccountOwner}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                  keyboardType={'default'}
                  errorStyle={{ color: 'red' }}
                  errorMessage={SignUpErrors ? SignUpErrors.name : null}
                  rightIcon={ <IconoAyuda ayuda={'Titular'}/> }
                />
                <Input
                  label="*Nombre del Banco"
                  placeholder="*Nombre del Banco"
                  value={bank}
                  onChangeText={setBank}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                  keyboardType={'default'}
                  errorStyle={{ color: 'red' }}
                  errorMessage={SignUpErrors ? SignUpErrors.name : null}
                  rightIcon={ <IconoAyuda ayuda={'Banco'}/> }
                />
                <Input
                  label="*Número de Cuenta"
                  placeholder="*Número de Cuenta"
                  value={account}
                  onChangeText={setAccount}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                  keyboardType={'default'}
                  errorStyle={{ color: 'red' }}
                  errorMessage={SignUpErrors ? SignUpErrors.name : null}
                  rightIcon={ <IconoAyuda ayuda={'Cuenta'}/> }
                />
                <Input
                  label="*Número CLABE"
                  placeholder="*Número CLABE"
                  value={clabe}
                  onChangeText={setClabe}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                  keyboardType={'default'}
                  errorStyle={{ color: 'red' }}
                  errorMessage={SignUpErrors ? SignUpErrors.name : null}
                  rightIcon={ <IconoAyuda ayuda={'Clabe'}/> }
                />
                <Button 
                  onPress={level3} 
                  caption="Siguiente"
                />
              </Card>
            </ScrollView>
          </View>
          :
          null
      }
      {
        tarjetaCedula ?
          <View>
            <ScrollView>
              <Card>
                <Card.Title>Registro de Cédula Profesional</Card.Title>
                <Card.Divider />
                <Input
                  label="Cédula Profesional Federal"
                  placeholder="Cédula Profesional Federal"
                  value={cedula}
                  onChangeText={setCedula}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                  keyboardType={'numeric'}
                  errorStyle={{ color: 'red' }}
                  errorMessage={SignUpErrors ? SignUpErrors.name : null}
                  rightIcon={ <IconoAyuda ayuda={'Cedula'}/> }
                />
                <Text style={styles.contenedor} >Título: </Text>
                <Picker 
                  selectedValue={postgraduate}
                  onValueChange={setPostgraudate}
                >
                  <Picker.Item label="Médicina General" value="Medicina General" />
                  <Picker.Item label="Nutriólogia" value="Nutriologia" />
                  <Picker.Item label="Psicólogía" value="Psicologia" />
                  <Picker.Item label="Oncología" value="Oncologia" />
                  <Picker.Item label="Cirujía Plástica" value="Cirujia Plastica"/>
                </Picker>
                <Button 
                  onPress={()=>comprobarCedula(cedula)} 
                  caption="Verificar Cedula"
                />
                <Input
                  placeholder="Universidad"
                  disabled={true}
                  value={university}
                  onChangeText={setUniversity}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                />
                <Picker 
                  label="Título"
                  selectedValue={speciality}
                  onValueChange={setSpeciality}
                >
                  <Picker.Item label="Pediatría" value="Pediatria" />
                  <Picker.Item label="Médico General" value="Medico" />
                  <Picker.Item label="Oncología" value="Oncologia" />
                  <Picker.Item label="Psicología" value="psicologia" />
                  <Picker.Item label="Terapia de Lenguaje" value="Lenguaje" />
                  <Picker.Item label="Psicología SAP" value="psicologiaSAP" />
                  <Picker.Item label="Cirujano Plástico" value="cirugia plastica" />
                  <Picker.Item label="Nutrición" value="Nutricion" />
                  <Picker.Item label="Endocronolgía" value="Endocrionologia" />
                  <Picker.Item label="Cardiología" value="cardiologia" />
                  <Picker.Item label="Neumonología" value="Neumonologia" />
                  <Picker.Item label="Otorrinología" value="Otorrinologia" />
                </Picker>
                <Input
                  label="Especialidad"
                  placeholder="Especialidad"
                  disabled={true}
                  value={speciality}
                  onChangeText={setSpeciality}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                />
                <Input
                  label="Nombre"
                  placeholder="Nombre"
                  disabled={true}
                  value={nameCedula}
                  onChangeText={setNameCedula}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                />
                <Input
                  label="Apellido Paterno"
                  placeholder="Apellido Paterno"
                  disabled={true}
                  value={firstNameCedula}
                  onChangeText={setFirstNameCedula}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                />
                <Input
                  label="Apellido Materno"
                  placeholder="Apellido Materno"
                  disabled={true}
                  value={lastNameCedula}
                  onChangeText={setLastNameCedula}
                  textContentType={'none'}
                  autoCapitalize={'characters'}
                />
                <Button
                  disabled={activado} 
                  onPress={()=>validarInfo()} 
                  caption="Siguiente"
                  style={{marginVertical: 10}}
                />
                <Button
                  onPress={level1} 
                  caption="Atrás"
                />

              </Card>
            </ScrollView>
          </View>
          :
          null
      }
      {
        mostrar ?
        <View>
          <ScrollView>
            <Dialog.Container visible={mostrar}>
              <Dialog.Title>Confirmar Información</Dialog.Title>
              <Dialog.Description>
                ¿Estás de acuerdo con esta Información?{'\n'}
                Curp: {curp} {'\n'}
                cfdi: {cfdi} {'\n'}
                Domicilio Fiscal: {domicilio} {'\n'}
                Domicilio Particular: {domicilioParticular} {'\n'}
                Teléfono de contact: {contactPhone} {'\n'}
                Referencia: {reference} {'\n'}
                Titular de la Cuenta: {name_account_owner} {'\n'}
                Banco: {bank} {'\n'}
                Número de cuenta: {account} {'\n'}
                Clabe: {clabe} {'\n'}
                Cedula: {cedula} {'\n'}
                Universidad: {university} {'\n'}
                Especialidad: {speciality} {'\n'}
                Título: {postgraduate} {'\n'}
              </Dialog.Description>
              <Dialog.Button label="Cancelar" onPress={level1} />
              <Dialog.Button label="Continuar" onPress={() => signUpDoctor(finalData, datosDoctor)} />
            </Dialog.Container>
          </ScrollView>
        </View>
        :
        null
      }
    </ScreenContainer>
  );
}