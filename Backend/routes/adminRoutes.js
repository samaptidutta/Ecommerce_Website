const express = require("express");
const User = require("../models/user");
const {protect, admin} = require("../middleware/authMiddleware")


const router = express.Router();

//Get method

// access must be private

router.get("/", protect, admin, async (req,res) =>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})

//Post request
//add new user
//access private & admin

router.post("/", protect, admin, async (req,res) =>{
    const {name, email, password, role} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        user = new User({
            name,
            email,
            password,
            role: role || "admin"
        })

        await user.save();
        res.status(201).json({msg: "User created successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})


// PUT method /api/admin/users/:id
// access private & admin

router.put("/:id", protect, admin, async (req,res) =>{
    try {
        const user = await User.findById(req.params.id);

        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role|| user.role;
        }

        const updatedUser = await user.save();
        res.status(200).json({msg: "User updated successfully", user:updatedUser})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})


// DELETE method
// access private & admin   
// url: /api/admin/users/:id
router.delete("/:id", protect, admin, async (req,res) =>{
    try {
        const user = User.findById(req.params.id);

        if(user){
            await user.deleteOne();
            res.json({msg: "User deleted successfully"})
        } else{
            res.status(404).json({msg: "User not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})
module.exports = router;