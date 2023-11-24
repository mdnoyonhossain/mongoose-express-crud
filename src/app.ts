import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// Body Parser 
app.use(express.json());
app.use(cors());

// Applicaton Routes
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Mongoose Express Typescript CRUD Backend Server is Running.');
});

export default app;