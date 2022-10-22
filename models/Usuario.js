import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const Usuario = db.define(
    'usuarios',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        empleado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: async (usuario) => {
                usuario.password = await bcrypt.hash(usuario.password, 10);
            },
        },
    },
    {
        tableName: 'usuarios',
        timestamps: false,
    }
);

Usuario.prototype.compararPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};

export default Usuario;
