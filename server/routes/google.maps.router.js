const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
require('dotenv').config();
const router = express.Router();

// GET request to Google's geocoding API to convert given addresses to latitude and longitude
router.get('/', (req, res) => {
    console.log('Got to geocaching GET', req.query);

    const queryText = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address},${req.query.city},+MN&key=${process.env.MAPS_API_KEY}`;

    console.log('queryText', queryText);
    
    pool.query(queryText)
        // get first response, then send second request
        .then(response => {
            console.log('Response for address', response.data);
        })
        .catch(err => {
            console.log('Problem with converting given location', err);
            res.sendStatus(500);
        })
})


module.exports = router;