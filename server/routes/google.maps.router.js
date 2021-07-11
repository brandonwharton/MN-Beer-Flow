const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


// GET request to Google's Geocoding API to convert a given address to latitude and longitude coordinates
router.get('/', rejectUnauthenticated, (req, res) => {
    // request to Google's Geocoding API enpoint with supplied address and city information. Set up for Minnesota only currently.
    const queryText = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address},${req.query.city},+MN&key=${process.env.MAPS_API_KEY}`;
    // axios request to API
    axios.get(queryText)
        .then(response => {
            // send back all the data from Geocoding API
            res.send(response.data)
        })
        .catch(err => {
            console.log('Problem with converting given location', err);
            res.sendStatus(500);
        })
})


module.exports = router;