var menu = function() {
  this.content = {};
};

menu.prototype.init  = function() {
  // Layers
  layer.world[0] = game.add.group();
  layer.world[1] = game.add.group();
  layer.world[2] = game.add.group();

  layer.interface[0] = game.add.group();
  layer.interface[1] = game.add.group();
  layer.interface[2] = game.add.group();
}

menu.prototype.create  = function() {

	// Background
  layer.world[0].create(0, 0, 'menuBackground');

	// Sound button
	this.content.soundButton = new SoundButton(game.width - 100, 15);
	layer.world[0].add(this.content.soundButton);

  // play global music if not already started
  if (Global.music === null || !Global.music.isPlaying) Global.player();

	// Policeman
  this.content.policeman01 = game.make.image(977, 220, 'policeman02');
  layer.world[0].add(this.content.policeman01);

 	//Buttons
	this.content.startButton = game.make.button(690, 650, 'menuButtonStart', startLevel);
  this.content.startText = game.make.text(-20 , -50 , 'START', { font:"72px Ampersand"});
  layer.interface[0].add(this.content.startButton);
  this.content.startButton.addChild(this.content.startText);

  this.content.helpButton = game.make.button(302, 540, 'menuButtonHelp', goToHelp);
  this.content.helpText = game.make.text(-20 , -55 , 'HILFE', { font:"72px Ampersand"});
  layer.interface[0].add(this.content.helpButton);
  this.content.helpButton.addChild(this.content.helpText);

	this.content.selectionButton = game.make.button(670, 300, 'menuButtonSelection', goToSelection);
  this.content.selectionText = game.make.text(-60 , -50 , 'AUSWAHL', { font:"72px Ampersand"});
  layer.interface[0].add(this.content.selectionButton);
  this.content.selectionButton.addChild(this.content.selectionText);


	function startLevel() {
		game.state.start("Level", true, false, 0);
	}

	function goToSelection () {
		game.state.start("Selection", true, false);
	}

	function goToHelp () {
		game.state.start("Help", true, false);
	}
}
menu.prototype.shutdown  = function() {
	// maybe remove every background from the cache after the level ends/changes

	this.content = {};
}
