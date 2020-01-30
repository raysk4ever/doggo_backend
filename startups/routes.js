const express = require("express");
const User = require("../routes/user");
const cors = require('cors');

module.exports = app => {

    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(cors());

    app.use("/api/v1/user", User);

}