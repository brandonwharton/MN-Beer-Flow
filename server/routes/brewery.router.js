const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// Handles GET requests to GET all breweries marked as a user's favorites for the MyFavoritesList component
router.get('/user', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to get all brewery data, the user's rating, and the average rating of each brewery found on the user's favorites list
    const queryText = `SELECT "brewery".*, "user_brewery".rating, "ub".average_rating FROM "brewery"
                       JOIN "user_brewery" ON "user_brewery".brewery_id = "brewery".id AND "user_brewery".user_id = $1 AND "user_brewery".is_favorite = TRUE
                       JOIN 
                       (SELECT "ub".brewery_id, AVG ("ub".rating) AS "average_rating" FROM "user_brewery" AS "ub" GROUP BY "ub".brewery_id) AS "ub"
                       ON "ub".brewery_id = "user_brewery".brewery_id
                       GROUP BY "brewery".id, "user_brewery".rating, "ub".average_rating;`;
    // GET request to DB using provided id
    pool.query(queryText, [req.user.id])
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
    // sanitized SQL string to get a single brewery, bring the user rating data and an average_rating as columns to keep
    // controlled data in MyFavorites and SearchBreweries from breaking when moving into and out of BreweryDetails
    const queryText = `SELECT "brewery".*, "user_brewery".rating, AVG("user_brewery".rating) AS "average_rating" FROM "brewery" 
                       FULL OUTER JOIN "user_brewery" ON "user_brewery".brewery_id = "brewery".id
                       WHERE "brewery".id = $1
                       GROUP BY "brewery".id, "user_brewery".rating`;
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


// Handles GET requests for all breweries in DB and sends them back to be filtered with a search or distance query
router.get('/', rejectUnauthenticated, (req, res) => {
    // SQL string to GET all breweries from the brewery table as well as their average rating. If no rating has been provided, average_rating will be null
    const queryText = `SELECT "brewery".*, AVG("user_brewery".rating) AS "average_rating" FROM "brewery"
                       FULL OUTER JOIN "user_brewery" ON "user_brewery".brewery_id = "brewery".id
                       GROUP BY "brewery".id
                       ORDER BY "brewery".id ASC;`;
    // GET request to DB 
    pool.query(queryText)
        .then(result => {
            // send back results
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR: GET all breweries for search', error);
            res.sendStatus(500);
        })
});


// PUT request to adjust latitude and longitude coordinates for a brewery in the database. Requests currently come from the 
// location Saga, which gets data from Google's Geocoding API and sends them to this route
router.put('/coordinates/:id', rejectUnauthenticated, (req, res) => {
    console.log('Got to coordinates PUT with data:', req.body, req.params.id);
    // sanitized SQL string to update brewery data with latitude and longitude values
    const queryText = `UPDATE "brewery" SET "latitude" = $1, "longitude" = $2 WHERE "brewery".id = $3;`
    const values = [req.body.lat, req.body.lng, req.params.id];

    // UPDATE request to DB
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR: PUT for latitude and longitude', error);
            res.sendStatus(500);
        })
})


module.exports = router;