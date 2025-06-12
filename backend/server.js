// server.js
import express from 'express';
import usersRouter from './routes/v1/users.js';
import productsRouter from './routes/v1/products.js';
import categoriesRouter from './routes/v1/categories.js';
import inventoryChangesRouter from './routes/v1/inventoryChanges.js';
import errorHandler from './middleware/errorHandler.js';
import { WebSocketServer, WebSocket } from 'ws';


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

const wss = new WebSocketServer({ port: 3001 });

// server.js (add after wss definition)
export function broadcastProductUpdate(product) {
    console.log('Broadcast method called!');
    const message = JSON.stringify({
        type: 'PRODUCT_UPDATE',
        data: {
            id: product.id,
            stock: product.stock,
            demand: product.demand
        }
    });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

wss.on('connection', function connection(ws) {
    ws.send('Welcome to the WebSocket server!');

    ws.on('message', function incoming(message) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Echo: ${message}`);
            }
        });
    });
});

console.log('WebSocket server running on ws://localhost:3001');