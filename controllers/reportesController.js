import db from "../config/db.js";
import { QueryTypes } from "sequelize";

export const MostSoldProduct = async (req, res) => {
    try {
        const { month=1 } = req.query;
        const result = await db.query(`select a.id_producto, b.producto, sum(a.cantidad) as cantidad_ventas from detalle_facturacion a
        inner join productos b on a.id_producto = b.codigo_producto
        inner join facturacion c on a.id_factura = c.id_factura
        where month(c.fecha_factura) = ${month}
        group by id_producto order by cantidad_ventas DESC limit 5;`, 
        {type:QueryTypes.SELECT});

        res.status(200).json(result);
    } catch (error) {
        console.log("Error ReportesController: ", error);
        res.status(400).json("Error al extraer los datos.");
    }
}

export const ProductsStock = async (req, res) => {
    try {
        
        const result = await db.query(`select producto, stock from productos order by stock asc;`, 
        { type:QueryTypes.SELECT});
        res.status(200).json(result);
    } catch (error) {
        console.log("Error ReportesController: ", error);
        res.status(400).json("Error al extraer los datos.");
    }
}

export const SalesByEmployee = async (req, res) => {
    try {
        const { month=1 } = req.query;

        const result = await db.query(`select concat(nombre_empleado, ' ', apellido_empleado) as nombre_completo, count(a.id_factura) cantidad_ventas from facturacion a 
        inner join empleados b on a.empleado_id = b.id_empleado 
        where month(a.fecha_factura) = ${month}
        group by nombre_completo order by cantidad_ventas desc limit 5;`, 
        { type:QueryTypes.SELECT})
        res.status(200).json(result);
    } catch (error) {
        console.log("Error ReportesController: ", error);
        res.status(400).json("Error al extraer los datos.");
    }
}

export const SalesByCustomer = async (req, res) => {
    try {
        const { month=1 } = req.query;

        const result = await db.query(`select concat(nombre_cliente, ' ', apellido_cliente) as nombre_completo, count(a.id_factura) cantidad_compras from facturacion a 
         inner join cliente b on a.cliente_id = b.id_cliente 
         where month(a.fecha_factura) = ${month}
         group by nombre_completo order by cantidad_compras desc limit 5;`, 
        { type:QueryTypes.SELECT})
        res.status(200).json(result);
    } catch (error) {
        console.log("Error ReportesController: ", error);
        res.status(400).json("Error al extraer los datos.");
    }
}