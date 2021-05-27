const express = require('express');

const expressConfig = require('./config/express');
const mongooseConfig = require('./config/mongoose');

const config = require('./config/config');

const app = express();
expressConfig(app);

const mongoose = mongooseConfig();

// I want first to be connected to db, and after to run the server.
// wasted one hour to understand that the connection with VPN interrupts the connection with Atlas MongoDB !!! oki doki dr.Jones
mongoose
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`App is listening at ${config.PORT}`);
        });
    })
    .catch(err => console.error(err))
