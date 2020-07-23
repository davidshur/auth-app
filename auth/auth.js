const passport = require('passport');
const localStrategy = require('passport-local');
const UserModel = require('../models/model');

passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.create({ email, password });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found...'});
    }

    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null false, { message: 'Wrong password...'});
    }

    return done(null, user, { message: 'Logged in succesfully!'});
  } catch (error) {
    return done(error);
  }

}))
