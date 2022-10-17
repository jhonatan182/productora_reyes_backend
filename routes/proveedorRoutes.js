import express from "express";
import { listarProveedores, crearProveedores, actualizarProveedor,eliminarProveedor} from "../controllers/proveedorController.js";
import { check } from "express-validator";

import { query } from "express-validator";



const router = express.Router();

router.get("/listar", listarProveedores);

router.post("/guardar", [
    check("nombre_proveedor", "El nombre del proveedor es obligatorio").not().isEmpty(),
    check("identidad_proveedor", "La identidad del proveedor es obligatoria").not().isEmpty(),
    check("telefono_proveedor", "El telefono del proveedor es obligatorio").not().isEmpty(),
    check("direccion_proveedor", "La direccion del proveedor es obligatoria").not().isEmpty(),
    check("correo_proveedor", "El correo del proveedor es obligatorio").not().isEmpty(),
], crearProveedores);


router.put("/actualizar", [
    query('id_proveedor').isInt().withMessage("Debe de enviar un numero entero."),
    check("nombre_proveedor", "El nombre del proveedor es obligatorio").not().isEmpty(),
    check("identidad_proveedor", "La identidad del proveedor es obligatoria").not().isEmpty(),
    check("telefono_proveedor", "El telefono del proveedor es obligatorio").not().isEmpty(),
    check("direccion_proveedor", "La direccion del proveedor es obligatoria").not().isEmpty(),
    check("correo_proveedor", "El correo del proveedor es obligatorio").not().isEmpty(),
], actualizarProveedor);

router.delete("/eliminar", [
    query('id_proveedor').isInt().withMessage("Debe de enviar un numero entero."),
], eliminarProveedor);

export default router;



