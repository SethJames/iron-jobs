const express = require('express');
const bodyParser = require('body-parser');

require('./database-setup.js');
let app = express();


app.use(bodyParser.json());
console.log('database MY_DB_LOCATION', process.env.MY_DB_LOCATION);
console.log('database location', process.env);

app.use(express.static(__dirname + '/../client/public/'));

app.use( '/api/jobs', require('./routes/jobs.routes.js'));

app.use(require('./middleware/page-not-found.middleware.js'));

app.use( require('./middleware/error-Handler.middleware.js') );

app.listen(3000, function ServerIsUp() {
    console.log('The server is up!');
});
