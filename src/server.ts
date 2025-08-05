import express, { Request, Response } from 'express'
import { prisma } from './database/prisma';
import { hashPassword } from './services/hashingService';

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!')
})

app.post('/auth/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email } });

    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
