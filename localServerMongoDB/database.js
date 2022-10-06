const mongoose = require('mongoose');

const URI = 'mongodb://localhost/users-list';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error('Database is Off'))

module.exports = mongoose;