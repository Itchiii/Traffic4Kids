var selection = function() {
  this.content = {};
};

selection.prototype.init  = function() {
  // Layers
  layer.world[0] = game.add.group();
  layer.world[1] = game.add.group();
  layer.world[2] = game.add.group();

  layer.interface[0] = game.add.group();
  layer.interface[1] = game.add.group();
  layer.interface[2] = game.add.group();
}

selection.prototype.create  = function() {
  // Background
  layer.world[0].create(0, 0, 'selectionBackground');

  // Sound button
	this.content.soundButton = new SoundButton(game.width - 100, 15);
	layer.world[0].add(this.content.soundButton);

  // play global music if not already started
  if (Global.music === null || !Global.music.isPlaying) Global.player();

  // Heading
  this.content.heading = game.make.text(365, 100, 'Verkehrslektionen', { font:"100px Ampersand", fill: '#000000'});
  this.content.line = game.make.image(335, 185, 'underlineAmpersand');
  layer.world[0].add(this.content.heading);
  layer.world[0].add(this.content.line);

  // Policeman
  this.content.policeman01 = game.make.image(1065, 220, 'policeman07');
  layer.world[0].add(this.content.policeman01);

  // Buttons
  this.content.homeButton = game.make.button(game.world.width - 250, 75, 'selectionButtonHome', goToMenu);
  layer.interface[0].add(this.content.homeButton);

  function goToMenu () {
    game.state.start("Menu", true, false);
  }

  var contentIndicator = 0;
  addContent(contentIndicator);

  function goToPageForth () {
      contentIndicator += 6;
      layer.world[1].removeAll();
      layer.world[2].removeAll();
      layer.interface[1].removeAll();
      addContent(contentIndicator);
  }
  function goToPageBack () {
      contentIndicator -= 6;
      layer.world[1].removeAll();
      layer.world[2].removeAll();
      layer.interface[1].removeAll();
      addContent(contentIndicator);
  }

  function addContent(contentIndicator){
    var xOffset= 0, yOffset = 0, xOffset2= 0;
    var indicatingRange;

    if (Levels.length > contentIndicator + 6){
      indicatingRange = 6 + contentIndicator;
    }
    else {
      indicatingRange = Levels.length;
    }

    if (contentIndicator >= 6){
      this.content.backButton = game.make.button(150, game.world.height - 230, 'selectionButtonLeft', goToPageBack);
      layer.interface[1].add(this.content.backButton);
    }
    if (contentIndicator +6 < Levels.length){
      this.content.forthButton = game.make.button(300, game.world.height - 230, 'selectionButtonRight', goToPageForth);
      layer.interface[1].add(this.content.forthButton);
    }

    for (var i = contentIndicator; i < indicatingRange; i++) {
      if (i === contentIndicator + 3) yOffset = 320;
      var notepadNumber = i % 6;
      var starScore = Levels[i].score;
      this.content.notepad = game.make.button(150 + xOffset , 240 + yOffset, 'notepad'+notepadNumber, goToLevel, {level: i});
      this.content.tabe = game.make.image(100 , -15 , 'tabe');
      this.content.level = game.make.image(20 , 22 , 'testthumbnail');

      // create thumbnail
      var thumbnail = game.make.renderTexture(232, 206),
          thumbnailContent = game.make.group(null);

      // thumbnail background
      var image = game.make.sprite(720, 540, Levels[i].contents.image);
          image.anchor.set(0.5);
      thumbnailContent.add(image);
      thumbnailContent.scale.set(0.2);

      // thumbnail participants
      for (var j = 0; j < Levels[i].contents.participants.length; j++) {
        var participant = Object.create(Participant.prototype);
        Participant.apply(participant, Levels[i].contents.participants[j]);
        // ugly fix for siren
        if ('left' in participant.options.siren || 'right' in participant.options.siren) {
          participant.sirenSound.stop();
        }

        var image = game.make.sprite(participant.x, participant.y, Levels[i].contents.participants[j][2], participant.options.sprite);
            image.anchor.set(0.5);
            image.rotation = participant.direction;
        thumbnailContent.add(image);

        participant.destroy();
      }

      // thumbnail signs
      for (var j = 0; j < Levels[i].contents.signs.length; j++) {
        var image = game.make.sprite(Levels[i].contents.signs[j][0], Levels[i].contents.signs[j][1], Signs[Levels[i].contents.signs[j][2]].levelImage);
            image.anchor.set(0.5);
            image.scale.set(0.8);
            if (Levels[i].contents.signs[j][4] == true) image.scale.x *= -1;
            image.angle = Levels[i].contents.signs[j][3];
        thumbnailContent.add(image);
      }

      thumbnail.renderXY(thumbnailContent, -28, 0);
      thumbnailContent.destroy(true);

      this.content.number = game.make.text(215 , 235 , '#' + i, { font:"34px Ampersand", fill: '#000000' });

      layer.world[1].add(this.content.notepad);
      notepad.addChild(this.content.tabe);
      notepad.addChild(game.add.sprite(20 , 22, thumbnail));
      notepad.addChild(this.content.number);

      if (Levels[i].finished === true){
        this.content.tick = game.make.image(180, 232, 'tick');
        notepad.addChild(this.content.tick);
      }

      for (var a = 1; a <=3; a++){
        if (starScore > 0){
          this.content.starYellow = game.make.image(20 + xOffset2, 230, 'starYellow');
          notepad.addChild(this.content.starYellow);
          starScore -=1;
        }
        else {
          this.content.starGrey = game.make.image(20 + xOffset2, 230, 'starGrey');
          notepad.addChild(this.content.starGrey);
        }
        xOffset2 = (xOffset2 + 31) % 93;
      }

      xOffset = (xOffset + 320) % 960;
    }
  }

  function goToLevel (level) {
    game.state.start("Level", true, false, this.level);
  }
}
selection.prototype.shutdown  = function() {
	// maybe remove every background from the cache after the level ends/changes

	this.content = {};
}
