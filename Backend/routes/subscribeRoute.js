const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@route Post /api/subscribe
//@desc Subscribe to newsletter
//@access Public

router.post("/", async (req,res) =>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({msg: "Please enter your email"});
    }

    try {
        //already subscribed

        let subscriber = await Subscriber.findOne({email});

        if(subscriber){
            return res.status(400).json({msg: "You are already subscribed"});
        }

        subscriber = new Subscriber({email});
        await subscriber.save();

        res.status(201).json({msg: "Successfully subscribe to the news letter!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Error subscribing to the newsletter"});
    }
})

module.exports = router;