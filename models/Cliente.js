import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Cliente = db.define('cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_cliente: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
});

export default Cliente;
