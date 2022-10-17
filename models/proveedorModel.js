import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Proveedor = db.define('proveedor', {
    id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_proveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    descripcion_proveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    identidad_proveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    telefono_proveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    direccion_proveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    correo_proveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
},
    {
    tableName: "proveedor",
    timestamps: false,
}
);
export default Proveedor;




