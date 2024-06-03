import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

import { router } from './routes';

const app = express();
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 } // Limite de 50MB para arquivos
});

app.use(cors()); // Adicionando o middleware cors
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(upload.single('image')); // Middleware para upload de arquivos

app.use(router);

app.listen(3333, () => console.log('Server is running'));