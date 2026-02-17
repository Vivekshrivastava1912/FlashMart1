import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryController } from "../controllers/category.controller.js";
import upload from "../middleware/multer.js"; // 1. Ye Import Karein

const categoryRouter = Router()

// 2. Yahan 'upload.single("image")' add karein 'auth' ke baad
categoryRouter.post("/add-category", auth, upload.single("image"), AddCategoryController)

export default categoryRouter