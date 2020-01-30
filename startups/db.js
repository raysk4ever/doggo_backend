const mongoose = require("mongoose");

module.exports = () =>{
    const url = 'mongodb://localhost:27017/test';
    mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log(`connected to mongodb`))
    .catch(err=> console.log(`Mongo Error: ${err}`));
}