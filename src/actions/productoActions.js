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
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

//IMPORTAR EL CLIENTE DE AXIOS
import clienteAxios from '../config/axios';

import Swal from 'sweetalert2';

//CREAR NUEVO PRODUCTOS========================
export function nuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //INSERTAR EN LA API
            await clienteAxios.post('/productos', producto);

            //ACTUALIZAR EL STATE SI TODO SALE BIEN
            dispatch(agregarProductoExito(producto));

            Swal.fire(
                'Correcto',
                'Producto Agregado',
                'success'
            )
        } catch (error) {

            console.log(error);
            //ERROR ==> CAMBIAR STATE
            dispatch(agregarProductoError(true));

            Swal.fire({
                icon : 'error',
                title : 'Hubo un error',
                text : 'Error al crear el producto'
            })
        }
    }
}

const agregarProducto = () => ({
    type : AGREGAR_PRODUCTO,
    payload : true
});

//EXITO AL GUARDAR LE PRODUCTO
const agregarProductoExito = producto => ({
    type : AGREGAR_PRODUCTO_EXITO,
    payload : producto
});

//ERROR AL GUARDAR EL PRODUCTO
const agregarProductoError = estado => ({
    type : AGREGAR_PRODUCTO_ERROR,
    payload : estado
});

//MOSTRAR PRODUCTOS========================
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargarProductosExitosa(respuesta.data));

        } catch (error) {
            dispatch(descargarProductosError())
        }
    }
}

const descargarProductos = () => ({
    type : COMENZAR_DESCARGA_PRODUCTOS,
    payload : true
});

const descargarProductosExitosa = productos => ({
    type : DESCARGA_PRODUCTOS_EXITO,
    payload : productos
})

const descargarProductosError = () => ({
    type : DESCARGA_PRODUCTOS_ERROR,
    payload : true
})

//ELIMINAR PRODUCTOS========================
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(borrarProductoExito());
            //SI SE ELIMINA, MSTRAR ALERTA
            Swal.fire(
                'Eliminado!',
                'Tu producto ha sido eliminado',
                'success'
            );
        } catch (error) {
            dispatch(borrarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type : OBTENER_PRODUCTO_ELIMINAR,
    payload : id
})

const borrarProductoExito = () => ({
    type : PRODUCTO_ELIMINAR_EXITO
})

const borrarProductoError = () => ({
    type : PRODUCTO_ELIMINAR_ERROR,
    payload : true
})

//EDITAR PRODUCTOS========================
//==> COLOCAR PRODUCTO EN EDICION
export function obtenerProductoEditar(producto){
    return async (dispatch) => {
        dispatch(obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto => ({
    type : OBTENER_PRODUCTO_EDITAR,
    payload : producto
})

//EDITAR UN REGISTRO DE LA API Y EL STATE
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));

        try {
           await clienteAxios.put(`/productos/${producto.id}`, producto) ;
           dispatch(editarProductoExito(producto));
        } catch (error) {
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type : COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = producto => ({
    type :  PRODUCTO_EDITADO_EXITO,
    payload : producto
});

const editarProductoError = () => ({
    type : PRODUCTO_EDITADO_ERROR,
    payload : true
})

