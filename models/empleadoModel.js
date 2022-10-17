import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Empleado = db.define('empleados', {

    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
    },
    nombre_empleado: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    apellido_empleado: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    identidad_empleado: {
        type: DataTypes.STRING(13),
        allowNull: false,
    },
    edad_empleado: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    telefono_empleado: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    correo_empleado: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true,
    },
    direccion_empleado: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
        {
        tableName: "empleados",
        timestamps: false,
    }

    

);

export default Empleado;