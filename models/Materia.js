import { DataTypes } from "sequelize";
import db from '../config/db.js';

export const Materia = db.define("materia", {
    id_materia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre_materia: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    descripcion_materia: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    cantidad_existencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
},{
    tableName: "materia_prima",
    timestamps: false
}
);


