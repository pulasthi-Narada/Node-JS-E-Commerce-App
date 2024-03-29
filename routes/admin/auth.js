const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await usersRepo.create({ email, password });
      req.session.userId = user.id;

      res.redirect('/admin/products');
    } catch (e) {
      res.status(400).send(e.message);
      throw new Error(e);
    }
  },
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    try {
      const user = await usersRepo.getOneBy({ email });

      req.session.userId = user[0].id;

      res.redirect('/admin/products');
    } catch (e) {
      res.status(500).send(e);
      throw new Error(e);
    }
  },
);

module.exports = router;
