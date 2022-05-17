const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');
const User = require('../models/user');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async comparePasswords(saved, supplied) {
    // Saved -> password saved in our database. 'hashed.salt'
    // Supplied -> password given to us by a user trying sign in
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString('hex');
  }

  async create(attrs) {
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);

    const user = new User({
      email: attrs.email,
      password: `${buf.toString('hex')}.${salt}`,
    });

    const newUser = await user.save();
    return newUser;
  }
}

module.exports = new UsersRepository(User);
