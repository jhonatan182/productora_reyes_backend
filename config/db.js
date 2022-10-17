import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const db = new Sequelize('productora_reyes','root','Ca1d3r0n',
    {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: false,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

export const conectarDB = async () => {
    try {
        await db.authenticate();
        console.log('Base de datos conectada correctamente');
    } catch (error) {
        console.log('No se pudo conectar a la base de datos');
        process.exit(1);
    }
};

export default db;
