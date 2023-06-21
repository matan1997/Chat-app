const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true}
});

module.exports = mongoose.model('Message', schema);

//module.exports = mongoose.model('User', productSchema);
