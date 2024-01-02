import express from 'express'
import { newUser } from '../controllers/createUser';

const router = express.Router();

// GET : 
router.route('/create-user').post(newUser);

export default router;