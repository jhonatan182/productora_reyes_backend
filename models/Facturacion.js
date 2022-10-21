import { DataTypes } from "sequelize";   
import db from '../config/db.js';

 export const Facturacion = db.define(
    "facturacion",
    {
    id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente:{
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    empleado:{
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    fecha_factura:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    impuesto:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    tipo_pago:{
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    subtotal_factura:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    total_factura:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

},{
    tableName: "facturacion",
    timestamps: false
}
);

