import { DataTypes } from 'sequelize';
import db from '../config/db.js';

export const Compra = db.define(
    'compra',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        proveedor_id: {
            type: DataTypes.INTEGER.UNSIGNED, //llave foranea
            allowNull: false,
        },
        numero_factura: {
            type: DataTypes.STRING(45),
            allowNull: true,
            unique: true,
        },
        fecha_compra: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        empleado_id: {
            type: DataTypes.INTEGER.UNSIGNED, //llave foranea
            allowNull: false,
        },
    },
    {
        tableName: 'compras',
        timestamps: false,
    }
);
