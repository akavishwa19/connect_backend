import { generalUpload, imageUpload } from "../Controllers/upload.controller.js";
import { Router } from "express";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.route("/image").post(upload.single("file"), imageUpload);
router.route("/general").post(upload.single("file"), generalUpload);

export default router;