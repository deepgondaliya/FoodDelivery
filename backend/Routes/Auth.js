const express = require('express');
const User = require('../models/User');
const Order = require('../models/Orders');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa";

// Create a user and store data to MongoDB Atlas, No Login Required
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            password: securePass,
            email,
            location
        });

        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Authenticate a user, No login Required
router.post('/login', [
    body('email').isEmail().withMessage("Enter a Valid Email"),
    body('password').exists().withMessage("Password cannot be blank"),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get logged in user details, Login Required
router.post('/getuser', fetch, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get location based on latitude and longitude
router.post('/getlocation', async (req, res) => {
    const { lat, long } = req.body.latlong || {};

    if (!lat || !long) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`);
        const { village, county, state_district, state, postcode } = response.data.results[0].components;
        const location = `${village}, ${county}, ${state_district}, ${state}\n${postcode}`;
        res.json({ location });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get food data
router.post('/foodData', async (req, res) => {
    try {
      // Check if global.food_items and global.food_category are populated
      if (global.food_items && global.food_category) {
        res.json([global.food_items, global.food_category]);
      } else {
        res.status(500).json({ error: 'Data not available' });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Post order data
router.post('/orderData', async (req, res) => {
    const { email, order_data, order_date } = req.body;
    order_data.unshift({ Order_date: order_date });

    try {
        const existingOrder = await Order.findOne({ email });
        if (existingOrder) {
            await Order.findOneAndUpdate({ email }, { $push: { order_data } });
        } else {
            await Order.create({ email, order_data: [order_data] });
        }
        res.json({ success: true });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get my order data
router.post('/myOrderData', async (req, res) => {
    try {
        const { email } = req.body;
        const orderData = await Order.findOne({ email });
        
        if (orderData) {
            res.json({ orderData });
        } else {
            res.status(404).json({ error: "No orders found for this email" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router;
