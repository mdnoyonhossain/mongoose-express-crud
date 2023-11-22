import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 5000;

// Body Parser 
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Mongoose Express CRUD Server is Running.');
});

app.listen(port, () => {
    console.log(`Mongoose Express CRUD on Port: ${port}`);
})