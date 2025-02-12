import express from 'express';

const router = express.Router();

const pokemons = [
    {
        id: 1,
        name: 'Bisasam',
        type: [ 'plant' ],
        moves: [ 'tackle', 'vine whip' ]
    },
    {
        id: 25,
        name: 'Pikachu',
        type: [ 'electric' ],
        moves: [ 'tackle', 'thunder' ]
    }
];
router.use(express.json()); // body parser

router.get('/', (request, response) => {
    console.log(`request from ${request.ip}`);

    // #swagger.summary = "Some description"
    response
        .status(200)
        .send(pokemons);
});

router.post('/:id', (request, response) => {
    console.log(`request from ${request.ip}`);
});

router.put('/', (request, response) => {

    if(request.query.q !== undefined) {
        console.log(`request from ${request.ip}`);
        response
            .status(200)
            .send(pokemons.filter(p => p.id == request.query.id));
    }

    response
        .status(405)
        .send('Not Allowed!');
});

router.get('/:id', (request, response) => {
    const pokemon = pokemons.find(pokemon => pokemon.id === request.params.id);

    if (pokemon === null) {
        response
            .status(404)
            .send(`id ${request.params.id} not found!`);
    } else {
        response
            .status(200)
            .send(pokemon);
    }
});

export default router;