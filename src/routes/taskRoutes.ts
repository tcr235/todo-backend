import Router from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { taskController } from '../controllers/taskController';

const taskRoutes = Router();

taskRoutes.get('/', authenticateToken, taskController.getTasks);

taskRoutes.post('/', authenticateToken, taskController.createTask);

taskRoutes.put('/:id', authenticateToken, taskController.updateTask);

taskRoutes.delete('/:id', authenticateToken, taskController.deleteTask);

export default taskRoutes;
export { taskRoutes };