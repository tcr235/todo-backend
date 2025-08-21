import { Request, Response } from 'express';
import { getUserTasks, createTaskService, updateTaskService, deleteTaskService } from '../services/taskService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const getTasks = async (req: AuthenticatedRequest, res: Response) => {
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

const createTask = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
  }

  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const newTask = await createTaskService(userId, title, description);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno ao criar tarefa' });
  }
};

const updateTask = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (title === undefined && description === undefined) {
    return res.status(400).json({ error: 'Pelo menos um dos campos título ou descrição deve ser fornecido' });
  }

  try {
    const updatedTask = await updateTaskService(id, title, description);
    return res.json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar tarefa' });
  }
};

const deleteTask = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await deleteTaskService(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno ao deletar tarefa' });
  }
};
export const taskController = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
export default taskController;
