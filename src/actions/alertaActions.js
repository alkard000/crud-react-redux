//IMPORTAR TYPES
import {
    MOSTRAR_ALERTA, 
    OCULTAR_ALERTA
} from '../types';

//MOSTRAR LA ALERTA
export function mostrarAlerta(alerta){
    return (dispatch) => {
        dispatch(crearAlerta(alerta));
    }
}

const crearAlerta = alerta => ({
    type : MOSTRAR_ALERTA,
    payload : alerta
})

//OCULTAR ALERT
export function ocultarAlertaAction(){
    return (dispatch) => {
        dispatch(ocultarAlerta())
    }
}

const ocultarAlerta = () => ({
    type : OCULTAR_ALERTA
})