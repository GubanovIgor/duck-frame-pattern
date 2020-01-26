import * as express from 'express';
import { getIndex, postIndex } from '../controllers/viewsController';

const router = express.Router();
router.get('/', getIndex);
router.post('/q', postIndex);

export = router;
