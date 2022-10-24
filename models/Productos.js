import { DataTypes } from "sequelize";   
import db from '../config/db.js';

 export const Productos = db.define(
    "productos",
{
    codigo_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    producto:{
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_producto:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    proveedor_id:{
        type:DataTypes.INTEGER.UNSIGNED,//Esta es mi llave foranea de mi tabla Productos para que se conecte con la tabla Proveedores
        allowNull: false,
    },
},{
    tableName: "productos",
    timestamps: false
}
);

