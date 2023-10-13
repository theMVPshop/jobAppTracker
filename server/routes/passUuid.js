import { Router } from "express";
import { logUuid } from "../controllers/passUuid.js";

const router = Router();

router.post('/post', logUuid)

export default router;