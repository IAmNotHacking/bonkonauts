const express = require('express');
var path = require('path');
const fs = require('fs');

const WEB = express.Router();

WEB.get(['/', '/experience', '/avatars', '/maps', '/friends', '/database', '/leaderboard'], (req, res) => {
	if(!req.session.user) return res.sendFile(path.join(__dirname, '../pages/login_lZnghLOjlm9EMj1.html'));

	var truePath = req.path == '/' ? '/experience' : req.path;
	return res.sendFile(path.join(__dirname, `../pages/${truePath}_CBkCLh5AxN6182K.html`));
});

WEB.get('/login', (req, res) => {
	req.session.user = null;
	console.log(__dirname)
	return res.sendFile(path.join(__dirname, '../pages/login_lZnghLOjlm9EMj1.html'));
});

module.exports = WEB;