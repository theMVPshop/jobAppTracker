import { Router } from "express";
import { logUuid } from "../controllers/passUuid.js";
import { getUserId } from "../controllers/passUuid.js";

const router = Router();

router.post('/post', logUuid);
router.get('/get', getUserId);

export default router;