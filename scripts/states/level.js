var level = function() {
	this.levelNumber;

	this.content = {};
};

/***********************************
 * initialize layers and variables *
 ***********************************/
level.prototype.init  = function(levelNumber) {
	// parent group for all world layers
	layer.parentWorldGroup = game.add.group();
	// set rotation point to the center
	layer.parentWorldGroup.x = game.world.centerX;
	layer.parentWorldGroup.y = game.world.centerY;
	layer.parentWorldGroup.pivot.x = game.world.centerX;
	layer.parentWorldGroup.pivot.y = game.world.centerY;

	// create layers
  layer.world[0] = game.add.group();
  layer.world[1] = game.add.group();
  layer.world[2] = game.add.group();
  layer.world[3] = game.add.group();

  layer.interface[0] = game.add.group();
  layer.interface[1] = game.add.group();
  layer.interface[2] = game.add.group();
  layer.interface[3] = game.add.group();

  layer.overlay[0] = game.add.group();
  layer.overlay[1] = game.add.group();
  layer.overlay[2] = game.add.group();
  layer.overlay[3] = game.add.group();

	// set all world groups as children to parentWorldGroup
	for (var i = 0; i < layer.world.length; i++) {
		layer.parentWorldGroup.add(layer.world[i]);
	}

	// the current level number
	this.levelNumber = levelNumber;

	// set maximum score
	this.content.score = 3;

	// time/duration when the rotate button is clicked
	this.content.rotateButtonOnClick = 0;

	// contains all participants in the level
	this.content.participants = [];

	// contains all signs in the level
	this.content.signs = [];

	// group of all number buttons
	this.content.numberButtons = game.add.group();

	// contains the current selected participant
	this.content.selectedParticipant = null;

	// contains whether or not the participants are moving, required for play/stop button
	this.content.playing = false;

	// global counter for the number of participants
	this.content.amount = 0;

	// temp counter of finished participants
	this.content.completedParticipants = 0;

	// start / stop events
	this.content.onStart = new Phaser.Signal();
	this.content.onStop = new Phaser.Signal();

	// select / deselect events
	this.content.onParticipantSelect = new Phaser.Signal();
	this.content.onParticipantDeselect = new Phaser.Signal();
}

/******************************************
 * create all buttons, objects and images *
 ******************************************/
