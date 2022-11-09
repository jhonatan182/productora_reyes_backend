import { Router } from "express";
import { 
    MostSoldProduct,
    ProductsStock,
    SalesByCustomer,
    SalesByEmployee
} from '../controllers/reportesController.js';

const router = Router();

router.get('/mostSoldProducts', MostSoldProduct);
router.get('/productsStock', ProductsStock);
router.get('/salesEmployee', SalesByCustomer);
router.get('/salesCustomer', SalesByEmployee);

export default router;