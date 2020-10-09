import React, {useState, useEffect} from "react";
import {restoreAsyncData} from '../../utils/conexiones'

export async function useUserToken(){
    const datosUser = await restoreAsyncData();
    const token = datosUser[0].access_token
    return token;
}