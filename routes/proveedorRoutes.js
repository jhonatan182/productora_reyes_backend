import express from "express";
import { listarProveedores, crearProveedores, actualizarProveedor,eliminarProveedor,obtenerProveedor} from "../controllers/proveedorController.js";
import checkAuth from '../middlewares/checkAuth.js';



const router = express.Router();

router.get("/",checkAuth, listarProveedores);

router.get("/:id",checkAuth, obtenerProveedor);

router.post("/guardar", checkAuth, crearProveedores);

router.put("/actualizar/:id", checkAuth, actualizarProveedor);

router.delete("/eliminar/:id", checkAuth, eliminarProveedor);

export default router;



