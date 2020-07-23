const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const UserModel = require('./models/model');

mongoose.connect('mongodb://127.0.0.1:27017/auth-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/routes');
const secureRoutes = require('./routes/secure-routes');

app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false}), secureRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log(`Listening on 3000...`);
})
