var introState = (function() {
	return function intro(game) {
		var bootText;
		var pressSpaceText;
		var timer = 0;
		return {
			init : function() {
				
			},
			preload : function() {
				bootText = game.add.text(110, 100, 'A squary adventure...', {font:"20px Desyrel", fill:"#ffffff"});
				pressSpaceText = game.add.text(140, 300, '- Press space -', {font:"20px Desyrel", fill:"#ffffff"});
				pressSpaceText.visible = false;
				bootText.alpha = 0;
			},
			create : function() {				
				
			},
			update : function() {
				if (bootText.alpha < 1) {
					bootText.alpha += 0.01;
				}
				else {
					timer += game.time.elapsed;
					if (timer >= 1000) {
						timer -= 1000;
						pressSpaceText.visible = !pressSpaceText.visible;
					}

					if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
						game.state.start('menu');
					}
				}
			}
		}
	}
	
});