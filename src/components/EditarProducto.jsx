import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editarProductoAction} from '../actions/productoActions';
import {useHistory} from 'react-router-dom';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //NUEVO STATE DE PRODUCTO
    const [producto, setProducto] = useState({
        nombre : '',
        precio : 0
    })

    //PRODUCTO EDITAR
    const productoEditar = useSelector(state => state.productos.productoEditar);
    const error = useSelector(state => state.productos.error);

    //USEEFFECT PARA EL ESTADO DEL PRODUCTO
    useEffect(() => {
        setProducto(productoEditar)
    }, [productoEditar]);

    //LEER DATOS DEL FORMULARIO
    const onChangeForm = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre, precio} = productoEditar;

    const submitEditarProducto = e => {
        e.preventDefault();
        
        dispatch(editarProductoAction(producto));

        history.push('/');
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="car">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form 
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    defaultValue={nombre}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    defaultValue={precio}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary font-wight-bold text-uppercase d-block w-100">
                                Guardar Cambios
                            </button>
                        </form>
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Cargando...</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarProducto;