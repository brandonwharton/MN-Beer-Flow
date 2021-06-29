const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles GET requests to GET all breweries marked as a user's favorites for the MyFavoritesList component
router.get('/', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to get all brewery data and the username of current user for user's favorites
    const queryText = `SELECT "brewery".*, "user".username FROM "brewery"
                       JOIN "user_brewery" ON "user_brewery".brewery_id = "brewery".id
                       JOIN "user" ON "user_brewery".user_id = "user".id
                       WHERE ("user_brewery".user_id = 3 AND "user_brewery".is_favorite = TRUE);`;
    // GET request to DB using provided id
    pool.query(queryText)
        .then(result => {
            // send back the results
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`ERROR: GET user's favorite breweries`, error);
            res.sendStatus(500);
        })
});


// Handles GET requests to GET a single brewery from the DB for the BreweryDetails component
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to get a single brewery
    const queryText = `SELECT * FROM "brewery" WHERE "id" = $1;`;
    // GET request to DB using provided id
    pool.query(queryText, [req.params.id])
        .then(result => {
            // send back the result
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR: GET single brewery', error);
            res.sendStatus(500);
        })
});

module.exports = router;