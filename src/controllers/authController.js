const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = require('./verifyToken');

router.post('/signup', async (req, res, next) => {
    const {username, email, password} = req.body;
    const user = new User({
        username,
        email,
        password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id},config.secret, {
        expiresIn: 60*60*24
    });
    res.json({auth: true, token});

});

router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, {password: 0});
    if(!user){
        res.status(400).send('No user found');
    }else{            
        res.json(user);    
    } 
    
});

router.post('/signin', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).send('Email not found');
    }else{        
        const validPassword = await user.validatePassword(password, user.password);        
        if(!validPassword){
            return res.status(401).json({auth:false, token:null});
        }else{
            const token = jwt.sign({id:user._id}, config.secret, {
                expiresIn: 60*60*24
            });
            res.json({auth:true, token});
        }
    }
    
})




module.exports = router;