import express from 'express';
import dotenv from 'dotenv';
import { conectarDB } from './config/db.js';

//? rutas
import routerClientes from './routes/clientesRoutes.js';
import routerFacturacion from './routes/facturacionRoutes.js';
import routerProductos from './routes/ProductosRoutes.js';
import routerMateria from './routes/materiaRoutes.js';
import routerEmpleados from './routes/empleadoRoutes.js';
import routerProveedores from './routes/proveedorRoutes.js';
import routerDetalleFacturacion from './routes/detalleFacturacionRoutes.js';
import routerUsuarios from './routes/usuarioRoutes.js';
import routerCompra from './routes/compraRoutes.js';
import routerDetalle from './routes/detalleRoutes.js';

//? manejo de variables de entorno
dotenv.config();

//? servidor de express
const app = express();
app.use(express.json());

//? conectar a db
conectarDB();

//? asocinado rutas
app.use('/api/clientes', routerClientes);
app.use('/api/facturacion', routerFacturacion);
app.use('/api/detallefacturacion', routerDetalleFacturacion);
app.use('/api/productos', routerProductos);
app.use('/api/materias', routerMateria);
app.use('/api/empleados', routerEmpleados);
app.use('/api/proveedores', routerProveedores);
app.use('/api/usuarios', routerUsuarios);
app.use('/api/compras', routerCompra);
app.use('/api/detalles', routerDetalle);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
