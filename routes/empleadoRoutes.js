import express from "express";
import { listarEmpleados, crearEmpleados,actualizarEmpleado,eliminarEmpleado} from "../controllers/empleadoController.js";
import checkAuth from '../middlewares/checkAuth.js';
import { check } from "express-validator";
import { query } from "express-validator";

const router = express.Router();

router.get("/listar",checkAuth, listarEmpleados);
router.post("/guardar", [
    check("nombre_empleado", "El nombre del empleado es obligatorio").not().isEmpty(),
    check("identidad_empleado", "La identidad del empleado es obligatoria").not().isEmpty(),
    check("telefono_empleado", "El telefono del empleado es obligatorio").not().isEmpty(),
    check("direccion_empleado", "La direccion del empleado es obligatoria").not().isEmpty(),
    check("correo_empleado", "El correo del empleado es obligatorio").not().isEmpty(),
    check("rol_id", "El rol del empleado es obligatorio").not().isEmpty(),
], checkAuth, crearEmpleados);

router.put("/actualizar", [
    query('id_empleado').isInt().withMessage("Debe de enviar un numero entero."),
    check("nombre_empleado", "El nombre del empleado es obligatorio").not().isEmpty(),
    check("identidad_empleado", "La identidad del empleado es obligatoria").not().isEmpty(),
    check("telefono_empleado", "El telefono del empleado es obligatorio").not().isEmpty(),
    check("direccion_empleado", "La direccion del empleado es obligatoria").not().isEmpty(),
    check("correo_empleado", "El correo del empleado es obligatorio").not().isEmpty(),
    check('rol_id').isInt().withMessage("Debe de enviar un numero entero."),
], checkAuth, actualizarEmpleado);

router.delete("/eliminar", [
    query('id_empleado').isInt().withMessage("Debe de enviar un numero entero."),
], checkAuth, eliminarEmpleado);



export default router;