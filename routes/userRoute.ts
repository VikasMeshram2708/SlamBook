import express from 'express'
import getUsers from '../controllers/getUser';

const router = express.Router();

// GET : 
router.route('/users').get(getUsers);

export default router;