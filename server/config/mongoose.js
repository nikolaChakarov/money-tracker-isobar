const mongoose = require('mongoose');
const config = require('../config/config');

const mongooseConfig = () => {

    return mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('db connected');
        })
        .catch(err => console.error(err))

}

module.exports = mongooseConfig;