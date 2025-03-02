// server.js
import express from 'express';
import usersRouter from './routes/v1/users.js';
import productsRouter from './routes/v1/products.js';
import categoriesRouter from './routes/v1/categories.js';
import inventoryChangesRouter from './routes/v1/inventoryChanges.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Stock Manager API');
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/inventory-changes', inventoryChangesRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});