const express = require('express');
const dotenv = require('dotenv');
const morgan =require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose')

const homeRoute = require('./server/routes/home.js')

const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

// log req
app.use(morgan('tiny'));

// allow response from cross-origin access request
app.use(cors())

// parse req to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//solve error by unread data from form (validation error: ... is required)
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

// set view engine
app.set('view engine', 'ejs');

// load assets
app.use(express.static(path.resolve(__dirname, 'assets/css')));
app.use(express.static(path.resolve(__dirname, 'assets/img')));
app.use(express.static(path.resolve(__dirname, 'assets/js')));

app.use('/', homeRoute)

// This variabel just stores the value in env file to connect to DB
let connect;

// Declaring other variables

const executorFunction = (resolve, reject) => {
    //This is just an executorFunction of a promise for connecting to DB
    connect = process.env.CONNECT_DB

    if (connect) {
        console.log(connect)
        resolve(connect);
    } else {
        reject("fail to read .env file");
    }
}


const read_env = () => {
    // This function returnS a promise which will try to connect to DB
    return new Promise(executorFunction);
}

//Connecting to DB
read_env()
.then((e) => {

    console.log("Connecting to Database...")

    mongoose.connect(e, () => {console.log('Database connected')})
})

.catch((err) => {
    console.log(err.message)
})

// Listen to localhost port
const port = process.env.PORT || 8080
app.listen(port, () => {console.log('server is running on http://localhost:'+ port)})