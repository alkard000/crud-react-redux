//IMPORTAR TYPES
import { 
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_ERROR,
    PRODUCTO_ELIMINAR_EXITO,

    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

//CADA REDUCER POSEE SU PROPI STATE
const initialState = {
    productos : [],
    error : null,
    loading : false,
    productoEliminar : null,
    productoEditar : null
}

export default function(state = initialState, action){
    switch(action.type){
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading : action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading : false,
                productos : [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading : action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading : false,
                error : null,
                productos : action.payload
            }
        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar : action.payload
            }
        case PRODUCTO_ELIMINAR_EXITO:
            return {
                ...state,
                productos : state.productos.filter(producto => producto.id !== state.productoEliminar),
                productoEliminar : null
            }
        case PRODUCTO_ELIMINAR_ERROR:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productos : [],
                productoEditar : action.payload
            }
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                productoEditar : null,
                productos : state.productos.map(
                    producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto
                )
            }
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                error : action.payload
            }
        default:
            return state;
    }
}