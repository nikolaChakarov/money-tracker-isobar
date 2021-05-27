const express = require('express');
const router = require('../router');

const cors = require('cors');

const expressConfig = (app) => {

    const corsOptions = {
        origin: 'http://localhost:3000'
    }

    app.use(cors(corsOptions));

    app.use(express.json());

    app.use(router);

}

module.exports = expressConfig;