level.prototype.create  = function() {
	// Sound button
  this.content.soundButton = new SoundButton(game.width - 100, 15);
  layer.overlay[3].add(this.content.soundButton);


	// play global music if not already started
  if (Global.music === null || !Global.music.isPlaying) Global.player();

	//Menu
	this.content.menu = game.make.sprite(1205, 855, 'levelMenu');
	layer.interface[0].add(this.content.menu);

	//levelNumber
	this.content.number = game.make.text(game.width - 70 , game.height - 70 , '#' + this.levelNumber, {fill: '#000000', fontSize:"40px"});
	layer.interface[0].add(this.content.number);

	// Home button
	this.content.homeButton = game.make.button(game.width - 200, game.height - 70, 'levelButtonExit', goToMenu);
	layer.interface[0].add(this.content.homeButton);
	function goToMenu () {
		game.state.start("Menu", true, false);
	}


	// Rotate button
	this.content.rotateButton = game.make.button(game.width - 145, game.height - 150, 'levelButtonRotate');
	layer.interface[0].add(this.content.rotateButton);
	this.content.rotateButton.events.onInputDown.add(rotateButtonDown, this);
	this.content.rotateButton.events.onInputUp.add(rotateButtonUp, this);
	function rotateButtonUp () {
		if (!this.content.playing && this.content.rotateButtonOnClick + 300 >= Date.now()) layer.parentWorldGroup.angle = 90 + 90 * Math.floor(layer.parentWorldGroup.angle % 360 / 90);
	}
	function rotateButtonDown () {
		if (!this.content.playing) this.content.rotateButtonOnClick = Date.now();
	}


	// Play / Stop button
	this.content.playButton = game.make.button(game.width - 70, game.height - 200, 'levelButtonStart', play, this);
	layer.interface[0].add(this.content.playButton);
	function play (button) {
		// deselect participant
		this.deselectParticipant();

		if (this.content.playing) {
			button.loadTexture('levelButtonStart');
			this.content.onStop.dispatch();
			for (var i = 0; i < this.content.participants.length; i++) {
				if (this.content.participants[i].order > 0) this.content.participants[i].reset();
			}
		}
		else {
			button.loadTexture('levelButtonStop');
			this.content.onStart.dispatch();

			this.content.amount = this.content.participants.length;
			if (this.getParticipantsByOrder(-1).length > 0) {
				this.alert("Du hast noch nicht allen Verkehrsteilnehmern eine Nummer gegeben.", 'neutral', ['back']);
			}
			else {
				this.participantsHandler(0);
			}
		}
		this.content.playing = this.content.playing ? false : true;
	}


	// create all participants
	for (var i = 0; i < Levels[this.levelNumber].contents.participants.length; i++) {
		this.content.participants[i] = Object.create(Participant.prototype);
		Participant.apply(this.content.participants[i], Levels[this.levelNumber].contents.participants[i]);
		layer.world[2].add(this.content.participants[i]);
		this.content.participants[i].events.onInputDown.add(this.selectParticipant, this);
		this.content.participants[i].action.onComplete.add(finishedParticipant, this);
	}

	function finishedParticipant (object) {
		this.content.completedParticipants++;
		if (this.getParticipantsByOrder(object.order).length === this.content.completedParticipants) {
			this.participantsHandler(object.order + 1);
			this.content.completedParticipants = 0;
		}
	}


	this.content.onStop.add(enableAllParticipants, this);
	function enableAllParticipants () {
		for (var i = 0; i < this.content.participants.length; i++) {
			this.content.participants[i].inputEnabled = true;
		}
	}

	this.content.onStart.add(disableAllParticipants, this);
	function disableAllParticipants () {
		for (var i = 0; i < this.content.participants.length; i++) {
			this.content.participants[i].inputEnabled = false;
		}
	}


	// create all signs
	for (var i = 0; i < Levels[this.levelNumber].contents.signs.length; i++) {
		this.content.signs[i] = Object.create(Sign.prototype);
		Sign.apply(this.content.signs[i], Levels[this.levelNumber].contents.signs[i]);
		layer.world[3].add(this.content.signs[i]);
		this.content.signs[i].events.onInputDown.add(showHelp, this);
	}

	function showHelp (object) {
		this.alert(object.data.name + "\n" + object.data.description, 'neutral', ['back']);
	}

	this.content.onStart.add(disableAllSigns, this);
	function disableAllSigns () {
		for (var i = 0; i < this.content.signs.length; i++) {
			this.content.signs[i].inputEnabled = false;
		}
	}

	this.content.onStop.add(enableAllSigns, this);
	function enableAllSigns () {
		for (var i = 0; i < this.content.signs.length; i++) {
			this.content.signs[i].inputEnabled = true;
		}
	}


	// create all number Buttons
	for (var i = 0; i <= Levels[this.levelNumber].contents.participants.length; i++) {
		var numberButton = new NumberButton(80 * (i + 1), 0, i);
				numberButton.events.onInputDown.add(selectNumber, this);
				this.content.numberButtons.add(numberButton);
	}
	layer.interface[0].add(this.content.numberButtons);
	this.content.numberButtons.y = game.world.height + 40;

	this.content.showNumberButtons = game.add.tween(this.content.numberButtons).to({ y: game.world.height - 60 }, 200, Phaser.Easing.Back.Out);
	this.content.hideNumberButtons = game.add.tween(this.content.numberButtons).to({ y: game.world.height + 40 }, 200, Phaser.Easing.Back.In);

	this.content.onParticipantSelect.add(showNumberButtons, this);
	function showNumberButtons () {
		this.content.showNumberButtons.start();
	}

	this.content.onParticipantDeselect.add(hideNumberButtons, this);
	function hideNumberButtons () {
		this.content.hideNumberButtons.start();
	}

	function selectNumber (object) {
		if (this.content.selectedParticipant !== null) {
			this.content.selectedParticipant.setOrder(Number(object.number));
		}
	}


	// creates background image from level data
	this.content.levelBackground = game.make.sprite(720, 540, Levels[this.levelNumber].contents.image);
	this.content.levelBackground.anchor.setTo(0.5);
	layer.world[0].add(this.content.levelBackground);

	// REMOVE PARTICIPANT SELECTION ON BACKGROUND CLICK, MAYBE NOT USEFUL
	this.content.levelBackground.inputEnabled = true;
	this.content.levelBackground.events.onInputDown.add(this.deselectParticipant, this);


	// add random sounds
	var sounds = [
		game.add.sound('carHorn', 0.5, false),
		game.add.sound('carHorn2', 0.5, false),
		game.add.sound('bicycleBell', 0.5, false),
		game.add.sound('bicycleBell_2', 0.5, false),
		game.add.sound('bird_1', 0.5, false),
		game.add.sound('bird_2', 0.5, false),
		game.add.sound('bird_3', 0.5, false),
		game.add.sound('airplane', 0.5, false),
	];

	function playSound() {
		sounds[Math.floor(Math.random()*sounds.length)].play();
	}
	function nextSound() {
		game.time.events.add(Phaser.Timer.SECOND * (Math.floor(Math.random() * 40) + 20), playSound, this).autoDestroy = true;
	}

	for (var i = 0; i < sounds.length; i++) {
		sounds[i].onStop.add(nextSound, this);
	}
	nextSound();
}

