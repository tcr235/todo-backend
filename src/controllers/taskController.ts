import { Request, Response } from 'express';
import { getUserTasks } from '../services/taskService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const tasks = await getUserTasks(userId);
    return res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar tarefas' });
  }
};
