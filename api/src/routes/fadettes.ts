import { Response, Request} from 'express';
import { FadettesController } from '../controller/fadettes-controller';
import multer from 'multer';
const express = require('express');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/fadettes', (req: Request, res: Response) => FadettesController.createFadette(req, res));
router.post('/fadettes/csv', upload.single('csv'), (req: Request, res: Response) => FadettesController.createFadetteByCsv(req, res));
router.get('/fadettes/:id', (req: Request, res: Response) => FadettesController.getFadetteById(req, res));
router.get('/fadettes', (req: Request, res: Response) => FadettesController.getAllFadettes(req, res));
router.put('/fadettes/:id', (req: Request, res: Response) => FadettesController.updateFadette(req, res));
router.delete('/fadettes/:id', (req: Request, res: Response) => FadettesController.deleteFadette(req, res));

module.exports = router;