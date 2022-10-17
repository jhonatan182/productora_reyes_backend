
import {InventarioProductos } from '../models/inventarioProductos.js';

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