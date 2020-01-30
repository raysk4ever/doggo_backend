const mongoose = require("mongoose");

module.exports = () =>{
    const url = 'mongodb+srv://ravi:' + process.env.dbPass +' @cluster0-7pwcx.mongodb.net/test?retryWrites=true&w=majority';
    mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log(`connected to mongodb`))
    .catch(err=> console.log(`Mongo Error: ${err}`));
}