import { prisma } from '../database/prisma';

export const getUserTasks = async (userId: string) => {
  
  const tasks = await prisma.task.findMany({
    where: { userId: Number(userId) },
  });
  
  return tasks;
};
