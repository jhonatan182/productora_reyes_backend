
import {Productos} from '../models/Productos.js'

export const listarProductos = async (req, res) => {
    const lista = await Productos.findAll();
    if(lista.length==0){
        res.send("No existen Productos :( ");
    }else{
        res.json(lista);
    }
};

export const guardarProductos = async (req,res) =>{
    const {producto, descripcion, stock, precio_producto, proveedor_id} = req.body;
    if (!producto || !descripcion || !stock || !precio_producto ||!proveedor_id) {
        res.send("Debe enviar todos los datos completos !!!");
    }
    else {
            await Productos.create({
                //codigo_producto: codigo_producto,
                producto: producto,
                descripcion: descripcion,
                stock: stock,
                precio_producto: precio_producto,
                proveedor_id:proveedor_id
            })
                .then((data) => {
                    console.log(data);
                    res.send("Producto Almacenado Exitosamente :)");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardar datos");
                });
    }
};


export const modificarProductos = async (req, res) => {
    const { id } = req.params;

    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }
    try {
        const producto = await Productos.findByPk(id);

        if (!producto) {
            const error = new Error('producto no encontrado');
            return res.status(404).json({ msg: error.message });
        }
        //? actualizando los datos
        const productoActualizado = await producto.update({
            //codigo_producto: req['body']['codigo_producto'],
            producto: req['body']['producto'],
            descripcion: req['body']['descripcion'],
            stock: req['body']['stock'],
            precio_producto: req['body']['precio_producto'],
            proveedor_id: req['body']['proveedor_id'],
        });

        return res.status(200).json(productoActualizado);
    } catch (error) {
        console.log(error);
    }
};

export const obtenerUnProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Productos.findByPk(id);

        if (!producto) {
            const error = new Error('Producto no encontrado :(');
            return res.status(404).json({ msg: error.message });
        }

        return res.status(200).json(producto);
    } catch (error) {
        console.log(error);
    }
};


export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Productos.findByPk(id);

        if (!producto) {
            const error = new Error('Producto no encontrado :(');
            return res.status(404).json({ msg: error.message });
        }
        
        const ProductoEliminado = await producto.destroy();

        return res.status(200).json(ProductoEliminado);
    } catch (error) {
        console.log(error);
    }
};