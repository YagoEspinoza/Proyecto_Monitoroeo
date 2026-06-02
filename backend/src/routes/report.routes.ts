import { Router } from 'express';
import * as reportController from '../controllers/report.controller';

const router = Router();

router.get('/', reportController.listReports);
router.get('/:id/pdf', reportController.downloadReportPdf);
router.get('/:id', reportController.getReport);
router.post('/', reportController.createReport);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

export default router;
