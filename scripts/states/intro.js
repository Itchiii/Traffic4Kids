var intro = function() {
	this.intro;
	this.trailer;
	this.skip = false;
};

/**********************
 * create video intro *
 **********************/
intro.prototype.create  = function() {
	// create and play intro
	this.intro = game.add.video('intro');
	this.intro.play();
	this.intro.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
	this.intro.onComplete.add(next, this);

	// create trailer
	this.trailer = game.add.video('trailer');
	this.trailer.onComplete.add(next, this);

	// next/skip intro and trailer on click
	game.input.onDown.add(next, this);

	function next() {
		if (!this.skip) {
			this.intro.stop();
			this.trailer.play();
			this.trailer.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 0.75, 0.75);
			this.skip = true;
		}
		else game.state.start("Menu", true, false);
	}
}

/***************************
 * remove intro from cache *
 ***************************/
intro.prototype.shutdown  = function() {
	this.intro.destroy();
	this.trailer.destroy();
	game.cache.removeVideo('intro');
	game.cache.removeVideo('trailer');
}
