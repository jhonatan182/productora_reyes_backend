import { DataTypes } from "sequelize";
import db from '../config/db.js';

export const Detalle = db.define("detalle_compra", {
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_factura_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,    
    },
   cantidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },   
},{
    tableName: "detalle_compra",
    timestamps: false
}
);