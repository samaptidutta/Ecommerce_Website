const express = require("express")
const User = require('../models/user')

const jwt =require("jsonwebtoken")

const router = express.Router()


//@route POST /api/users/register
// @desc register a new user
//@access public
router.post("/register", async (req,res) =>{
    const {name,email,password} = req.body;
    try {
        // registration logic
        let user = await User.findOne({email})

        if(user) return res.status(400).json({message:"User already exists"});

        user = new User({name,email,password})
        await user.save();

        // create JWT payload
        const payload = {user:{id:user._id,role:user.role}}

        //sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,
            {expiresIn:"40h"},
            (err,token) =>
                {
                    if(err) throw err;
                    res.status(201).json({
                        user: {
                            _id: user._id,
                            name: user.name,
                            email:user.email,
                            role: user.role
                        },
                        token,
                    })
                }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
        
    }
});

// @route POST /api/users/login
// @desc login user
//@access public
router.post("/login", async (req,res) =>{
    const {email,password} = req.body;
    try {
        //find user by email
        let user = await User.findOne({email})

        if(!user) return res.status(400).json({message:"Invalid credentials"})
        const isMatch = await user.matchPassword(password)
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"})


            // create JWT payload
        const payload = {user:{id:user._id,role:user.role}}

        //sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,
            {expiresIn:"40h"},
            (err,token) =>
                {
                    if(err) throw err;
                    res.json({
                        user: {
                            _id: user._id,
                            name: user.name,
                            email:user.email,
                            role: user.role
                        },
                        token,
                    })
                }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});



module.exports = router