const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const swag_controller = require('./controllers/swag_controller');
const authCtrl = require('./controllers/auth_controller');
const cartCtrl = require('./controllers/cart_controller');
const searchCtrl = require('./controllers/search_controller');
const {SECRET_SESSION, SERVER_PORT} = process.env;

const app = express();



app.use(bodyParser.json());
app.use(session({
   secret: SECRET_SESSION,
   resave: false,
   saveUninitialized: true
}));
app.use(checkForSession);
app.use( express.static( `./build` ) );

app.get('/api/swag', swag_controller.read);
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);
app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);
app.delete('/api/cart', cartCtrl.delete);
app.get('/api/search', searchCtrl.search);

app.listen(SERVER_PORT, () => {
   console.log(`Server is listening on port: ${SERVER_PORT}`)
});