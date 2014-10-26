var gameState = (function() {
	return function currentgame(game) {
		var level;
		var boxes;
		var bonuses;
		var squary;
		var cursors;
		var lifeBar;
		var looseText;
		var winnerText;
		var pauseText;
		var gameLost = false;
		var gameSuccess = false;
		var currentLevel = 1;
		var bonusEaten;
		var totalBonus;

		var boxWidth = 20;
		var boxHeight = 20;

		var pressSpace;
		var pressEnter;

		function createLifeBar() {
			var _width = 15;
			var _height = 3;
			var _padX = 3;
			var _padY = 5;
			var _widthBarLoose = 0.5;

			var that = game.add.graphics(0, 0);

			that.size = {width : _width, height : _height};
			
			var _timeBetweenFrames = (1 / (that.size.width / game.lifeTime)) / 2;
			var _referenceTime = new Date().getDate();

			that.refreshState = function() {
				var now = new Date().getTime();

				var timeForThisFrame = now;
				var timeElapsed = (timeForThisFrame - _referenceTime) / 1000;

				if (timeElapsed > _timeBetweenFrames) {
					this.size.width -= _widthBarLoose;
					_referenceTime = now;
				}
			}

			that.isEmpty = function() {
				return this.size.width <= 0;
			}

			that.needToBeFilledUp = function() {
				return this.size.width < _width;
			}

			that.fillUp = function(val) {
				this.size.width += val;
			}

			that.render = function() {
				this.clear();

				this.beginFill('#000000');
				this.drawRect(squary.position.x - _padX, squary.position.y - _padY, this.size.width, this.size.height);
				this.endFill();
			}

			return that;
		}

		function pressSpace() {
			if (!gameSuccess && !gameLost) {
				game.paused = !game.paused;
				pauseText.visible = !pauseText.visible;
			}
		}

		function pressEnter() {
			if (game.paused) {
				if (gameSuccess) {
					currentLevel++;
				}
				initLevel(currentLevel);
			}
		}

		function resetVariables() {
			game.paused = false;
			gameLost = false;
			gameSuccess = false;
			bonusEaten = 0;
			totalBonus = 0;
		}

		function initLevel(levelNumber) {
			resetVariables();

			game.add.image(0, 0, 'background');
			level = game.cache.getText('level' + levelNumber).split(/[\r\n]+/);
			boxes = game.add.group();
			boxes.enableBody = true;
			bonuses = game.add.group();
			bonuses.enableBody = true;
			bonuses.physicsBodyType = Phaser.Physics.ARCADE;
			cursors = game.input.keyboard.createCursorKeys();

			for (var y = 0; y < level.length; y++) {
				for (var x = 0; x < level[y].length; x++) {
					if (level[y][x] === 'b') {
						boxes.create(x * boxWidth, y * boxHeight, 'block');
					}
					if (level[y][x] === 'o') {
						bonuses.create((x * boxWidth) + (boxWidth / 2) - 5, (y * boxHeight) + (boxHeight / 2), 'bonus');
					}
					if (level[y][x] === 'p') {
						squary = game.add.sprite(x * 10, y * 10, 'squary');
						lifeBar = createLifeBar();
					}
					
				}
			}

			totalBonus = bonuses.length;

			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.physics.arcade.enable(squary, Phaser.Physics.ARCADE);
			game.physics.arcade.checkCollision.up = false;

			squary.body.collideWorldBounds = true;

			boxes.setAll('body.immovable', true);
			boxes.setAll('body.allowGravity', false);
			
			winnerText = game.add.text(70, 150, '- You win, press enter to continue -', {font : '20px Desyrel', fill: '#ffffff', align: 'center'});
			looseText = game.add.text(70, 150, '- You loose, press enter to restart -', {font : '20px Desyrel', fill: '#ffffff', align: 'center'});
			pauseText = game.add.text(100, 150, '- PAUSE -', {font : '20px Desyrel', fill: '#ffffff', align: 'center'});
			looseText.visible = false;
			winnerText.visible = false;
			pauseText.visible = false;
		}

		function gameOver() {
			looseText.visible = true;
			game.paused = true;
			gameLost = true;
			squary.body.velocity.x = 0;
			squary.body.velocity.y = 0;
		}

		function isWinner() {
			return bonusEaten === totalBonus;
		}

		function winner() {
			winnerText.visible = true;
			squary.body.velocity.x = 0;
			squary.body.velocity.y = 0;
			gameSuccess = true;
			game.paused = true;
		}

		return {
			init : function() {
				
			},
			preload : function() {
				
			},
			create : function() {
				var keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				keySpace.onDown.add(pressSpace, this);

				var keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				keyEnter.onDown.add(pressEnter, this);

				initLevel(currentLevel);
			},
			update : function() {
				game.physics.arcade.collide(squary, boxes);
				game.physics.arcade.overlap(squary, bonuses, function(_squary, _bonus) {
					bonuses.remove(_bonus);
					bonusEaten++
					if (isWinner()) {
						winner();
					}
					if (lifeBar.needToBeFilledUp()) {
						lifeBar.fillUp(1);
					}
				});

				squary.body.velocity.x = 0;
				squary.body.gravity.y = 1500;

				if (squary.body.bottom >= game.world.bounds.bottom) {
					gameOver();
				}
				else {
					if (cursors.left.isDown) {
						squary.body.velocity.x = -120;
					}
					else if (cursors.right.isDown) {
						squary.body.velocity.x = 120;
					}

					if (cursors.up.isDown && squary.body.touching.down) {
						squary.body.velocity.y = -420;
					}

					lifeBar.refreshState();

					if (lifeBar.isEmpty()) {
						gameOver();
					}
				}

			},
			render : function() {
				lifeBar.render();
			}
		}
	}
})