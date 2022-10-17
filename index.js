import express from 'express';
import dotenv from 'dotenv';
import { conectarDB } from './config/db.js';

//? rutas
import routerClientes from './routes/clientesRoutes.js';
import routerInventarioProductos from './routes/inventarioProductosRouter.js';


//? manejo de variables de entorno
dotenv.config();

//? servidor de express
const app = express();
app.use(express.json());

console.log(process.env.DB_NAME);

//? conectar a db
conectarDB();

//? asocinado rutas
app.use('/api/clientes', routerClientes);
app.use('/api/inventario-productos', routerInventarioProductos);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
