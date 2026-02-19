require('dotenv').config();
const cors = require("cors");

const dns = require("node:dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require("./routes/auth");
const catwaysRouter = require("./routes/catways");

var app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const { connectDb } = require("./config/db");

connectDb().catch((err) => {
  console.error("❌ Erreur connexion MongoDB:", err.message);
  process.exit(1);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/", authRouter);
app.use("/catways", catwaysRouter);

module.exports = app;