/************************************
 * update loop with constant checks *
 ************************************/
level.prototype.update  = function() {
		if (!this.content.playing && this.content.rotateButton.input.downDuration() > 300) layer.parentWorldGroup.angle += 1;
}

/*********************************************
 * stops all sounds and removes all contents *
 *********************************************/
level.prototype.shutdown  = function() {
	for(var i = 0; i < this.content.participants.length; i++) {
		if ('left' in this.content.participants[i].options.siren || 'right' in this.content.participants[i].options.siren) {
			this.content.participants[i].sirenSound.stop();
		}
	}

	this.content = {};
}


level.prototype.getParticipantsByOrder = function(order) {
	var participants = [];
	for (var i = 0; i < this.content.participants.length; i++) {
			if (this.content.participants[i].order === order) participants.push(this.content.participants[i]);
	}
	return participants;
}

level.prototype.checkParticipantsOrder = function(participants) {
	for (var i = 0; i < participants.length; i++) {
			if (!participants[i].checkOrder()) {
				participants[i].warning.start();
				return false
			}
	}
	return true;
}

level.prototype.selectParticipant = function(object) {
	if (!this.content.playing && this.content.selectedParticipant !== object) {
		if (this.content.selectedParticipant !== null) this.content.selectedParticipant.deselect();
		this.content.selectedParticipant = object;
		this.content.selectedParticipant.select();
		// dispatch event
		this.content.onParticipantSelect.dispatch();
	}
}

level.prototype.deselectParticipant = function() {
	if (!this.content.playing && this.content.selectedParticipant !== null) {
		if (this.content.selectedParticipant !== null) this.content.selectedParticipant.deselect();
		this.content.selectedParticipant = null;
		// dispatch event
		this.content.onParticipantDeselect.dispatch();
	}
}





level.prototype.participantsHandler = function (order) {
	var participants = this.getParticipantsByOrder(order);

	if (order === 0) {
		if (this.checkParticipantsOrder(participants)) {
			this.content.amount -= participants.length;
			this.participantsHandler(order + 1);
		}
		else {
			this.content.score <= 0 ? 0 : this.content.score--;
			this.alert(Phrases.warning[Math.floor(Math.random()*Phrases.warning.length)] + " Du hast einem Verkehrsteilnehmer fälschlicherweise das Fahren verboten.", 'negative', ['back']);
		}
	}
	else if (participants.length > 0) {
		this.content.amount -= participants.length;
		if (this.checkParticipantsOrder(participants)) {
			for (var i = 0; i < participants.length; i++) {
				if (order > 0) participants[i].move();
			}
		}
		else {
			this.content.score <= 0 ? 0 : this.content.score--;
			this.alert(Phrases.warning[Math.floor(Math.random()*Phrases.warning.length)] + " Ein Verkehrsteilnehmer mit der Nummer " + order + " ist leider falsch.", 'negative', ['back']);
		}
	}
	else if (this.content.amount > 0) this.alert("Du hast bei der Nummerierung an der Stelle " + order + " eine Lücke gelassen.", 'neutral', ['back']);
	else {
		if (this.content.score > Levels[this.levelNumber].score) Levels[this.levelNumber].score = this.content.score;
		Levels[this.levelNumber].finished = true;

		var completed = true;
		for (var i = 0; i < Levels.length; i++) {
			if (!Levels[i].finished) {
				completed = false;
				break;
			}
		}

		if (completed && !Global.completed) {
			this.alert("Klasse, du hast alle Level erfolgreich gemeistert. Hier, dein Fahrradschein und nicht vergessen, Augen auf im Straßenverkehr.", 'win', ['score', 'back', 'menu']);
			Global.completed = true;
		}
		else if (Levels.length === this.levelNumber + 1) this.alert(Phrases.praise[Math.floor(Math.random()*Phrases.praise.length)], 'positive', ['score', 'back', 'selection', 'menu']);
		else this.alert(Phrases.praise[Math.floor(Math.random()*Phrases.praise.length)], 'positive', ['score', 'back', 'next', 'menu']);
	}
}




