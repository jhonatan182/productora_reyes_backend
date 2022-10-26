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
        type: DataTypes.STRING(45),
        allowNull: false,
    },
  
    telefono_empleado: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    correo_empleado: {
        type: DataTypes.STRING(90),
        allowNull: false,
        unique:true,
    },
    direccion_empleado: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    rol_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
        {
        tableName: "empleados",
        timestamps: false,
    }  

);

export default Empleado;