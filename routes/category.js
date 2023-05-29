import express from "express";
import {
    addCategory,
    deleteCategory,
    getCategory,
    getCategorys,
    updateCategory,
} from "../controllers/category_ctrl.js";

const router = express.Router();

router.get("/", getCategorys);
router.get("/:id", getCategory);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

export default router;
