const jwt = require('express-jwt')

exports.authenticated = jwt({secret: 'secret-1945'})