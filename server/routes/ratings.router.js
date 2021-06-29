const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// handles GET requests to see if an individual brewery is marked as a user favorite
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to get favorites data for the current user for a specified brewery
    // no results will come back if the brewery isn't a favorite AND the user hasn't rated the brewery yet
    // one result will come back as true if the user has marked as favorite, or as false if the user has rated
    // the brewery without marking it as a favorite as well
    const queryText = `SELECT "user_brewery".is_favorite, "user".username, "brewery".name FROM "user_brewery"
                       JOIN "user" ON "user_brewery".user_id = "user".id
                       JOIN "brewery" ON "user_brewery".brewery_id = "brewery".id
                       WHERE "brewery".id = $1 AND "user".id = $2;`
    // GET request to DB
    pool.query(queryText, [req.params.id, req.user.id])
        .then(result => {
            console.log(result.rows);
            
            res.send(result.rows)
        })
        .catch(error => {
            console.log('ERROR: GET favorites for a single brewery', error)
        })
});



// handles POST requests to add a brewery to a user's list of favorites
router.post('/', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to UPSERT a brewery to user's favorites. Since user_brewery has a unique
    // constraint on pairs of user_id and brewery_id, query below attempts to add a new table row for that
    // user_brewery pair and mark the is_favorite boolean to true. If that unique pair already exists because the
    // user has rated the brewery BEFORE adding it to their favorites, the query does an UPDATE instead to mark
    // the is_favorite boolean as true, since it defaults to false when a user rates a brewery without making it a favorite
    const queryText = `INSERT INTO "user_brewery" ("user_id", "brewery_id", "is_favorite")
                       VALUES ($1, $2, TRUE)
                       ON CONFLICT ("user_id", "brewery_id")
                       DO UPDATE SET "is_favorite" = TRUE;`;
    // save values to add, using req.user to find the currently logged in user id
    const values = [req.user.id, req.body.breweryId];
    // POST request  to DB
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR: POST new favorites row', error);
            res.sendStatus(500);
        })
});


module.exports = router;