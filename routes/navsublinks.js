import express from "express";
import {
  addNavSubLinks,
  deleteNavSubLinks,
  getNavSubLinks,
  getNavSubLinkss,
  //updateNavLinks,
} from "../controllers/navsublinks_ctrl.js";

const router = express.Router();
router.get("/", getNavSubLinkss);
router.get("/:id", getNavSubLinks);
router.post("/", addNavSubLinks);
router.delete("/:id", deleteNavSubLinks);
// router.put("/:id", updateNavLinks);

export default router;