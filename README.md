
# MN Beer Flow

## Description

_Duration: Two-Week Sprint_

This project was designed and scoped as a two-week passion project to create a full-stack CRUD application to help a user maintain a list of their
favorite craft breweries in Minnesota. I implemented a system that allowed users to create a list of their favorites from among a database of breweries
with the capacity to easily rate them and update their ratings. User's can also leave comments visible by anyone on the details pages for each of the
breweries. 

I used the Geolocation API to get and store the user's current location to assist in distance-based brewery finding. With the help of the Google Maps
Platform Geocoding API, along with the Spherical Geometry library and the Distance Matrix API, user's can populate a list of the ten breweries closest
to their current location. There is also a feature that allows users to randomly choose a brewery from among their list of favorites, or from the entire
database, in order to assist users in deciding where to go or help in finding someplace new. The randomizer has a distance radius limit that lets a user
choose a maximum distance from their current location and limit random results to within that distance.

This app was designed to be mobile-first and is best viewed on a mobile device. You can view this project on heroku [here](https://mn-beer-flow.herokuapp.com/). It may take a moment to load.

## Screen Shots

![app screenshot](/screenshots/ScreenShot1.png)
![app screenshot](/screenshots/ScreenShot2.png)
![app screenshot](/screenshots/ScreenShot3.png)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Homebrew](https://brew.sh/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

1. Create a new database called `mn_beer_flow`.
2. Run the commands found in the provided database.sql file using a database manager of your choice ([Postico](https://eggerapps.at/postico/)) to
create the necessary database tables.
3. Using the provided brewery.csv file, import brewery data into the `brewery` table in the new `mn_beer_flow` database. All other data for database
tables are provided by users interacting with the app.


## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste the following lines into the file:
  ```
  SERVER_SESSION_SECRET=randomStringHere
  ```
  ```
  MAPS_API_KEY=YOUR_GOOGLE_MAPS_PLATFORM_API_KEY
  ```
  ```
  REACT_APP_MAPS_API_KEY=YOUR_GOOGLE_MAPS_PLATFORM_API_KEY
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning when you start your server.

  Replace YOUR_GOOGLE_MAPS_PLATFORM_API_KEY with an actual API key provided by [Google](https://developers.google.com/maps/gmp-get-started).
- Start postgres if not running already by using `brew services start postgresql`
  - Stop database by running `brew services stop postgresql` in that same terminal.
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000` in a browser. App view is optimized in Google Chrome by toggling the device toolbar and selecting iPhone 6/7/8 Plus.

## Usage

1. After registration and login, the loading page is at /myfavorites which contains a list of the breweries that have been marked as your favorite. 
   there's a search bar that lets you find specific favorites, you can click on any of the brewery cards to visit the details view for that brewery,
   and you can update any of your ratings for the breweries you've marked as your favorite right from here.
2. The "Find A Brewery" button in the navbar brings you to a search menu that allows you to search for any brewery in the database. The Look It Up button
   displays a list of search results based on what you've entered in the search field. After searching, you can click on any of these cards as well to visit
   the details view for the brewery shown. The See What's Close button here does the same thing as the See What's Close option in the nav menu.
3. The See What's Close feature shows the ten breweries that are closest to your current location. They're displayed from closest to farthest, and like
   other display cards, can be clicked on to navigate to the details view.
4. The details view shows a button prompting you to add a brewery to your list of favorites if not already there, or displays a message confirming it's 
   a favorite. There's a display that shows how far away the brewery is from the user, and a display of your rating and the average rating for the brewery.
   You can rate a brewery from here whether or not it's a favorite of yours. There is a comments section for that specific brewery at the bottom of the 
   details view. You can also comment on breweries whether or not you've made them a favorite. 
5. The Go With The Flow option in the nav menu takes you to a view that lets you select a brewery at and directs you to the details page for the brewery
   chosen. There's a distance limit that lets you keep your random result within a certain distance radius from your location. The Be Brave button selects
   your random brewery from everything in the database within your specified distance radius. The From Favorites button selects a random brewery within 
   the distance limit from among your favorites.
6. The My Comments option in the nav menu brings you to a view of all of the comments you've left for any brewery. There's a delete button for each of
   them if you'd like to remove the comment you've left. 
7. The About option in the nav menu provides a small amount of in-app instruction for how the app functions.

## Built With

- React
- Redux-Saga
- Node.js
- PostgreSQL
- Axios
- Express
- Material-UI
- Geolocation API
- Google Distance Matrix API
- Google Spherical Geometry Library

Stock photos provided in the database were found at [https://www.pexels.com/](https://www.pexels.com/)

## Acknowledgement

Thanks to [Prime Digital Academy](https://www.primeacademy.io/) for the wealth of knowledge shared to get this project running, to my instructor
Dane Smith for the expert bugfixes, and to each member of my cohort who helped with ideas, troubleshooting, and support along the way.

## Support

If you have suggestions or issues, feel free to email me at [whartonbm@gmail.com](mailto:whartonbm@gmail.com). 
