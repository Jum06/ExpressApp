import express from 'express';

const router = express.Router();

const products = [
    {
        id: 1,
        name: 'log',
        price: 10,
        stored: 100,
        needed: 10
    },
    {
        id: 2,
        name: 'alsoLogButMoreExpensive',
        price: 1343,
        stored: 10,
        needed: 1000
    }
];
router.use(express.json()); // body parser

router.get('/', (request, response) => {
    console.log(`request from ${request.ip}`);

    // #swagger.summary = "Some description"
    response
        .status(200)
        .send(products);
});

router.post('/:id', (request, response) => {
    console.log(`request from ${request.ip}`);
});

router.put('/', (request, response) => {

    if(request.query.q !== undefined) {
        console.log(`request from ${request.ip}`);
        response
            .status(200)
            .send(products.filter(i => i.id === request.query.id));
    }

    response
        .status(405)
        .send('Not Allowed!');
});

router.get('/:id', (request, response) => {
    const product = products.find(product => product.id === request.params.id);

    if (product === null) {
        response
            .status(404)
            .send(`id ${request.params.id} not found!`);
    } else {
        response
            .status(200)
            .send(product);
    }
});

export default router;