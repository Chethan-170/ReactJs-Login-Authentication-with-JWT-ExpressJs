const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const defaultRoute = require('./routes');
const authRoute = require('./routes/auth');
const employeeRoute = require('./routes/employee');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// App Routes
app.use('/', defaultRoute);
app.use('/authentication', authRoute);
app.use('/employee', employeeRoute);
//End of App Routes

app.listen(config.port, () => console.log("App is running on port http://localhost:" + config.port))

 