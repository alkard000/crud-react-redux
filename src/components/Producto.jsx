import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    //CONFIMAR SI DESEA ELIMINARLO
    const confEliminarProducto = id => {
        //PREGUNTAR AL USURIO
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un producto eliminado no se recupera!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.value) {
                //PASARLO AL ACTION
                dispatch(borrarProductoAction(id));
            }
        });
    }

    //FUNCION QUE REDIRIGE DE FORMA PROGRAMADA
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto))
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2"
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confEliminarProducto(id)}
                >
                    Elminar
                </button>
            </td>
        </tr>
    );
}

export default Producto;