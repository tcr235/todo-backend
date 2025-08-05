import Router from 'express';
import { register } from '../controllers/authController';

const authRoutes = Router();

authRoutes.post('/register', register);

export default authRoutes;
export { authRoutes };