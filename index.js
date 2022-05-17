require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const cors = require('cors');
const user = require('./models/user');
const app = express();

const corsOptions = {
  origin: process.env.ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['lkasld235j'],
  }),
);

app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);


app.get('/test', async (req, res) => {
  const User = require('./models/user');
  let user;
  try {
    user = await User.find({ email: 'pulaa@gmail.com' });

    return user;
  } catch (err) {
    throw new Error(e);
  }
});

app.listen(3000, () => {
  console.log('Listening');
});
