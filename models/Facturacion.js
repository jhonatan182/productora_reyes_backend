import { DataTypes } from "sequelize";   
import db from '../config/db.js';

 export const Facturacion = db.define(
    "facturacion",
    {
    id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    empleado_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numero_factura:{
        type: DataTypes.STRING(10),
        allowNull: false,

    },
    fecha_factura:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    impuesto:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    tipo_pago:{
        type: DataTypes.ENUM('contado', 'credito'),
        allowNull: false,
    },
},
{
    tableName: "facturacion",
    timestamps: false
}
);

