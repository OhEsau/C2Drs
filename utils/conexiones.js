import AsyncStorage from '@react-native-community/async-storage'

export async function saveToken (dataApi){
    try {
        await AsyncStorage.setItem('datosUsuario', JSON.stringify(dataApi));
    } catch (error){
        console.log(error.message);
    }
}

export async function saveCedula (dataApi){
    try {
        await AsyncStorage.setItem('cedula', JSON.stringify(dataApi));
    } catch (error){
        console.log(error.message);
    }
}

export async function registrarPaciente (data) {
    await fetch('https://conn2drs.herokuapp.com/patients/create/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    gender: data.gender,
                    phone: data.phone
                })
            })
            .then((response)=> response.json())
            .then(async (responseData) => {
                console.log(
                    "POST Response", "Response Body -> "+ JSON.stringify(responseData)
                )
                if(responseData.error!=null || responseData.Error!=null){
                    responseData.error ? alert('error: ' + JSON.stringify(responseData.error_description)) : null
                    responseData.Error ? alert('error: ' + JSON.stringify(responseData.Error)) : null
                    return false;
                }
                else{
                    console.log('Registro Exitoso');                    
                }
            })
            .catch(error => {
                console.log(error.message);
                return false
            });
            return true;
}

export async function iniciarSesion(data){
    await fetch('https://conn2drs.herokuapp.com/authentication/token/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        })
        })
        .then((response)=> response.json())
        .then(async (responseData) => {
            console.log(
                "POST Response", "Response Body -> "+ JSON.stringify(responseData)
            )
            if(responseData.error!=null || responseData.Error!=null){
                responseData.error ? alert('error: ' + JSON.stringify(responseData.error_description)) : null
                responseData.Error ? alert('error: ' + JSON.stringify(responseData.Error)) : null
                return null;
            }
            else{
                await saveToken(responseData);
            }
        })
        .catch(error => {
            console.log(error.message);
            return null;
        });
        return true;
}

export async function verificarCedula(data){
    await fetch(`http://conn2drs.herokuapp.com/profile/CheckCedula/?cedula=${data}`)
        .then((response)=> response.json())
        .then(async (responseData) => {
            console.log(
                "POST Response", "Response Body -> "+ JSON.stringify(responseData)
            )
            if(responseData === {}){
                return null;
            }
            else{
                await saveCedula(responseData);
            }
        })
        .catch(error => {
            console.log(error.message);
            return null;
        });
        return true;
}

export async function registrarDoctor (dataSimple, dataProfesional) {
    await fetch('http://conn2drs.herokuapp.com/profile/create/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: dataSimple.email,
                    password: dataSimple.password,
                    client_type: 1,
                    name: dataSimple.name,
                    first_name: dataSimple.first_name,
                    last_name: dataSimple.last_name,
                    gender: dataSimple.gender,
                    phone: dataSimple.phone,
                    curp: dataProfesional.curp,
                    cfdi: dataProfesional.cfdi,
                    rfc: dataProfesional.rfc,
                    fiscal_address: dataProfesional.domicilio,
                    university: dataProfesional.university,
                    professional_license: dataProfesional.cedula,
                    speciality: dataProfesional.speciality,
                    postgraduate: dataProfesional.postgraduate,
                    address: dataProfesional.domicilioParticular,
                    contact_phone: dataProfesional.contactPhone,
                    reference: dataProfesional.reference,
                    name_account_owner: dataProfesional.name_account_owner,
                    bank: dataProfesional.bank,
                    account: dataProfesional.account,
                    clabe: dataProfesional.clabe
                })
            })
            .then((response)=> response.json())
            .then(async (responseData) => {
                console.log(
                    "POST Response", "Response Body -> "+ JSON.stringify(responseData)
                )
                if(responseData.error!=null || responseData.Error!=null){
                    responseData.error ? alert('error: ' + JSON.stringify(responseData.error_description)) : null
                    responseData.Error ? alert('error: ' + JSON.stringify(responseData.Error)) : null
                    return false;
                }
                else{
                    console.log('Registro Exitoso');                    
                }
            })
            .catch(error => {
                console.log(error.message);
                return false
            });
            return true;
}

export async function restoreAsyncData() {
    try{
      const datos = await JSON.parse( await AsyncStorage.getItem('datosUsuario'));
      return datos;
    } catch(e){
      console.log('error en funcion datosUsuario')
      alert(e)
    }
}

export async function listaDoctores(token) {
    const lista = await fetch('https://conn2drs.herokuapp.com/profile/listall/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    .then(response => response.json())
    .then(async (responseJson) => {
        return responseJson;
    })
    .catch(error => {
        console.log(error);
        return null
    })

    return lista
}

export async function restoreAsyncLista() {
    try{
      const datos = await JSON.parse( await AsyncStorage.getItem('listaDoctores'));
      return datos;
    } catch(e){
      console.log('error en funcion datosUsuario')
      alert(e)
    }
}

export async function crearCitaApi(data, token) {
    await fetch('https://conn2drs.herokuapp.com/citas/create/',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
        .then(responseData => {
            console.log(
                    "POST Response", "Response Body -> "+ JSON.stringify(responseData)
                )
            alert('Cita registrada!')
    })
    .catch((error) =>{
        console.log(error)
        alert('cita fallida')
    })
}

export async function listaCitas(token) {
    const datos = await fetch('https://conn2drs.herokuapp.com/citas/list/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    .then(response => response.json())
    .then(async (responseJson) => {
        return(responseJson);
    })
    .catch(error => {
        console.log(error);
        return null
    })

    return datos;
}