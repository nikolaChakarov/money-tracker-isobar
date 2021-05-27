const express = require('express');
const router = require('../router');

const expressConfig = (app) => {

    app.use(express.json());

    app.use(router);

}

module.exports = expressConfig;