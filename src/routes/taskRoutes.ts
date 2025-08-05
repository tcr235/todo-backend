import Router from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getTasks } from '../controllers/taskController';

const taskRoutes = Router();

taskRoutes.get('/', authenticateToken, getTasks);

taskRoutes.post('/', authenticateToken, (req, res) => {
  res.send('Create a new task');
});

taskRoutes.put('/:id', authenticateToken, (req, res) => {
  res.send('Edit a task');
});

taskRoutes.delete('/:id', authenticateToken, (req, res) => {
  res.send('Delete a task');
});

export default taskRoutes;
export { taskRoutes };