level.prototype.alert = function(text, gesture, actions) {
		var blackOverlay = game.make.graphics(0, 0);
				blackOverlay.beginFill(0x000000, 0.6);
    		blackOverlay.drawRect(0, 0, game.world.width, game.world.height);
		var bubble = game.make.sprite(160, 200, 'balloon');
		var textOverlay = game.make.text(220, 260, text, {fill:"#000000", fontSize:"40px", wordWrap: true, wordWrapWidth: 780});

		switch (gesture) {
			case 'negative': var policeman = game.make.sprite(870, 220, 'policeman04');
						var whistle = this.game.add.sound('whistle', 0.5).play();
			break;
			case 'neutral': var policeman = game.make.sprite(1000, 220, 'policeman01');
			break;
			case 'positive': var policeman = game.make.sprite(900, 220, 'policeman05');
			break;
			case 'win': var policeman = game.make.sprite(870, 220, 'policeman06');
						var cheering = this.game.add.sound('cheering', 0.5).play();
			break;
		}
	 	var alertContent = game.add.group();
				alertContent.alpha = 0;
				alertContent.add(blackOverlay);
				alertContent.add(bubble);
				alertContent.add(policeman);
				alertContent.add(textOverlay);

		blackOverlay.inputEnabled = true;
		// hack from html5gamedevs.com "problem-toggling-state-of-inputusehandcursor-phaser"
		game.canvas.style.cursor = "default";

		// counts how many "text buttons" are used to variate the y coordinates
		var lineCounter = 1;

		if (actions.indexOf('score') !== -1) {
			var scoreText = game.make.text(220, textOverlay.y + textOverlay.height + 30, "Punktzahl:", {fill:"#000000", fontSize:"40px", wordWrap: true, wordWrapWidth: 780});
			alertContent.add(scoreText);
			for (var i = 0, scoreCounter = this.content.score; i < 3; i++, scoreCounter--){
				var starImage = scoreCounter > 0 ? 'starYellow' : 'starGrey';
				star = game.make.image(235 + scoreText.width + 31 * i, scoreText.y + 8, starImage);
				alertContent.add(star);
			}
			lineCounter++;
		}
		if (actions.indexOf('back') !== -1) {
			var textButton = game.make.text(220, textOverlay.y + textOverlay.height + (60 * lineCounter), "• Zurück zum Spiel", {fill:"#000000", fontSize:"40px", wordWrap: true, wordWrapWidth: 780});
					textButton.inputEnabled = true;
					textButton.input.useHandCursor = true;
					textButton.events.onInputDown.add(hide, this);
					alertContent.add(textButton);
			function hide () {
				var tween = game.add.tween(alertContent).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
						tween.onComplete.add(remove, this);

				for (var i = 0; i < this.content.participants.length; i++) {
					if (this.content.participants[i].order > 0) this.content.participants[i].reset();
				}
				this.content.playButton.loadTexture('levelButtonStart');
				this.content.playing = false;

				function remove () {
					alertContent.destroy(true);
					if (gesture === 'negative') whistle.destroy();
				}
			}
			lineCounter++;
		}
		if (actions.indexOf('next') !== -1) {
			var textButton = game.make.text(220, textOverlay.y + textOverlay.height + (60 * lineCounter), "• Weiter zum nächsten Level", {fill:"#000000", fontSize:"40px", wordWrap: true, wordWrapWidth: 780});
					textButton.inputEnabled = true;
					textButton.input.useHandCursor = true;
					textButton.events.onInputDown.add(goToLevel, this);
					alertContent.add(textButton);
			function goToLevel () {
				game.state.start("Level", true, false, this.levelNumber + 1);
			}
			lineCounter++;
		}
		if (actions.indexOf('selection') !== -1) {
			var textButton = game.make.text(220, textOverlay.y + textOverlay.height + (60 * lineCounter), "• Zur Levelauswahl", {fill:"#000000", fontSize:"40px", wordWrap: true, wordWrapWidth: 780});
					textButton.inputEnabled = true;
					textButton.input.useHandCursor = true;
					textButton.events.onInputDown.add(goToSelection, this);
					alertContent.add(textButton);

			function goToSelection () {
				game.state.start("Selection", true, false);
			}
			lineCounter++;
		}
		if (actions.indexOf('menu') !== -1) {
			var textButton = game.make.text(220, textOverlay.y + textOverlay.height + (60 * lineCounter), "• Zurück zum Hauptmenü", {fill:"#000000", fontSize:"40px", wordWrap: true, wordWrapWidth: 780});
					textButton.inputEnabled = true;
					textButton.input.useHandCursor = true;
					textButton.events.onInputDown.add(goToMenu, this);
					alertContent.add(textButton);

			function goToMenu () {
				game.state.start("Menu", true, false);
			}
			lineCounter++;
		}

		layer.overlay[0].add(alertContent);
		game.add.tween(alertContent).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true);

		this.content.onStop.dispatch();
}
