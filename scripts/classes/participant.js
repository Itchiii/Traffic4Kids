/*
  Participants Class extends Sprite Class
  more information in levels.js
*/
var Participant = function (x, y, image, order, rotation, speed, options, points) {
  // default options
  this.options = {
    'sprite': 0,
    'relative': false,
    'interpolation': 'bezier',
    'frames': [],
    'framerate': 60,
    'indicator': {},
    'siren': {},
    'ease': true,
    'debug': false,
  }
  // set/merge defined options
  Object.assign(this.options, options);

  // call Sprite constructor
  Phaser.Sprite.call(this, game, x, y, image, this.options.sprite);

  // set anchor to the center
  this.anchor.set(0.5, 0.5);

  // store start point
  this.origin = {
    x: x,
    y: y
  };

  // set correct order
  this.orderLevel = order;

  // the players order
  this.order;

  // set rotation of the image, default value is 0
  this.rotationOffset = typeof rotation !== 'number' ? 0 : rotation;

  // contains all points of the curve/path
  this.points = {'x': [x], 'y': [y] };

  this.pointsWithoutStart = {'x': [], 'y': [] };

  // if true, constructs the absolute subsequent points by x, y and the relative points
  if (this.options.relative) {
    for (var i = 0; i < points.length; i++) {
      this.points.x.push(this.points.x[i] + points[i].x);
      this.points.y.push(this.points.y[i] + points[i].y);

      this.pointsWithoutStart.x.push(this.points.x[i] + points[i].x);
      this.pointsWithoutStart.y.push(this.points.y[i] + points[i].y);
    }
  }
  // convert the absolute subsequent points
  else {
    for (var i = 0; i < points.length; i++) {
      this.points.x.push(points[i].x);
      this.points.y.push(points[i].y);

      this.pointsWithoutStart.x.push(points[i].x);
      this.pointsWithoutStart.y.push(points[i].y);
    }
  }

  // contains length of the curve/path
  this.pathLength = 0;
  this.approximateLength();

  // calculate duration by given speed
  this.duration = (this.pathLength / speed) * 1000;

  // create the movement tween
  if (this.options.ease) this.action = game.add.tween(this).to(this.pointsWithoutStart, this.duration, Phaser.Easing.Quadratic.In, false);
  else this.action = game.add.tween(this).to(this.pointsWithoutStart, this.duration);
  this.action.frameBased = true;
  this.action.onUpdateCallback(this.updateAction, this);

  // choose interpolation
  if (this.options.interpolation == 'bezier') this.action.interpolation(function(v, k){ return Phaser.Math.bezierInterpolation(v, k);	});
  else if (this.options.interpolation == 'catmullrom') this.action.interpolation(function(v, k){ return Phaser.Math.catmullRomInterpolation(v, k); });
  else if (this.options.interpolation == 'linear') this.action.interpolation(function(v, k){ return Phaser.Math.linearInterpolation(v, k); });

  // calculate the movement direction
  var firstActionPoint = this.action.generateData()[0];
  this.direction = game.math.angleBetween(x, y, firstActionPoint.x, firstActionPoint.y) + game.math.degToRad(this.rotationOffset);

  // set start rotation to movement direction
  this.rotation = this.direction;

  // create animation if frames are given
  if (this.options.frames.length > 0) {
    this.animation = this.animations.add('animation', this.options.frames, this.options.framerate, true);

    this.action.onComplete.add(animationStop, this);
    function animationStop () {
      this.animation.stop(true);
      this.frame = this.options.sprite;
    }
  }

  // enable input and set the over and out functions
  this.inputEnabled = true;
  this.events.onInputOver.add(this.over, this);
  this.events.onInputOut.add(this.out, this);


  // extra images like the order number

  // number indicator bubble
  this.circle = game.make.sprite(-this.width/2 - 32 + Math.round(this.width * 0.35), this.height/2 + 32 - Math.round(this.height * 0.15), 'participantArrow');
  this.circle.anchor.set(0.5,0.5);
  this.circle.angle = 180;
  this.addChild(this.circle);

  // order display number
  this.selectedMark = game.make.text(0, 0, this.order);
  this.selectedMark.anchor.set(0.5, 0.45)
  this.selectedMark.fontSize = "34pt";

  this.selectedMarkForbidden = game.make.graphics(this.selectedMark.x, this.selectedMark.y);
  this.selectedMarkForbidden.lineStyle(7, 0x000000);
  this.selectedMarkForbidden.moveTo(-20,20);
  this.selectedMarkForbidden.lineTo(20, -20);

  this.circle.addChild(this.selectedMark);

  // set default player order to -1 (unset), 0 represents driving forbidden
  this.setOrder(-1);

  // contains all curve points
  this.curve = game.add.group();

  // create all curve points
  this.showCurve = game.add.tween(this.curve).to({}, 1);
  this.hideCurve = game.add.tween(this.curve).to({}, 1);

  var lastShowTween = this.showCurve;
  var lastHideTween = this.hideCurve;

  for (var i = 0; i < 1; i += (1 / this.pathLength) * 50) {
    if (this.options.interpolation == 'bezier') {
      var currentPointX = game.math.bezierInterpolation(this.points.x, i),
          currentPointY = game.math.bezierInterpolation(this.points.y, i);
    }
    else if (this.options.interpolation == 'catmullrom') {
      var currentPointX = game.math.catmullRomInterpolation(this.points.x, i),
          currentPointY = game.math.catmullRomInterpolation(this.points.y, i);
    }
    else if (this.options.interpolation == 'linear') {
      var currentPointX = game.math.linearInterpolation(this.points.x, i),
          currentPointY = game.math.linearInterpolation(this.points.y, i);
    }

    var dot = game.make.graphics(currentPointX, currentPointY);
        dot.scale.set(0,0);
        dot.beginFill(0xFFFFFF, 1);
        dot.drawCircle(0, 0, 10);
        dot.endFill();
    this.curve.add(dot);

    currentShowTween = game.add.tween(dot.scale).to({ x: 1, y: 1}, 30, Phaser.Easing.Back.Out, false);
    currentHideTween = game.add.tween(dot.scale).to({ x: 0, y: 0}, 30, Phaser.Easing.Back.Out, false);

    lastShowTween.chain(currentShowTween);
    lastHideTween.chain(currentHideTween);

    lastShowTween = currentShowTween;
    lastHideTween = currentHideTween;
  }
  layer.world[1].add(this.curve);


  // create indicator if given
  if ('direction' in this.options.indicator) {
    this.indicator = game.make.sprite(0, -this.height/2, 'indicator');
    this.indicator.anchor.set(0.5, 0.5);

    if ('x' in this.options.indicator) this.indicator.x += this.options.indicator.x;
    if ('y' in this.options.indicator) this.indicator.y += this.options.indicator.y;

    if (this.options.indicator.direction == 'left') {
      this.indicator.x -= this.width/2;
      this.indicator.angle = 90;
    }
    else if (this.options.indicator.direction == 'right') {
      this.indicator.x += this.width/2;
      this.indicator.angle = 180;
    }
    this.addChild(this.indicator);

    this.blink = game.add.tween(this.indicator).to({alpha: 0}, 800, Phaser.Easing.Exponential.InOut, true, 0, -1, true);
  }

  // create siren if given
  if ('left' in this.options.siren) {
    this.sirenLeft = game.make.sprite(0, 0, this.options.siren.left);
    this.sirenLeft.anchor.set(0.5, 0.5);
    this.sirenLeft.alpha = 0;

    if ('x' in this.options.siren) this.sirenLeft.x -= this.options.siren.x;
    if ('y' in this.options.siren) this.sirenLeft.y += this.options.siren.y;
    this.addChild(this.sirenLeft);

    game.add.tween(this.sirenLeft).to({alpha: 1}, 350, Phaser.Easing.Exponential.InOut, true, 200, -1, true).frameBased = true;
  }

  if ('right' in this.options.siren) {
    this.sirenRight = game.make.sprite(0, 0, this.options.siren.right);
    this.sirenRight.anchor.set(0.5, 0.5);
    this.sirenRight.alpha = 0;

    if ('x' in this.options.siren) this.sirenRight.x += this.options.siren.x;
    if ('y' in this.options.siren) this.sirenRight.y += this.options.siren.y;
    this.addChild(this.sirenRight);

    game.add.tween(this.sirenRight).to({alpha: 1}, 350, Phaser.Easing.Exponential.InOut, true, 550, -1, true).frameBased = true;
  }

  // add siren sound
  if ('left' in this.options.siren || 'right' in this.options.siren) {
    this.sirenSound = this.game.add.sound('siren_1', 0.05, true).play();

    this.action.onComplete.add(fadeSiren, this);
    function fadeSiren() {
      game.add.tween(this.sirenSound).to( { volume: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(stopSiren, this);
      function stopSiren() {
        this.sirenSound.stop();
      }
    }
  }


  // warning tween / participant is blinking
  this.warning = game.add.tween(this).to({alpha: 0}, 1, null, false, 0, -1, true);
  this.warning.yoyoDelay(500);
  this.warning.repeatDelay(500);


  // draw interpolation nodes
  if (this.options.debug) {
    var controllPoints = game.add.graphics(0,0);
    for (var i = 0; i < this.points.x.length; i++) {
      controllPoints.beginFill(0xff1500, 1);
      controllPoints.drawCircle(Math.round(this.points.x[i]), Math.round(this.points.y[i]), 15);
      controllPoints.endFill();
    }
  }
};

Participant.prototype = Object.create(Phaser.Sprite.prototype);

Participant.prototype.constructor = Participant;

/**
 * Automatically called while participant is moving
 */
Participant.prototype.updateAction = function(test) {
  // calculte the rotation along the curve
  if (this.previousPosition.x !== this.worldPosition.x && this.previousPosition.y !== this.worldPosition.y)
    this.rotation = game.math.angleBetween(this.previousPosition.x, this.previousPosition.y, this.worldPosition.x, this.worldPosition.y)
    + game.math.degToRad(this.rotationOffset) - this.parent.parent.rotation;
  // could be better
}

/**
 * Automatically called by World.update
 */
Participant.prototype.update = function() {
  //this.selectedMark.x = this.worldPosition.x + Math.cos(this.worldRotation + game.math.degToRad(this.rotationOffset)) * (this.height / 2);
  //this.selectedMark.y = this.worldPosition.y + Math.sin(this.worldRotation + game.math.degToRad(this.rotationOffset)) * (this.height / 2);

  this.selectedMark.rotation -= this.selectedMark.worldRotation;
  if (this.order === 0) this.selectedMarkForbidden.rotation -= this.selectedMarkForbidden.worldRotation;
}

/*
  Approximate Curve/Path Length
*/
Participant.prototype.approximateLength = function() {
  // approximates length for catmull-rom and bezier interpolation
  for (var i = 0; i < 100; i++) {
    var p1 = (i / 100), p2 = (i + 1) / 100,
        point1, point2;

    if (this.options.interpolation == 'bezier') {
      point1 = new Phaser.Point(game.math.bezierInterpolation(this.points.x, p1), game.math.bezierInterpolation(this.points.y, p1)),
      point2 = new Phaser.Point(game.math.bezierInterpolation(this.points.x, p2), game.math.bezierInterpolation(this.points.y, p2));
    }
    else if (this.options.interpolation == 'catmullrom') {
      point1 = new Phaser.Point(game.math.catmullRomInterpolation(this.points.x, p1), game.math.catmullRomInterpolation(this.points.y, p1)),
      point2 = new Phaser.Point(game.math.catmullRomInterpolation(this.points.x, p2), game.math.catmullRomInterpolation(this.points.y, p2));
    }
    else if (this.options.interpolation == 'linear') {
      point1 = new Phaser.Point(game.math.linearInterpolation(this.points.x, p1), game.math.linearInterpolation(this.points.y, p1)),
      point2 = new Phaser.Point(game.math.linearInterpolation(this.points.x, p2), game.math.linearInterpolation(this.points.y, p2));
    }
    this.pathLength += point1.distance(point2);
  }
}


Participant.prototype.over = function () {
  this.showCurve.start();

  if (this.warning.isRunning) {
    this.warning.stop();
    this.alpha = 1;
    this.warning = game.add.tween(this).to({alpha: 0}, 1, null, false, 0, -1, true);
    this.warning.yoyoDelay(500);
    this.warning.repeatDelay(500);
  }
}

Participant.prototype.out = function () {
  this.hideCurve.start();
}

Participant.prototype.deselect = function () {
  this.circle.loadTexture('participantArrow');
  this.selectedMark.fill= '#000000';
  this.selectedMarkForbidden.clear();
  this.selectedMarkForbidden.lineStyle(7, 0x000000);
  this.selectedMarkForbidden.moveTo(-20,20);
  this.selectedMarkForbidden.lineTo(20, -20);
}

Participant.prototype.select = function () {
  this.circle.loadTexture('participantArrowRed');
  this.selectedMark.fill= '#9C272D';
  this.selectedMarkForbidden.clear();
  this.selectedMarkForbidden.lineStyle(7, 0x9C272D);
  this.selectedMarkForbidden.moveTo(-20,20);
  this.selectedMarkForbidden.lineTo(20, -20);

}

Participant.prototype.setOrder = function(order) {
  if (order > 0) {
    this.selectedMark.text = order;
    if (this.order === 0) this.circle.removeChild(this.selectedMarkForbidden);
  }
  else {
    this.selectedMark.text = "";
    if (order === 0) this.circle.addChild(this.selectedMarkForbidden);
  }
  this.order = order;
}


Participant.prototype.checkOrder = function() {
  return this.order === this.orderLevel;
}


Participant.prototype.move = function () {
  this.circle.visible = false;

  this.action.target = this;
  this.action.pendingDelete = false;
  this.action.onUpdateCallback(this.updateAction, this);

  this.action.start();

  if (this.options.frames.length > 0) this.animation.play();

  if ('direction' in this.options.indicator) {
    this.indicator.alpha = 0;
    this.blink.stop();
  }
}


Participant.prototype.reset = function() {
  this.x = this.origin.x;
  this.y = this.origin.y;
  this.rotation = this.direction;

  this.circle.visible = true;

  this.action.stop();

  if (this.options.frames.length > 0) {
    this.animation.stop(true);
    this.frame = this.options.sprite;
  }

  if ('direction' in this.options.indicator) {
    this.indicator.alpha = 1;
    if (!this.blink.isRunning) this.blink = game.add.tween(this.indicator).to({alpha: 0}, 800, Phaser.Easing.Exponential.InOut, true, 0, -1, true);
  }

  if ('left' in this.options.siren || 'right' in this.options.siren) {
    this.sirenSound.volume = 0.05;
    this.sirenSound.play();
  }
}
