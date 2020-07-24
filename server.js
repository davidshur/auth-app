const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

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

app.use('/api/users', users);
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.listen(port, () => console.log(`Server running on port: ${port}!`));
