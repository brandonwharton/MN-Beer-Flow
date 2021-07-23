
# MN Beer Flow

## Description

Duration: Two-Week Sprint

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
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

  Replace YOUR_GOOGLE_MAPS_PLATFORM_API_KEY with an actual API key provided by [Google](https://developers.google.com/maps/gmp-get-started).
- Start postgres if not running already by using `brew services start postgresql`
  - Stop database by running `brew services stop postgresql` in that same terminal.
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000` in a browser. App view is optimized in Google Chrome by toggling the device toolbar and selecting iPhone 6/7/8 Plus.

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
