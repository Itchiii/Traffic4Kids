var help = function () {
    this.content = {};
};

help.prototype.init = function () {
    // Layers
    layer.world[0] = game.add.group();
    layer.world[1] = game.add.group();
    layer.world[2] = game.add.group();

    layer.interface[0] = game.add.group();
    layer.interface[1] = game.add.group();
    layer.interface[2] = game.add.group();
}

help.prototype.create = function () {
    // Background
    layer.world[0].create(0, 0, 'helpBackground');

    // Sound button
    this.content.soundButton = new SoundButton(game.width - 100, 15);
    layer.world[0].add(this.content.soundButton);

    // play global music if not already started
    if (Global.music === null || !Global.music.isPlaying) Global.player();

    function goToMenu() {
      game.state.start("Menu", true, false);
    }

    var numberHelpPages = Signs.length - 1;
    addContent(0);

    function goToPageForth(contentIndicator) {
      if (contentIndicator + 6 < numberHelpPages) {
        contentIndicator += 6;
        addContent(contentIndicator);
      } else {
        addContent(contentIndicator);
      }
    }

    function goToPageBack(contentIndicator) {
      if (contentIndicator >= 6) {
        contentIndicator -= 6;
        addContent(contentIndicator);
      }
    }


    function addContent(contentIndicator) {
        layer.world[1].removeAll();
        layer.world[2].removeAll();
        layer.interface[0].removeAll();

        // Heading
        this.content.heading = game.make.text(365, 50, 'Verkehrsregeln', {font: "100px Chalk", fill: '#F2F2F2'});
        this.content.line = game.make.image(335, 165, 'underlineChalk');
        layer.world[1].add(this.content.heading);
        layer.world[1].add(this.content.line);

        // Buttons
        this.content.homeButton = game.make.button(game.world.width - 300, 80, 'helpButtonHome', goToMenu);
        layer.interface[0].add(this.content.homeButton);
        function goToMenu() {
            game.state.start("Menu", true, false);
        }

        if (contentIndicator > 5) {
            this.content.backButton = game.make.button(150, game.world.height - 250, 'helpButtonLeft', function () {
                goToPageBack(contentIndicator)
            }, this);
            layer.interface[0].add(this.content.backButton);
        }

        if (contentIndicator + 6 < numberHelpPages) {
            this.content.forthButton = game.make.button(300, game.world.height - 250, 'helpButtonRight', function () {
                goToPageForth(contentIndicator)
            }, this);
            layer.interface[0].add(this.content.forthButton);
        }

        var xOffset = 0, yOffset = 0;
        var indicatingRange = 6;
        if (contentIndicator + 6 < numberHelpPages) {
            indicatingRange = contentIndicator + 6;

        }
        else {
            indicatingRange = contentIndicator + 6 - ((contentIndicator + 6) - Signs.length);
        }

        //noinspection JSAnnotator
        for (let i = contentIndicator; i < indicatingRange; i++) {
            if (i === contentIndicator + 3)
                yOffset = 300;

            this.content.policemen3 = game.make.sprite(944, 220, 'policeman03');
            layer.world[2].add(this.content.policemen3);

            this.content.sign = game.make.button(150 + xOffset, 240 + yOffset, Signs[i].image, function () {
                goToSign(i)
            }, this);
            this.content.sign.scale.setTo(0.5, 0.5);
            layer.world[1].add(this.content.sign);


            xOffset = (xOffset + 290) % 870;
        }
    }

    function goToSign(i) {
        layer.world[1].removeAll();
        layer.world[2].removeAll();
        layer.interface[0].removeAll();

        if (i > 0) {
            j = i - 1;
            this.content.lastPageButton = game.make.button(150, game.world.height - 250, 'helpButtonLeft', function () {
                goToSign(j)
            }, this);
            layer.interface[0].add(this.content.lastPageButton);
        }

        if (i < numberHelpPages) {
            k = i + 1;
            this.content.nextPageButton = game.make.button(300, game.world.height - 250, 'helpButtonRight', function () {
                goToSign(k)
            }, this);
            layer.interface[0].add(this.content.nextPageButton);
        }

        this.content.returnButton = game.make.button(game.world.width - 300, 80, 'helpButtonBack', function () {
            addContent(0)
        }, this);
        layer.interface[0].add(this.content.returnButton);

        this.content.policemen1 = game.make.sprite(1030, 220, 'policeman01');
        layer.world[2].add(this.content.policemen1);

        this.content.headline = game.make.text(0, 0, Signs[i].name, {
            font: "50px Chalk",
            fill: '#F2F2F2'
        });
        this.content.headline.boundsAlignH = 'center';
        this.content.headline.setTextBounds(200, 100, 800, 50);



        this.content.description = game.make.text(550, 235, Signs[i].description, {
            font: "38px Chalk",
            fill: '#F2F2F2',
            wordWrap: 'true',
            wordWrapWidth: '500'
        });
        this.content.image = game.make.sprite(100, 235, Signs[i].image);
        this.content.exampleimage = game.make.sprite(550, 530, Signs[i].descriptionImage);

        layer.world[1].add(this.content.headline);
        layer.world[1].add(this.content.description);

        layer.world[1].add(this.content.image);
        layer.world[1].add(this.content.exampleimage);

        // this.content.helpsign = game.make.sprite(100, 80, 'hilfe' + i);
        // this.content.helpsign.scale.set(1.1, 1.1);
        // layer.world[1].add(this.content.helpsign);
        //this.content.text = game.add.text(235, 235, signs[i].image, {font: "22px Arial", fill: '#ffffff'});
    }

}
help.prototype.shutdown = function () {
    // maybe remove every background from the cache after the level ends/changes

    this.content = {};
}
