const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// handles GET requests for a user's ratings and is_favorite data for a specific brewery
router.get('/:id', rejectUnauthenticated, (req, res) => {

    // sanitized SQL string to get favorites and ratings data for the current user for a specified brewery
    // no results will come back if the brewery isn't a favorite AND the user hasn't rated the brewery yet
    // one result will come back if the user has marked the brewery as a favorite, if they've rated the brewery,
    // or if both have been done
    const queryText = `SELECT "user_brewery".is_favorite, "user_brewery".rating, "user".username, "brewery".name FROM "user_brewery"
                       JOIN "user" ON "user_brewery".user_id = "user".id
                       JOIN "brewery" ON "user_brewery".brewery_id = "brewery".id
                       WHERE "brewery".id = $1 AND "user".id = $2;`
    // GET request to DB
    pool.query(queryText, [req.params.id, req.user.id])
        .then(result => {
            // send back the result
            res.send(result.rows)
        })
        .catch(error => {
            console.log('ERROR: GET favorites for a single brewery', error)
        })
});


// handles GET requests to get any existing ratings data for a brewery in order to calculate an average rating
router.get('/average/:id', rejectUnauthenticated, (req, res) => {

    // sanitized SQL string to get all ratings data associated with a single brewery if any exists
    // no results will come back if the brewery isn't a marked as a favorite or rated by anybody yet
    // if any users have marked a brewery as one of their favorites or rated that brewery it will send back one result
    // with that brewery name and an array of all ratings for that brewery
    const queryText = `SELECT AVG("user_brewery".rating) AS "average_rating", "brewery".name FROM "user_brewery"
                       JOIN "brewery" ON "user_brewery".brewery_id = "brewery".id
                       WHERE "brewery".id = $1
                       GROUP BY "brewery".name;`
    // GET request to DB
    pool.query(queryText, [req.params.id])
        .then(result => {
            // send back the result
            res.send(result.rows)
        })
        .catch(error => {
            console.log('ERROR: GET average ratings for a single brewery', error)
        })
});


// handles POST requests to add a brewery to a user's list of favorites
router.post('/favorite', rejectUnauthenticated, (req, res) => {
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


// handles POST requests to create or update a user rating of a brewery
router.post('/', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to UPSERT a user's rating of a brewery. Since user_brewery has a unique constraint on pairs
    // of user_id and brewery_id, query below attempts to add a new table row for that user_brewery pair with the
    // ratings data provided. If that unique pair already exists because the user has already marked it as a favorite,
    // or the user has rated the brewery and is updating their rating, the query does an UPDATE instead to change the rating
    // column in the existing table row.
    const queryText = `INSERT INTO "user_brewery" ("user_id", "brewery_id", "rating")
                       VALUES ($1, $2, $3)
                       ON CONFLICT ("user_id", "brewery_id")
                       DO UPDATE SET "rating" = $3;`;
    // save values to add, using req.user to find the currently logged in user id
    const values = [req.user.id, req.body.breweryId, req.body.newRating];
    // POST request to DB
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