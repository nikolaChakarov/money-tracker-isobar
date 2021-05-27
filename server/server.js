const express = require('express');

const expressConfig = require('./config/express');
const mongooseConfig = require('./config/mongoose');

const config = require('./config/config');

const app = express();
expressConfig(app);

mongooseConfig();

app.listen(config.PORT, () => {
    console.log(`App is listening at ${config.PORT}`);
});