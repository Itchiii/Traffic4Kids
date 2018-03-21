var boot = function() {};

boot.prototype.init  = function() {
  game.scale.maxWidth = 1440;
  game.scale.maxHeight = 1080;
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}

boot.prototype.preload  = function() {}

boot.prototype.create  = function() {
	game.state.start("Load", true, false, "Intro");
}
