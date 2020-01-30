const router = require("express").Router();
const { User, validateUser, validateUserLogin } = require("../models/user");
const brcypt = require('bcrypt');

router.post("/signup", async (req, res)=>{
    try{
        const { error } = validateUser(req.body);
        if(error) return res.send({status: false, errorMessage: `Error: ${error.details[0].message}`})
        
        let user = await User.findOne({email: req.body.email})
        if(user) return res.send({status: false, errorMessage: `Error: User email not available`})
        
        user = new User(req.body);
        user.password = await brcypt.hash(user.password, 8);
        
        const token = user.genToken();
        
        await user.save();
        res.header({"x-auth-token": token}).send({status: true, result: `user created successfully`});
    }catch(ex){
        return res.send({status: false, errorMessage: `Something went wrong, Error: ${ex}`})
    }
});

router.post("/login", async (req, res)=>{
    try{
        const { error } = validateUserLogin(req.body);
        if(error) return res.send({status: false, errorMessage: `Error: ${error.details[0].message}`})
        
        let user = await User.findOne({email: req.body.email})
        if(!user) return res.status(404).send({status: false, errorMessage: `Error: Email or Password incorrect`})
        
        const isSame = await brcypt.compare(req.body.password, user.password);
        if(!isSame) return res.status(404).send({status: false, errorMessage: `Error: Email or Password incorrect`})
        const token = user.genToken();
        
        res.header({"x-auth-token": token}).send({status: true, result: `User Logged successfull`, userId: user._id});
    }catch(ex){
        return res.send({status: false, errorMessage: `Something went wrong, Error: ${ex}`})
    }
})

module.exports = router;