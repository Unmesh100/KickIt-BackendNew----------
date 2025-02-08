const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const errorController = require('./Controller/errorController');
const router = require('./Routes/eventRoutes');

dotenv.config({ path: 'config.env' });

const app = express();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/scripts')));
app.use(express.static(path.join(__dirname, '/uploads/')));

const allowedOrigins = ['http://127.0.0.1:5173', 'http://127.0.0.1:5173/CreateEvent',"http://127.0.0.1:8000"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST","PATCH"],
}));

app.use('/KickIt', router);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;