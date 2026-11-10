import express from 'express';
import path from 'path';
import itemRoutes from './routes/item.routes';
import { errorHandler, notFound } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/items', itemRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
