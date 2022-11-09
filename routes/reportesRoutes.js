import { Router } from 'express';
import {
    MostSoldProduct,
    ProductsStock,
    SalesByCustomer,
    SalesByEmployee,
} from '../controllers/reportesController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = Router();

router.get('/mostSoldProducts', checkAuth, MostSoldProduct);
router.get('/productsStock', checkAuth, ProductsStock);
router.get('/salesEmployee', checkAuth, SalesByEmployee);
router.get('/salesCustomer', checkAuth, SalesByCustomer);

export default router;
