import { DataTypes } from 'sequelize';
import db from '../config/db.js';

export const Detalle_Facturacion = db.define(
    'detalle_facturacion',
    {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        id_factura: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_unitario: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        tableName: 'detalle_facturacion',
        timestamps: false,
    }
);
