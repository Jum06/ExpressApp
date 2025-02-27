import express from 'express';
import productsRouter from './routes/v1/products.js';

const app = express();
const port = 3000;

app.use(express.json());

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Stock Manager API');
});

// Use the products router
app.use('/api/v1/products', productsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});