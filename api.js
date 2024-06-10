const express = require('express');
const cors = require('cors');
const { Port } = require('./config');
const api = express();

const port = Port();


api.use(express.json());
api.use(cors());

/** API Landing Page */
api.get(`/`, (request, response) => {
    const greetings = `heloo world!`;
    response.send(`<p>${greetings} this is the landing page of API</p>`);
});

api.listen(port, () => {console.log(`api is running in port ${port}`)});