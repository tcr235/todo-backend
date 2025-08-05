import { prisma } from "../database/prisma";
import { comparePasswords, hashPassword } from "../services/hashingService";
import { InvalidInputError, DuplicatedEmailError, InternalError } from "../errors/CustomErrors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

export const loginUser = async (email: string, password: string) => {
  if (!email || !password){
    throw new InvalidInputError();
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(await comparePasswords(password, user.password))) {
      throw new InvalidInputError();
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { algorithm: 'HS256', expiresIn: '1h' });
    return token;

  } catch (error) {
    throw new InternalError();
  }
}
