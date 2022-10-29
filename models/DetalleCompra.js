import { DataTypes } from 'sequelize';
import db from '../config/db.js';

export const DetalleCompra = db.define(
    'detalle_compra',
    {
        producto_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        id_factura_compra: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
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
        tableName: 'detalle_compra',
        timestamps: false,
    }
);
