const logger = require('morgan');
const bodyParser = require('body-parser');
const app = require('express')();

const PeopleController = require("./controllers/PeopleController");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const people = new PeopleController();
app.get('/people-like-you', people.get);
app.get('/people-compared-with-you', people.getCompare)

const port = 3000;
app.listen(port, () => console.log('Server running on port',port));