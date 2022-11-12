import express from "express";
import { listarEmpleados, crearEmpleados,actualizarEmpleado,eliminarEmpleado} from "../controllers/empleadoController.js";
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get("/listar",checkAuth, listarEmpleados);
router.post("/guardar", checkAuth, crearEmpleados);

router.put("/actualizar/:id", checkAuth, actualizarEmpleado);

router.delete("/eliminar/:id", [
], checkAuth, eliminarEmpleado);



export default router;