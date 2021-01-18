import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR, COMENZAR_DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_ERROR, DESCARGA_PRODUCTOS_EXITO, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_ELIMINADO_ERROR, PRODUCTO_ELIMINADO_EXITO, OBTENER_PRODUCTO_EDITAR, PRODUCTO_EDITADO_ERROR, PRODUCTO_EDITADO_EXITO, COMENZAR_EDICION_PRODUCTO } from '../types';
import clienteAxios from '../config/axios'
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

//Crear nuevos productos

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarPoducto() );

        try {
            //INSERTAR EN LA API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien, actualizar el state
            dispatch( agregarPoductoExito(producto) );
            //Alerta
            swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch( agregarPoductoError(true) );

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta nuevamente'
            })
        }
        
    }
}

const agregarPoducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//Si el producto se guarda en la base de datos

const agregarPoductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Si hubo un error

const agregarPoductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() )
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) )
            
        } catch (error) {
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Selecciona y elimina el producto
export function eliminarProductoAction(id) {
    return async(dispatch) => {
        dispatch( obtenerProductoEliminar(id) )

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            //Si se elimina correctamente, mostrar alerta
            Swal.fire(
                '¡Eliminado correctamente!',
                'El producto ha sido eliminado con éxito',
                'success'
            )
        } catch (error) {
            dispatch( eliminarProductoError() );
        }
        
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})


//Colocar producto en edicion

export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//Edita un registro en la API
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto() )
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto) )
        } catch (error) {
            dispatch( editarProductoError() )
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})