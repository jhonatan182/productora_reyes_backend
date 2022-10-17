import { DataTypes } from "sequelize";   
import db from '../config/db.js';

 export const InventarioProductos = db.define(
    "inventarioproductos",
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
    cantidad_inicial:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_producto:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    entradas:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    salidas:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total:{
        type:DataTypes.FLOAT,
        allowNull: false,
    }
},{
    tableName: "InventarioProductos",
    timestamps: false
}
);

