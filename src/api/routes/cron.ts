import { Router } from "express";
import cronController from "../controllers/cron/cronController";

const router = Router();

router.post('/create', cronController.createCron);
router.get('/cron/ftp/:ftpId', cronController.getCronsByFtp);
router.put('/cron/status', cronController.updateCronStatus);
router.delete('/cron/:cronId', cronController.deleteCron);

export default router;