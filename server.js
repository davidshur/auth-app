const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

corsOptions = {
  origin: 'https://auth-app-mern.herokuapp.com/',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const users = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connected..`))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/api/users', users);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`Server running on port: ${port}!`));
