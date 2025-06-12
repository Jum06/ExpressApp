// server.js
import express from 'express';
import usersRouter from './routes/v1/users.js';
import productsRouter from './routes/v1/products.js';
import categoriesRouter from './routes/v1/categories.js';
import inventoryChangesRouter from './routes/v1/inventoryChanges.js';
import errorHandler from './middleware/errorHandler.js';
import { WebSocketServer } from 'ws';
import { getProducts, updateProduct } from './services/productService.js';


const app = express();
const port = process.env.BACKEND_PORT || 3000;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the Stock Manager API');
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/inventory-changes', inventoryChangesRouter);

app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


const wss = new WebSocketServer({ server });

wss.on('connection', async (ws) => {
    ws.on('error', console.error);

    // Send all products from DB on connection
    const products = await getProducts();
    ws.send(JSON.stringify(products));

    ws.on('message', async (data) => {
        // Expecting a product update as JSON
        const update = JSON.parse(data);
        const updatedProduct = await updateProduct(update.id, update);
        if (updatedProduct) {
            // Broadcast updated product to all clients
            wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify(updatedProduct));
                }
            });
        }
    });
});

export function broadcastStockUpdate(productId, stock, demand) {
    wss.clients.forEach(client => {
        if (client.readyState === 1) { // 1 = OPEN
            client.send(JSON.stringify({
                type: 'stockUpdate',
                productId,
                stock,
                demand
            }));
        }
    });
}