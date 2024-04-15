import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(cors()); // adcionando o middleware cors
app.use(express.json());
app.use(router);

app.listen(3333, () => console.log('Server is running'));
