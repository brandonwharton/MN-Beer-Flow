const express = require('express');
require('dotenv').config();
const router = express.Router();
const axios = require('axios');

// GET request to Google's geocoding API to convert given addresses to latitude and longitude
router.get('/', (req, res) => {
    // request to Google's geocoding API enpoint with supplied address and city information. Works for Minnesota only.
    const queryText = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address},${req.query.city},+MN&key=${process.env.MAPS_API_KEY}`;

    axios.get(queryText)
        // get first response, then send second request
        .then(response => {
            console.log('Response for address', response.data);
            res.send(response.data)
        })
        .catch(err => {
            console.log('Problem with converting given location', err);
            res.sendStatus(500);
        })
})


module.exports = router;