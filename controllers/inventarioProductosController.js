
import {InventarioProductos} from '../models/inventarioProductos.js'

/*
export const inicio = (req, res) => {C
    res.send('Iniciando modulo Inventario Productos');
  
};
*/

export const listarInventarioProducto = async (req, res) => {
    const lista = await InventarioProductos.findAll();
    if(lista.length==0){
        res.send("No existen datos en el inventario Producto");
    }else{
        res.json(lista);
    }
};

export const guardarInventarioProducto = async (req,res) =>{
    const {codigo_producto, producto, descripcion, cantidad_inicial, precio_producto, entradas, salidas, total} = req.body;
    if (!codigo_producto || !producto || !descripcion || !cantidad_inicial || !precio_producto ||!entradas || !salidas || !total) {
        res.send("Debe enviar todos los datos completos !!!");
    }
    else {
            await InventarioProductos.create({
                codigo_producto: codigo_producto,
                producto: producto,
                descripcion: descripcion,
                cantidad_inicial: cantidad_inicial,
                precio_producto: precio_producto,
                entradas: entradas,
                salidas: salidas,
                total:total
            })
                .then((data) => {
                    console.log(data);
                    res.send("Registro Inventario Producto Almacenado Exitosamente");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardar datos");
                });
    }
};

export const modificarInventarioProducto = async (req, res) => {
        
    const { codigo_producto } = req.query;
    const {producto, descripcion, cantidad_inicial, precio_producto, entradas, salidas, total} = req.body;
    if (!codigo_producto || !producto || !descripcion || !cantidad_inicial || !precio_producto ||!entradas || !salidas || !total) {
    res.send("Debe enviar los datos completos");
    }
    else {
        var buscarInventarioProducto = await InventarioProductos.findOne({
            where: {
                codigo_producto: codigo_producto
            }
        })

        if (!buscarInventarioProducto) {
            res.send("El codigo producto no existe");
        }
        else {
            //por aqui me quede con esta onda al venirme del trabajo
            buscarInventarioProducto.producto = producto;
            buscarInventarioProducto.descripcion = descripcion;
            buscarInventarioProducto.cantidad_inicial = cantidad_inicial;
            buscarInventarioProducto.precio_producto = precio_producto;
            buscarInventarioProducto.entradas = entradas;
            buscarInventarioProducto.salidas = salidas;
            buscarInventarioProducto.total = total;
            await buscarInventarioProducto.save()
                .then((data) => {
                    console.log(data);
                    res.send("Registro actualizado Exitosamente !!!");
                })

                .catch((error) => {
                    console.log(error);
                    res.send("Error al actualizar los datos o el id de tipo no existe :(");
                })
        }
    }
};