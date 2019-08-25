const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// For authentication
const passport = require("passport");
const users = require("./routes/users");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(bodyParser.json()); Not needed anymore since it is included in Express (see line below)
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const countriesRouter = require('./routes/countries');
const usersRouter = require('./routes/users');
const poisRouter = require('./routes/pois');


app.use('/countries', countriesRouter);
app.use('/users', usersRouter);
app.use('/pois', poisRouter);


// Passport middleware
app.use(passport.initialize());
// Passport config
require("../config/passport")(passport);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});