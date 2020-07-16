import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//ACTIONS DE REDUX
import {nuevoProductoAction} from '../actions/productoActions';
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    //STATE DEL COMPONENTE
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    //UTILIZAR USEDISPATCH Y CREA UNA FUNCION ==> MANDAR A LLAMAR LAS FUNCIONES DEL ACTION
    const dispatch = useDispatch();

    //ACCEDER AL STATE DEL STORE
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //CREAR LA FUNCION PARA LLAMAR AL ACTION DE PRODUCTOACTION
    const agregarProducto = producto => dispatch(nuevoProductoAction(producto))

    //CUANDO SE HAGA SUBMIT
    const submitNuevoProducto = e => {
        e.preventDefault();
        
        //VALIDAR
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg : 'Ambos campos son Obligatorios',
                classes : 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        //VALIDAR ERRORES SI NO EXISTEN ERRORES
        dispatch(ocultarAlertaAction());

        //CREAR EL PRODUCTO
        agregarProducto({
            nombre,
            precio
        }); //==> FUNCION QUE USA DISPATCH PARA COMUNICARSE CON LAS ACTIONS Y MANDA EJECUTAR nuevoProductoAction

        //REDIRECCIONAR
        history.push('/');
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="car">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form 
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary font-wight-bold text-uppercase d-block w-100">
                                Agregar
                            </button>
                        </form>

                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Cargando...</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoProducto;