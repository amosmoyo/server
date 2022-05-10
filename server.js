const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors')

const db = require('./configs/db')

require('./middleware/passport');

const express = require('express');

const auth_routes = require('./routes/auth');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: process.env.client_url,
    credentials: true
}))

// database connection
db();

app.use(cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookiekey]
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send("Hello")
});

app.use('/api/v1/auth', auth_routes)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`The app is running on port ${port}`.yellow.bold);
})
