import express from 'express';
import dotenv from 'dotenv';
import { conectarDB } from './config/db.js';



//? rutas
import routerClientes from './routes/clientesRoutes.js';
import routerFacturacion from './routes/facturacionRoutes.js';
import routerInventarioProductos from './routes/inventarioProductosRouter.js';
import routerMateria from './routes/materiaRoutes.js';
import routerEmpleados from './routes/empleadoRoutes.js';


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
app.use('/api/facturacion', routerFacturacion);
app.use('/api/inventario-productos', routerInventarioProductos);
app.use('/api/materias', routerMateria);
app.use('/api/empleados', routerEmpleados);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
