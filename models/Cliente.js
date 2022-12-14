import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Cliente = db.define(
    'cliente',
    {
        id_cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_cliente: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        apellido_cliente: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        identidad_cliente: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        telefono_cliente: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        correo_cliente: {
            type: DataTypes.STRING(90),
            allowNull: true,
        },
        direccion_cliente: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
    },
    {
        tableName: 'cliente',
        timestamps: false,
    }
);

export default Cliente;
