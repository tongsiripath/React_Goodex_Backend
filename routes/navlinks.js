import express from "express";
import {
  addNavLinks,
  deleteNavLinks,
  getNavLinks,
  getNavLinkss,
  //updateNavLinks,
} from "../controllers/navlinks_ctrl.js";

const router = express.Router();
router.get("/", getNavLinkss);
router.get("/:id", getNavLinks);
router.post("/", addNavLinks);
router.delete("/:id", deleteNavLinks);
// router.put("/:id", updateNavLinks);

export default router;
