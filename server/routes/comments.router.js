const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// handles GET requests to GET the comments for a single brewery from the DB for the BreweryDetails component
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to get comments related to a single brewery
    const queryText = `SELECT * FROM "comments" WHERE "comments".brewery_id = $1;`;
    // GET request to DB using provided id
    pool.query(queryText, [req.params.id])
        .then(result => {
            // send back the result
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR: GET comments for a single brewery', error);
            res.sendStatus(500);
        })
});

module.exports = router;