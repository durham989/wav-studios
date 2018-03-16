const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const passport = require('passport');
const mongoose = require('mongoose');
// const config = require('./config/database');

mongoose.Promise = global.Promise;

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// // Connect to the database
// mongoose.connect(config.database); 


// // On Connection
// mongoose.connection.on('connected', () => {
//   console.log('Connected to database ' + config.database);
// });


// // On Error
// mongoose.connection.on('error', (err) => {
//   console.log('Database error: ' + err);
// });


const app = express();
// const users = require('./routes/users');
// const subscribers = require('./routes/subscribers');
// const companies = require('./routes/companies');
// const payment = require('./routes/payment');
// const plans = require('./routes/plans');
// const agents = require('./routes/agents');
// const upload = require('./routes/upload');
// const customers = require('./routes/customers');
// const widgets = require('./routes/widgets');
// const enterpriseContacts = require('./routes/enterprise-contacts');


// Port Number
const port = process.env.PORT || 3000;


// CORS Middleware
app.use(cors());


// Set static folder
app.use(express.static(path.join(__dirname, 'dist')));


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.raw({ type: 'text/html; charset=utf-8' }));


// Passport Middlware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// app.use('/users', users);
// app.use('/subscribers', subscribers);
// app.use('/companies', companies);
// app.use('/payment', payment);
// app.use('/plans', plans);
// app.use('/agents', agents);
// app.use('/upload', upload);
// app.use('/customers', customers);
// app.use('/widgets', widgets);
// app.use('/enterprise-contacts', enterpriseContacts);

// Index Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Start Server
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});