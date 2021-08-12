const express = require('express');
const BonkAPI = require('../lib/BonkAPI.js')
var path = require('path');
const fs = require('fs');

const API = express.Router();
const LEADERBOARD_TO_UPDATE = [];
const empty = arr => arr.length = 0;

API.use(express.json());

API.get('/', (req, res) => {
	return res.status(200).json({data: "Welcome to the bonkonauts API..."})
});

API.get('/user', (req, res) => {
	if(req.session && req.session.user) return res.status(200).json(req.session.user);
	return res.status(400).json({error: "You are not logged in."});
});

API.post('/login', async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if(!username) return res.status(400).json({error: 'You must provide a username.'});
	if(!password) return res.status(400).json({error: 'You must provide a password.'});

	var user = await BonkAPI.login(username, password);
	if(user.error) return res.status(400).json(user);

	LEADERBOARD_TO_UPDATE.push({ name: user.username, xp: Number(user.xp), id: Number(user.id)});
	req.session.user = user;

	return res.status(200).json({success: `Hi, ${user.username}!`});
});

setInterval(updateLeaderboard, 10000); // update the leaderboard every 10 seconds (for now)
API.get('/leaderboard', async (req, res) => {
	if(req.session && req.session.user) return res.status(200).json(fetchLeaderboard());
	return res.status(400).json({error: "You are not logged in."});
});

API.use(function(req, res) {
	return res.status(400).json({error: "Nothing to see here!"})
});


// leaderboard stuff
const getUserIndex = (leaderboard, username) => leaderboard.findIndex(user => user.name == username);
const sortLeaderboard = (leaderboard) => leaderboard.sort((a, b) => b.xp - a.xp);  

function fetchLeaderboard() {
	let data = fs.readFileSync(path.join(__dirname,'../store/leaderboard.json'), 'utf8');
	try { return JSON.parse(data); } catch(e) { return {error: "The leaderboard could not be pulled... Please let IAmNotHacking#3249 know."} }
}
function updateLeaderboard() {
	if(LEADERBOARD_TO_UPDATE.length <= 0) return;

	var leaderboard = fetchLeaderboard();
	if(leaderboard.error) return leaderboard.error;


	for(let item of LEADERBOARD_TO_UPDATE) {
		let userIndex = getUserIndex(leaderboard, item.name);
		if(userIndex < 0) leaderboard.push(item);
		else { leaderboard[userIndex].xp = item.xp; }
	}
	leaderboard = sortLeaderboard(leaderboard);

	writeLeaderboard(leaderboard);

	empty(LEADERBOARD_TO_UPDATE);
}
function writeLeaderboard(updatedLeaderboard) { fs.writeFileSync(path.join(__dirname,'../store/leaderboard.json'), JSON.stringify(updatedLeaderboard, null, 2)); }

module.exports = API;