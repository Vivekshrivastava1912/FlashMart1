import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    addProductController,
    deleteProductController,
    getProductController,
    updateProductController
} from "../controllers/product.controller.js";

const productRouter = Router();

// Yahan '/create' ki jagah '/add-product' kar diya hai
productRouter.post('/add-product', auth, addProductController);
productRouter.get('/get', getProductController);
productRouter.put('/update', auth, updateProductController);
productRouter.delete('/delete', auth, deleteProductController);

export default productRouter;