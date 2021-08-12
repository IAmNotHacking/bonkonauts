const request = require('request-promise');

/*/  TYPEDEFS  */
/**
 * @typedef {Object} loginFriend
	* @property {Number} id
	* @property {String} name
	* @property {Number} roomid
*/

/**
 * @typedef {Object} user
	* @property {Number} activeAvatarNumber
	* @property {String} avatar
	* @property {String} avatar1
	* @property {String} avatar2
	* @property {String} avatar3
	* @property {String} avatar4
	* @property {String} avatar5
	* @property {Boolean} controls
	* @property {Array.<loginFriend>} friends
	* @property {Number} id
	* @property {String} legacyFriends
	* @property {String} r
	* @property {String} rememberToken
	* @property {String} token
	* @property {String} username
	* @property {Number} xp
*/
/*  TYPEDEFS  /*/

const endpoints = new function() {
	this.base = "https://bonk2.io/scripts/";
	this.login = this.base + "login_legacy.php";
}

module.exports = {
	request,

	/**
	 * Login with a username and password and return the user object.
	 * 
	 * @memberof BonkAPI
	 * @param {String} Username
	 * @param {String} Password
	 * @returns {user} User object (if user and pass are correct)
	 */
	login: async function(username, password) {
		if(!username) return "Username must be valid...";
		if(!password) return "Password must be valid...";
	
		let res = await request.post(endpoints.login, { 
			form: {
				username: username,
				password: password,
				remember: false
			}
		});

		try { res = JSON.parse(res); }
		catch(e) { console.error(res); return {error: res}; }

		if(res.r == 'fail') {
			switch(res.e) {
				case 'username_fail':
					return {error: `No account with that username.`};
				case 'password':
					return {error: `Incorrect password, try again.`};
				default:
					return {error: `An unknown error has occurred: ${res.e}`};

			}
		}

		return res;
	}
};