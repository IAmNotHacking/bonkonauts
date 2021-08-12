const express = require('express');
const session = require('express-session');
const path 	  = require('path');

const ip = require('./ip');
const PORT = 1337;

var app = new express();
app.use(session({
	secret: 'bonktonautic_man',
	resave: true,
	saveUninitialized: true
}));

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(ip.logger);

app.use(express.static(path.join(__dirname, '../client')));
app.use('/', require('./routes/web.js'));
app.use('/api', require('./routes/api.js'));

// any other endpoints attempted that arent valid, will send a 404 response
app.use(function(req, res) {
    res.status(404);
	return res.sendFile(path.join(__dirname, '../client/404_fxqWIbIeZeANEAg.html'));
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});