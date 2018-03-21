/*
 * Sound/music on/off button (mute)
 * x, y position
 */
var SoundButton = function (x, y) {
	var image = game.sound.mute ? 'soundButtonOff' : 'soundButtonOn';

    // call Button constructor
    Phaser.Button.call(this, game, x, y, image, this.toggle);
}

SoundButton.prototype = Object.create(Phaser.Button.prototype);

SoundButton.prototype.constructor = SoundButton;

SoundButton.prototype.toggle = function() {
  if (game.sound.mute === false) {
      game.sound.mute = true;
      this.loadTexture('soundButtonOff');
  }
  else {
      game.sound.mute = false;
      this.loadTexture('soundButtonOn');
  }
}

/*
 * Traffic Signs
 * x, y, signNumber from signs array and rotation
 */
var Sign = function (x, y, signNumber, rotation, mirror) {
	Phaser.Button.call(this, game, x, y, Signs[signNumber].levelImage);

	this.data = Signs[signNumber];

	this.anchor.set(0.5, 0.5);
	this.angle = rotation;

	var swap = mirror == true ? -1 : 1;

	this.inputEnabled = true;
	this.events.onInputOver.add(this.over, this);
	this.events.onInputOut.add(this.out, this);

	this.scale.set(0.7 * swap, 0.7);
	this.grow = game.add.tween(this.scale).to({ x: 1 * swap, y: 1}, 300, Phaser.Easing.Back.Out, false);
	this.shrink = game.add.tween(this.scale).to({ x: 0.7 * swap, y: 0.7}, 300, Phaser.Easing.Back.Out, false);
}

Sign.prototype = Object.create(Phaser.Button.prototype);

Sign.prototype.constructor = Sign;

Sign.prototype.out = function() {
	this.shrink.start();
}

Sign.prototype.over = function() {
	this.grow.start();
}


/*
 * Number Button
 * x, y position and the number to be displayed
 * displays automatically the forbidden bar
 */
var NumberButton = function (x, y, number) {
    // call Graphics constructor
    Phaser.Graphics.call(this, game, x, y);

    // save number
    this.number = number;

    // draw Circle with standard colors
    this.draw(0xFFFFFF, 0x000000);

    // display number
    if (this.number > 0) {
      this.displayNumber = game.make.text(0, 0, number);
      this.displayNumber.anchor.set(0.5, 0.45);
      this.displayNumber.fontSize = "34pt";
      this.addChild(this.displayNumber);
    }

    // enable input and add event functions
    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.click, this);
    this.events.onInputOver.add(this.over, this);
    this.events.onInputOut.add(this.out, this);
};

NumberButton.prototype = Object.create(Phaser.Graphics.prototype);

NumberButton.prototype.constructor = NumberButton;

NumberButton.prototype.click = function () {

}

NumberButton.prototype.over = function () {
  if (this.number > 0) this.displayNumber.fill = '#9C272D';
  this.draw(0xFFFFFF, 0x9C272D);
}

NumberButton.prototype.out = function () {
  if (this.number > 0) this.displayNumber.fill = '#000000';
  this.draw(0xFFFFFF, 0x000000);
}

NumberButton.prototype.draw = function (fillColor, lineColor) {
  this.clear();
  this.lineStyle(6, lineColor, 1);
  this.beginFill(fillColor, 1);
  this.drawCircle(0, 0, 60);
  this.endFill();

  // display forbidden
  if (this.number === 0) {
    this.lineStyle(7, lineColor);
    this.moveTo(-20,20);
    this.lineTo(20, -20);
  }
}
