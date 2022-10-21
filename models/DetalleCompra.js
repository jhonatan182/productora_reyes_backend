import { DataTypes } from "sequelize";
import db from '../config/db.js';

export const Detalle = db.define("detalle_compra", {
    producto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_factura_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,    
    },
   cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },   
},{
    tableName: "detalle_compra",
    timestamps: false
}
);