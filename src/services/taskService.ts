import { prisma } from '../database/prisma';

export const getUserTasks = async (userId: string) => {
  
  const tasks = await prisma.task.findMany({
    where: { userId: Number(userId) },
  });

  return tasks;
};

export const createTaskService = async (userId: string, title: string, description: string) => {
  const task = await prisma.task.create({
    data: {
      userId: Number(userId),
      title,
      description,
    },
  });

  return task;
};

export const updateTaskService = async (taskId: string, title: string, description: string) => {
  const data: { title?: string; description?: string } = {};
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;

  const task = await prisma.task.update({
    where: { id: Number(taskId) },
    data,
  });

  return task;
};

export const deleteTaskService = async (taskId: string) => {
  const task = await prisma.task.delete({
    where: { id: Number(taskId) },
  });
  
  return task;
};
