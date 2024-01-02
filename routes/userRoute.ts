import express from 'express'
import { newUser } from '../controllers/createUser';
import { getALlUsers } from '../controllers/getAllUsers';

const router = express.Router();

// POST : 
router.route('/create-user').post(newUser);

// GET
router.route('/get-all-users').get(getALlUsers);


export default router;