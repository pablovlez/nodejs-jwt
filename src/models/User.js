const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

userSchema.methods.validatePassword = function (password){
    return bcryptjs.compare(password, this.password);
};

userSchema.methods.encryptPassword = async password => {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
};



module.exports = model('User', userSchema);
