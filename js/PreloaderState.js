var preloaderState = (function() {
	return function preload(game) {
		var _preloadText;
		var _assetsLoaded = false;
		return {
			init : function() {
				_preloadText = game.add.text(80, 150, 'Loading assets, please wait...', {font:"20px Desyrel", fill:"#ffffff"});
			},
			preload : function() {
				game.load.image('background', '../assets/background.png');
				game.load.image('block', '../assets/block.png');
			    game.load.text('level1', '../levels/level1.txt');
			    game.load.text('level2', '../levels/level2.txt');
			    game.load.text('level3', '../levels/level3.txt');
			    game.load.image('squary', '../assets/squary.png');
			    game.load.image('bonus', '../assets/bonus.png');
			},
			create : function() {				
				// _preloadText.text = 'Assets loaded, press space bar...';
				_assetsLoaded = true;
			},
			update : function() {
				if (_assetsLoaded) {
				// 	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
						game.state.start('intro');
				// 	}
				}
			}
		}
	}
	
});