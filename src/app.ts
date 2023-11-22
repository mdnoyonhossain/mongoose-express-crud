import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Body Parser 
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Mongoose Express CRUD Server is Running.');
});

export default app;