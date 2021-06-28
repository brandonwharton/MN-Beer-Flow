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
    // sanitized SQL string to get comments related to a single brewery, along with the username of whoever made
    // the comment. Order them by newest comment first.
    const queryText = `SELECT "comments".*, "user".username FROM "comments"
                       JOIN "user" ON "user".id = "comments".user_id
                       WHERE "comments".brewery_id = $1
                       ORDER BY "comments".id DESC;`;
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

// handles POST requests to add a new user comment to the comments table
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in POST', req.body);
    
    res.sendStatus(201);
})


module.exports = router;