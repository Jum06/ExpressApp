import express from 'express';
import swaggerUi from "swagger-ui-express";
import pokemons from "./routes/v1/item.js";
import * as swaggerFile from "./swagger-output.json" with{ type: "json" };

const app = express();
const port = 3000;

app.use(express.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerUi.setup()));
app.use("/pokemons", pokemons);

app.get('/', (request, response) => {
    console.log(`request from ${request.ip}`);
    response.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})