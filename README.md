# iron jobs

An application for sharing job postings with other Iron Yard students and graduates.

## How to run

Easy! First, clone the repo locally. Then install the dependencies with `npm install`.
Last thing: run it on the command line with `npm start`

## How to develop
Data is handled with models stored in the "models" folder stored on the server.
You will put any schema there and export with "module.exports". CRUD is handled
with the routes modules using require for the needed schema. Middleware is handled
in the middleware module. App.use  with the appropriate module file path is
required on the app.js file.


http://mongoosejs.com/docs/

https://expressjs.com/en/api.html#app.delete.method

### Client

The client is all written... but if you want to tweak it, just edit the files
in the `client/` directory. Note that you will need to run `sass` on the styles
in order to build the `style.css` file!


### About
This is a simple application that uses `express4.x` in node to handle local server functions.
In this app, we are using 'Get' and 'Post' methods to manipulate and retrieve data from the server.
Express.static is being used to serve the homepage and middleware
handles the errors as well as the '404' page.  `MongoDB` and `Mongoose` is
being used to handle the data the storage.

### Contributors
James Webb and Seth Brady
