var load = function () {};

load.prototype.preload  = function() {
	// show loading animation
	var Loadingtext = game.add.text(64, 64, 'LOADING: 0%', { fill: '#ffffff' });

	game.load.onFileComplete.add(loading);
	function loading () {
		Loadingtext.text = 'LOADING: ' + game.load.progress + "%";
	}

	loadFiles(
  // Global Resources
    'resources/images/soundButtonOn.png',
    'resources/images/soundButtonOff.png',
    'resources/sounds/backgroundMusic_1.mp3',
    'resources/sounds/backgroundMusic_2.mp3',
    'resources/sounds/backgroundMusic_3.mp3',
    'resources/sounds/backgroundMusic_4.mp3',

  // intro resources
		'resources/videos/intro.mp4',
    'resources/videos/trailer.mp4',

  // menu resources
    'resources/images/menuBackground.png',
    'resources/images/policemen/policeman02.png',
		'resources/images/buttons/menuButtonSelection.png',
		'resources/images/buttons/menuButtonStart.png',
		'resources/images/buttons/menuButtonHelp.png',


  // level resources

		//sounds
		'resources/sounds/carHorn.mp3',
		'resources/sounds/carHorn2.mp3',
		'resources/sounds/siren_1.mp3',
		'resources/sounds/siren_2.mp3',
		'resources/sounds/whistle.mp3',
		'resources/sounds/bicycleBell.mp3',
		'resources/sounds/bicycleBell_2.mp3',
		'resources/sounds/bird_1.mp3',
		'resources/sounds/bird_2.mp3',
		'resources/sounds/bird_3.mp3',
		'resources/sounds/airplane.mp3',
		'resources/sounds/cheering.mp3',

		'resources/images/levelMenu.png',

		'resources/images/buttons/levelButtonExit.png',
		'resources/images/buttons/levelButtonRotate.png',
		'resources/images/buttons/levelButtonStart.png',
		'resources/images/buttons/levelButtonStop.png',
    'resources/images/buttons/participantArrow.png',
    'resources/images/buttons/participantArrowRed.png',
    // policemen
		'resources/images/policemen/policeman01.png',
		'resources/images/policemen/policeman04.png',
		'resources/images/policemen/policeman05.png',
		'resources/images/policemen/policeman06.png',
    // speech bubble
    'resources/images/balloon.png',
    // cars
    ['resources/images/participants/carSprite01.png', 88, 201],
    ['resources/images/participants/carSprite02.png', 84, 201],
    ['resources/images/participants/carSprite03.png', 92, 181],
    ['resources/images/participants/carSprite04.png', 90, 201],
    ['resources/images/participants/carSprite05.png', 99, 191],
    ['resources/images/participants/truckSprite01.png', 132, 222],
    ['resources/images/participants/truckSprite02.png', 120, 361],
    // bikes
    ['resources/images/participants/bikeSprite01.png', 101, 121],
    ['resources/images/participants/bikeSprite02.png', 101, 121],
    ['resources/images/participants/bikeSprite03.png', 101, 121],
    // pedestrians
    ['resources/images/participants/pedestrianSprite01.png', 41, 39],
    ['resources/images/participants/pedestrianSprite02.png', 41, 39],
    ['resources/images/participants/pedestrianSprite03.png', 41, 39],
    ['resources/images/participants/pedestrianSprite04.png', 41, 39],
    ['resources/images/participants/pedestrianSprite05.png', 41, 39],
    ['resources/images/participants/pedestrianSprite06.png', 41, 39],
    // special participants
    'resources/images/participants/train.png',
    'resources/images/participants/taxi.png',
    'resources/images/participants/emergencyCar01.png',
    'resources/images/participants/emergencyCar02.png',
    'resources/images/participants/emergencyCar03.png',

    'resources/images/indicator.png',
    'resources/images/sirenBlue.png',
    'resources/images/sirenRed.png',

    'resources/images/starGrey.png',
		'resources/images/starYellow.png',
    // little signs
		'resources/images/signs/levelSign01.png',
    'resources/images/signs/levelSign02.png',
    'resources/images/signs/levelSign03.png',
    'resources/images/signs/levelSign04.png',
    'resources/images/signs/levelSign05.png',
    'resources/images/signs/levelSign06.png',
    'resources/images/signs/levelSign07.png',
    'resources/images/signs/levelSign08.png',
    'resources/images/signs/levelSign09.png',
    'resources/images/signs/levelSign10.png',
    'resources/images/signs/levelSign11.png',
    'resources/images/signs/levelSign12.png',
    'resources/images/signs/levelSign13.png',
    'resources/images/signs/levelSign14.png',
    'resources/images/signs/levelSign15.png',
    'resources/images/signs/levelSign16.png',
		'resources/images/signs/levelSign17.png',
    'resources/images/signs/levelSign18.png',
    'resources/images/signs/levelSign19.png',
    'resources/images/signs/levelSign20.png',
    'resources/images/signs/levelSign21.png',
    // specific level background

		'resources/images/levels/levelBackground01.png',
    'resources/images/levels/levelBackground02.png',
    'resources/images/levels/levelBackground03.png',
    'resources/images/levels/levelBackground04.png',
    'resources/images/levels/levelBackground05.png',
    'resources/images/levels/levelBackground06.png',
    'resources/images/levels/levelBackground07.png',
    'resources/images/levels/levelBackground08.png',
    'resources/images/levels/levelBackground09.png',
		'resources/images/levels/levelBackground10.png',

  // help resources
    'resources/images/underlineChalk.png',
    'resources/images/helpBackground.png',
    'resources/images/buttons/helpButtonHome.png',
    'resources/images/buttons/helpButtonLeft.png',
    'resources/images/buttons/helpButtonRight.png',
    'resources/images/buttons/helpButtonBack.png',

		'resources/images/signs/sign00.png',
    'resources/images/signs/sign01.png',
    'resources/images/signs/sign02.png',
		'resources/images/signs/sign03.png',
		'resources/images/signs/sign04.png',
		'resources/images/signs/sign05.png',
		'resources/images/signs/sign06.png',
		'resources/images/signs/sign07.png',
		'resources/images/signs/sign08.png',
		'resources/images/signs/sign09.png',
		'resources/images/signs/sign10.png',
		'resources/images/signs/sign11.png',
		'resources/images/signs/sign12.png',
		'resources/images/signs/sign13.png',
		'resources/images/signs/sign14.png',
		'resources/images/signs/sign15.png',
		'resources/images/signs/sign15.png',
		'resources/images/signs/sign16.png',
		'resources/images/signs/sign17.png',
		'resources/images/signs/sign18.png',
		'resources/images/signs/sign19.png',
		'resources/images/signs/sign20.png',
		'resources/images/signs/sign21.png',
		'resources/images/signs/sign22.png',

		'resources/images/rules/rule00.png',
    'resources/images/rules/rule01.png',
    'resources/images/rules/rule02.png',
    'resources/images/rules/rule03.png',
    'resources/images/rules/rule04.png',
    'resources/images/rules/rule05.png',
    'resources/images/rules/rule06.png',
    'resources/images/rules/rule07.png',
    'resources/images/rules/rule08.png',
    'resources/images/rules/rule09.png',
    'resources/images/rules/rule10.png',
    'resources/images/rules/rule11.png',
    'resources/images/rules/rule12.png',
    'resources/images/rules/rule13.png',
    'resources/images/rules/rule14.png',
    'resources/images/rules/rule15.png',
    'resources/images/rules/rule16.png',
    'resources/images/rules/rule17.png',
    'resources/images/rules/rule18.png',
    'resources/images/rules/rule19.png',
    'resources/images/rules/rule20.png',
    'resources/images/rules/rule21.png',
		'resources/images/rules/rule22.png',
    'resources/images/policemen/policeman03.png',
    'resources/images/policemen/policeman01.png',

  // selection resources
    'resources/images/underlineAmpersand.png',
		'resources/images/notepad0.png',
		'resources/images/notepad1.png',
		'resources/images/notepad2.png',
		'resources/images/notepad3.png',
		'resources/images/notepad4.png',
		'resources/images/notepad5.png',
		'resources/images/tabe.png',
		'resources/images/starGrey.png',
		'resources/images/starYellow.png',
    'resources/images/tick.png',
		'resources/images/testthumbnail.png',
		'resources/images/policemen/policeman07.png',
		'resources/images/selectionBackground.png',
		'resources/images/buttons/selectionButtonHome.png',
		'resources/images/buttons/selectionButtonRight.png',
		'resources/images/buttons/selectionButtonLeft.png'
  );


	// custom load function which checks if the file is already in cache and also takes the file name as the key value
	function loadFiles () {
		for (var i = 0; i < arguments.length; i++) {
      // extra loader for spritesheets
			if (Array.isArray(arguments[i])) {
				var fileExtension = arguments[i][0].substr(arguments[i][0].lastIndexOf('.') + 1).toLowerCase(),
						fileName = arguments[i][0].substring(arguments[i][0].lastIndexOf('/') + 1, arguments[i][0].lastIndexOf('.'));
            if (['png', 'jpg', 'gif'].indexOf(fileExtension) !== -1) {
      				if(!game.cache.checkImageKey(fileName)) game.load.spritesheet(fileName, arguments[i][0], arguments[i][1], arguments[i][2]);
      			}
			}

			else {
  			var fileExtension = arguments[i].substr(arguments[i].lastIndexOf('.') + 1).toLowerCase(),
  					fileName = arguments[i].substring(arguments[i].lastIndexOf('/') + 1, arguments[i].lastIndexOf('.'));

  			if (['png', 'jpg', 'gif'].indexOf(fileExtension) !== -1) {
  				if(!game.cache.checkImageKey(fileName)) game.load.image(fileName, arguments[i]);
  			}

  			else if (['ogg', 'wav', 'mp3'].indexOf(fileExtension) !== -1) {
  				if(!game.cache.checkSoundKey(fileName)) game.load.audio(fileName, arguments[i]);
  			}

  			else if (['mp4', 'avi'].indexOf(fileExtension) !== -1) {
  				if(!game.cache.checkVideoKey(fileName)) game.load.video(fileName, arguments[i]);
  			}

  			else console.warn("Dateiformat nicht vorhanden, möglicherweise im Code ergänzen!");
      }
		}
	}
}

load.prototype.create = function () {
  // initialize playlist and player
  Global.playlist = [
		this.game.add.sound('backgroundMusic_1', 0.1),
		this.game.add.sound('backgroundMusic_2', 0.1),
		this.game.add.sound('backgroundMusic_3', 0.1),
		this.game.add.sound('backgroundMusic_4', 0.1),
	]

	Global.player = function () {
		Global.music = Global.playlist[Math.floor(Math.random()*Global.playlist.length)].play();
	}

	for (var i = 0; i < Global.playlist.length; i++) {
		Global.playlist[i].onStop.add(Global.player, this);
	}

  game.state.start("Intro", true, false);
}
