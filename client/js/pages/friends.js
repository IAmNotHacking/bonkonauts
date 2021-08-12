function init() {
	var FRIENDS = window.user.friends;
	var LEGACY_FRIENDS = window.user.legacyFriends.split('#');

	var friendsContainer = document.querySelector('section.content');

	const sortFriends = (friends) => friends.sort((a, b) => { if(a.roomid == null && b.roomid != null) return 1; else if(a.roomid != null && b.roomid == null) return -1; return 0; });  
	FRIENDS = sortFriends(FRIENDS);

	var friendListStr = "";
	for(let friend of FRIENDS) {
		friendListStr += `<li class="user"><span id="name">${friend.name}</span><span id="dbid">${friend.id.toLocaleString()}</span><span id="status" class="${friend.roomid ? "online" : "offline"}">${friend.roomid ? "Online" : "Offline"}</span></li>`;
	}
	var legacyFriendListStr = "";
	var legacyFriendCount = 0;
	for(let friend of LEGACY_FRIENDS) {
		if(friend == '') continue;
		legacyFriendListStr += `<li class="user"><span id="name">${friend}</span></li>`
		legacyFriendCount++;
	}

	// friends
	tmpCard = document.createElement('card');
		tmpItem = document.createElement('item');
			tmpItem.innerHTML = `<strong>Friends</strong> (${FRIENDS.length})`;
		tmpCard.appendChild(tmpItem);
		tmpItem = document.createElement('item');
			tmpItem.innerHTML = `<ul><b><li><span id="name">Username</span><span id="dbid">DBID</span><span id="status">Status</span></li></b><hr/>${friendListStr}</ul>`;
		tmpCard.appendChild(tmpItem);
	friendsContainer.appendChild(tmpCard);

	// legacy friends
	tmpCard = document.createElement('card');
		tmpItem = document.createElement('item');
			tmpItem.innerHTML = `<strong>Flash Friends</strong> (${legacyFriendCount})`;
		tmpCard.appendChild(tmpItem);
		tmpItem = document.createElement('item');
			tmpItem.innerHTML = `<ul><b><li><span id="name">Username</span></li></b><hr/>${legacyFriendListStr}</ul>`;
		tmpCard.appendChild(tmpItem);
	friendsContainer.appendChild(tmpCard);
}