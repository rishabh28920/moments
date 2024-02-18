const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//Register
router.post("/register", async(req,res)=>{
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})


//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            // No user found with the provided username
            
            return res.status(400).json("Wrong credentials");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);

        if (!validated) {
            // Password validation failed
            return res.status(400).json("Wrong credentials");
        }

        // Password validated, send response without the password field
        const { password, ...others } = user._doc;
        const username = req.body.username;

        // console.log(`token: ${token}`);
        const access_token = jwt.sign(username, process.env.TOKEN_SECRET);
        res.cookie('token',access_token)
        .status(200)
        .json({others})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token').send('Logged out successfully');
  });
  

module.exports=router