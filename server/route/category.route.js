import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryController, getCategoryController } from "../controllers/category.controller.js";
import upload from "../middleware/multer.js"; 

const categoryRouter = Router()


categoryRouter.post("/add-category", auth, upload.single("image"), AddCategoryController)

categoryRouter.get("/get",getCategoryController)



export default categoryRouter