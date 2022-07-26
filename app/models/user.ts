const { model, Schema } = require('mongoose');

//User Schema For Mongoose Database.
const userSchema = new Schema({
    username: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String},
    token:{type: String}
});

module.exports = model('User', userSchema);