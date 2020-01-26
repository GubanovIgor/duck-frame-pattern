import * as express from 'express';
import { check, login, logout, signup } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',  login);
router.get('/logout',  logout);
router.post('/check',   check);

export = router;
