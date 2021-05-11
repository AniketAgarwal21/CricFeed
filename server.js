const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongoose = require("mongoose");

const initRoutes = require('./routes/web');
const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Database Connected Successfully")
});

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set("views", "views")

initRoutes(app)

app.listen(PORT, () => {
  console.log("Server Running");
})