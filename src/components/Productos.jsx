import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//ACTIONS DE REDUX
import {obtenerProductosAction} from '../actions/productoActions';

import Producto from '../components/Producto';

const Productos = () => {

    //UTILIZAR USEDISPATCH Y CREA UNA FUNCION ==> MANDAR A LLAMAR LAS FUNCIONES DEL ACTION
    const dispatch = useDispatch();

    useEffect(() => {
        //CONSULTAR API
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
        // eslint-disable-next-line
    }, []);

    //OBTENER EL STATE DE PRODUCTOS
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading)

    return (  
        <>
            <h2 className="text-center mt-5">
                Listado de Productos
            </h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            {cargando ? <p className="font-weight-bold text-center mt-4">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {productos.length === 0 ? 'No Data' : (
                       productos.map(producto => (
                           <Producto
                               key={producto.id}
                               producto={producto}
                           />
                       ))
                   )} 
                </tbody>
            </table>
        </>
    );
}
 
export default Productos;