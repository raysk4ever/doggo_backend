const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" }
});

userSchema.methods.genToken = () => jwt.sign({_id: this._id}, "MY_PRIVATE_KEY");

const validateUser = user => {
    const Schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, Schema);
}

const validateUserLogin = user => {
    const Schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, Schema);
} 

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validateUser = validateUser;
exports.validateUserLogin = validateUserLogin;