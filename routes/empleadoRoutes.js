import express from "express";
import { listarEmpleados, crearEmpleados,actualizarEmpleado,eliminarEmpleado} from "../controllers/empleadoController.js";
import { check } from "express-validator";
import { query } from "express-validator";

const router = express.Router();

router.get("/listar", listarEmpleados);
router.post("/guardar", [
    check("nombre_empleado", "El nombre del empleado es obligatorio").not().isEmpty(),
    check("identidad_empleado", "La identidad del empleado es obligatoria").not().isEmpty(),
    check("telefono_empleado", "El telefono del empleado es obligatorio").not().isEmpty(),
    check("direccion_empleado", "La direccion del empleado es obligatoria").not().isEmpty(),
    check("correo_empleado", "El correo del empleado es obligatorio").not().isEmpty(),
], crearEmpleados);

router.put("/actualizar", [
    query('id_empleado').isInt().withMessage("Debe de enviar un numero entero."),
    check("nombre_empleado", "El nombre del empleado es obligatorio").not().isEmpty(),
    check("identidad_empleado", "La identidad del empleado es obligatoria").not().isEmpty(),
    check("telefono_empleado", "El telefono del empleado es obligatorio").not().isEmpty(),
    check("direccion_empleado", "La direccion del empleado es obligatoria").not().isEmpty(),
    check("correo_empleado", "El correo del empleado es obligatorio").not().isEmpty(),
], actualizarEmpleado);

router.delete("/eliminar", [
    query('id_empleado').isInt().withMessage("Debe de enviar un numero entero."),
], eliminarEmpleado);



export default router;