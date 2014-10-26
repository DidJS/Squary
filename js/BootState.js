var bootState = (function() {
	return function boot(game) {
		return {
			init : function() {
				
			},
			preload : function() {
				
			},
			create : function() {				
				game.state.start('preloader');
			},
			update : function() {
				
			}
		}
	}
	
});