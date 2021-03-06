const express = require('express');
const bodyParser = require('body-parser');
const db = require('./postgres/queries');
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/login', db.login)
app.get('/jobs', db.getAllJobs)

app.listen(3000, function () {
    console.log('API Started on port 3000!')
});
