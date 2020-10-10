import React from "react";
import {listaDoctores} from '../../utils/conexiones'

export async function useListaDoctores(token){
    const lista = await listaDoctores(token);
    return lista;
}