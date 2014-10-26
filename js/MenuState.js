var menuState = (function() {
	return function menu(game) {
		var easyText;
		var mediumText;
		var hardText;
		var padSelector = 50;
		var squary;
		var cursors;
		var lifetime = 15; // easy by default

		function chooseDown() {
			squary.position.y += padSelector;
			if (squary.position.y > 250) {
				squary.position.y -= padSelector;
			}
			else {
				lifetime -= 5;
			}
		}

		function chooseUp() {
			squary.position.y -= padSelector;
			if (squary.position.y < 100) {
				squary.position.y += padSelector;
			}
			else {
				lifetime += 5;
			}
		}

		function chooseEnter() {
			game.lifeTime = lifetime;
			game.state.start('game');
		}

		return {
			init : function() {
				
			},
			preload : function() {
				cursors = game.input.keyboard.createCursorKeys();

				squary = game.add.sprite(70, 104, 'squary');

				easyText = game.add.text(100, 100, 'Easy mode (15s)', {font:"20px Desyrel", fill:"blue"});
				mediumText = game.add.text(100, 150, 'Medium mode (10s)', {font : '20px Desyrel', fill: 'yellow'});
				hardText = game.add.text(100, 200, 'Hard mode (5s)', {font : '20px Desyrel', fill: 'red'});

				var keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
				keyUp.onDown.add(chooseUp, this);

				var keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
				keyDown.onDown.add(chooseDown, this);

				var keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				keyEnter.onDown.add(chooseEnter, this);
			},
			create : function() {				
				
			},
			update : function() {
			}
		}
	}
	
});