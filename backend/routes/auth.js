const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Harry@$boy";
//Route1 : Create a user using POST: "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Check whether the user with this email already exits
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // JWT
        const data = {
            user: {
                id: user._id
            }
        }
        success = true;
        const authtoken =jwt.sign(data, JWT_SECRET);
        res.send({success, authtoken });
    }
    catch (error) {
        res.status(500).json({success, error: 'Server error' });
    }
});

//Route 2: Authenticate a user using POST: "/api/auth/login":
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    //If there are errors return bad request and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        success = true;
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.send({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error.' });
    }
});
//Route 3: get a user using POST: "/api/auth/getuser":
router.post('/getuser', fetchuser, async (req, res) => {
    //If there are errors return bad request and errors  
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


module.exports = router;