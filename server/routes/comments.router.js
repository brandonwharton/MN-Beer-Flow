const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// handles GET requests to GET all comments created by the current user from the DB for the MyCommentsList component
router.get('/', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to get all comments created by current user along with the brewery name that they relate to. Order them by
    // newest comments first
    const queryText = `SELECT "comments".*, "brewery".name FROM "comments"
                       JOIN "brewery" ON "comments".brewery_id = "brewery".id
                       WHERE "comments".user_id = $1
                       ORDER BY "comments".id DESC;`
    // GET request to DB using current user id
    pool.query(queryText, [req.user.id])
        .then(result => {
            // send back the result
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR: GET comments for current user', error);
            res.sendStatus(500);
        })
})


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
    // sanitized SQL string to add a new comment
    const queryText = `INSERT INTO "comments" ("comment", "user_id", "brewery_id")
                       VALUES ($1, $2, $3);`;
    // save values to add, using req.user to find the currently logged in user id
    const values = [req.body.newComment, req.user.id, req.body.breweryId];
    // POST request to DB
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR: POST new comment', error);
            res.sendStatus(500);
        })
});


// handles DELETE requests to remove a user's comment from the database
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // sanitized SQL string to delete a specific comment from a user, ensuring the correct user id as well
    const queryText = `DELETE FROM "comments" WHERE "comments".id = $1 AND "comments".user_id = $2;`
    // DELETE request to DB
    pool.query(queryText, [req.params.id, req.user.id])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR: DELETE a user comment', error);
            res.sendStatus(500);
        })
});


module.exports = router;