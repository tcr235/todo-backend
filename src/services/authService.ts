import { prisma } from "../database/prisma";
import { hashPassword } from "../services/hashingService";
import { InvalidInputError, DuplicatedEmailError, InternalError } from "../errors/CustomErrors";

export const registerUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new InvalidInputError();
  }

  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { id: user.id, email: user.email };

  } catch (error: any) {
    if (error.code === "P2002") {
      throw new DuplicatedEmailError();
    }
    throw new InternalError();
  }
};
