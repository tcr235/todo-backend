import express, { Request, Response } from 'express'
import authRoutes from './routes/authRoutes';

const app = express()
const port = 3000

app.use(express.json());
app.use("/auth", authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
