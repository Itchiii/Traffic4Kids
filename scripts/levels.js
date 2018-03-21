/*
 participants: x, y, image, order, rotation, speed, options, path
 options:  relative: FALSE | true
 interpolation: 'BEZIER' | 'linear' | 'catmullrom'
 debug: FALSE | true
 sprite: 0 | number
 frames: [] | [spriteNumber1, spriteNumber2, ...]
 framerate: 60 | number
 ease: TRUE | false
 indicator: {direction: 'right', x: -20, y: 15}
 siren: {left: 'sirenBlue', right: 'sirenRed', x: 20, y: 5}
 signs: x, y, signNumber, rotation, mirror
 */

var Levels = [
    /*
     * Level 0
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground01",
            "participants": [
                [400, 605, 'bikeSprite03', 2, 90, 500, {relative: true, interpolation: 'linear', sprite: 1}, [{
                    x: 1300,
                    y: 0
                }]],
                [790, 820, 'emergencyCar02', 1, 90, 500, {
                    relative: true,
                    interpolation: 'linear'
                }, [{x: 0, y: -1000}]]
            ],
            "signs": [
                [900, 700, 1, 0],
                [520, 680, 2, 90],
                [920, 390, 2, 270],
                [540, 370, 1, 0],
            ]
        }
    },
    /*
     * Level 1
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground01",
            "participants": [
                [1110, 465, 'truckSprite02', 1, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 5
                }, [{x: -1300, y: 0}]],
                [400, 605, 'carSprite01', 2, 90, 500, {
                    sprite: 5,
                    indicator: {direction: 'left', x: 15, y: 12}
                }, [{x: 500, y: 605}, {x: 1050, y: 610}, {x: 715, y: 200}, {x: 845, y: 0}, {x: 790, y: -200}]],
                [790, 820, 'carSprite05', 3, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 5
                }, [{x: 0, y: -1000}]],
            ],
            "signs": [
                [900, 700, 2, 0],
                [540, 700, 1, 270],
                [900, 370, 1, 90],
                [540, 370, 2, 180],
            ]
        }
    },
    /*
     * Level 2
     * Radfahrer Vorfahrt
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground02",
            "participants": [
                [1210, 460, 'truckSprite02', 1, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 2
                }, [{x: -1400, y: 0}]],
                [300, 590, 'carSprite01', 2, 90, 500, {
                    sprite: 1,
                    indicator: {direction: 'right', x: -20, y: 15}
                }, [{x: 600, y: 590}, {x: 850, y: 810}, {x: 515, y: 1200}, {x: 645, y: 1500}, {x: 600, y: 2000}]],
                [790, 930, 'carSprite05', 2, 90, 500, {relative: true, interpolation: 'linear', sprite: 1}, [{
                    x: 0,
                    y: -1400
                }]],
                [350, 690, 'bikeSprite02', 1, 90, 500, {relative: true, interpolation: 'linear', sprite: 1}, [{
                    x: 1500,
                    y: 0
                }]],
            ],
            "signs": [
                [1000, 770, 2, 0],
                [440, 770, 1, 180],
                [1000, 280, 1, 180],
                [440, 280, 2, 180],
            ]
        }
    },
    /* Level 3
     * RTW hat Vorfahrt
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground01",
            "participants": [
                [400, 605, 'bikeSprite01', 2, 90, 500, {relative: true, interpolation: 'linear', sprite: 1}, [{
                    x: 1300,
                    y: 0
                }]],
                [790, 820, 'emergencyCar03', 1, 90, 500, {
                    siren: {left: 'sirenBlue', right: 'sirenRed', x: 20, y: -45},
                    relative: true,
                    interpolation: 'linear'
                }, [{x: 0, y: -1000}]],
                [1050, 465, 'carSprite02', 2, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 4
                }, [{x: -1300, y: 0}]],
                // bike [290, 1020, 'bikeSprite01', 1, 90, 300, {relative: true, interpolation: 'linear', sprite: 0, frames: [1]}, [{x: 0, y: -1000}] ],
                // truck [250, 860, 'truckSprite01', 1, 90, 500, {relative: true, sprite: 5}, [{x: 200, y: 0}, {x: 600, y: 100}, {x: -150, y: -600}] ],
            ],
            "signs": [
                [900, 700, 2, 0],
                [540, 700, 1, 270],
                [900, 370, 1, 90],
                [540, 370, 2, 180],
            ]//auch auf der anderen Straßenseite sollte ein Verkehrsschild sein
        }
    },
    /*
     * Level 4
     * rechts vor links
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground06",
            "participants": [
                [1050, 465, 'carSprite03', 1, 90, 500, {
                    relative: true,
                    sprite: 3
                }, [{
                    x: -1300,
                    y: 0

                }


                ]],

                [790, 930, 'carSprite05', 2, 90, 500, {relative: true, interpolation: 'linear', sprite: 5}, [{
                    x: 0,
                    y: -1400
                }]],
                [300, 600, 'bikeSprite01', 3, 90, 500, {relative: true, sprite: 0, frames: [1]}, [{
                    x: 400,
                    y: 0
                }, {
                    x: 100, y: -100
                }, {
                    x: 0, y: -200
                },
                    {
                        x: 0,
                        y: -1000
                    },

                    ]],
            ],
            "signs": []
        }
    },

    /*
     * Level 5
     * Verängung
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground07",
            "participants": [
                [1300, 470, 'carSprite05', 1, 90, 500, {relative: true, sprite: 5},
                    [{x: -1500, y: 0}]],
                [300, 600, 'bikeSprite02', 2, 90, 500, {relative: true, sprite: 1}, [{
                    x: 100,
                    y: 0
                }, {
                    x: 100, y: 0
                }, {
                    x: 100, y: -200
                },
                    {
                        x: 200,
                        y: 0
                    },
                    {
                        x: 100,
                        y: 200
                    },
                    {
                        x: 100,
                        y: 0
                    }, {
                        x: 100,
                        y: 0
                    }
                    , {
                        x: 100,
                        y: 0
                    }

                    , {
                        x: 100,
                        y: 0
                    }

                    , {
                        x: 100,
                        y: 0
                    }

                    , {
                        x: 100,
                        y: 0
                    }


                ]],


            ],
            "signs": []
        }
    },
    /*
     * Level 6
     * Kreisverkehr
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground09",
            "participants": [
                [830, 930, 'carSprite05', 2, 90, 500, {sprite: 5, relative: true},
                    [{x: 20, y: -150}, {x: 50, y: -100}, {x: 100, y: -50}, {x: 700, y: 0}]],

                [500, 700, 'bikeSprite02', 1, 90, 500, {relative: true, sprite: 1}, [{
                    x: 150,
                    y: 100
                }, {x: 150, y: 25}, {x: 100, y: -50}, {x: 100, y: -100}, {x: 100, y: -50}, {x: 500, y: 0}]],


            ],
            "signs": [

                [722, 880, 12, 0],
                [722, 130, 12, 0],
                [300, 540, 12, 90],
                [1150, 540, 12, 180],

            ]
        }
    },


    /*
     * Level 7
     * rechts vor links
     */
    {

        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground06",
            "participants": [

                [650, 250, 'carSprite03', 1, 90, 500, {relative: true, sprite: 0}, [{
                    x: 0,
                    y: 1000

                }]],


                [790, 930, 'carSprite05', 2, 90, 500, {sprite: 5, indicator: {direction: 'right', x: -20, y: 15}},
                    [{x: 790, y: 800}, {x: 790, y: 450}, {x: 1000, y: 600}, {x: 1200, y: 600}, {
                        x: 1400,
                        y: 600
                    }, {x: 1600, y: 600}]],
                //     [350, 600, 'bikeSprite02', 2, 90, 500, {relative: true, interpolation: 'linear', sprite: 1}, [{x: 1500, y: 0}] ],
                [890, 720, 'pedestrianSprite01', 1, 90, 200, {
                    ease: false,
                    relative: true,
                    interpolation: 'linear',
                    sprite: 2,
                    frames: [4, 5, 4, 3, 1, 0, 1, 3],
                    framerate: 10
                }, [{x: 0, y: -400}]],

            ],
            "signs": []
        }
    },


    /*
     * Level 8
     * Verängung
     */
    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground07",
            "participants": [
                [1300, 470, 'carSprite05', 2, 90, 500, {relative: true, sprite: 5},
                    [{x: -1500, y: 0}]],
                [300, 600, 'bikeSprite02', 1, 90, 500, {relative: true, sprite: 1}, [{
                    x: 100,
                    y: 0
                }, {
                    x: 100, y: 0
                }, {
                    x: 100, y: -200
                },
                    {
                        x: 200,
                        y: 0
                    },
                    {
                        x: 100,
                        y: 200
                    },
                    {
                        x: 100,
                        y: 0
                    }, {
                        x: 100,
                        y: 0
                    }
                    , {
                        x: 100,
                        y: 0
                    }

                    , {
                        x: 100,
                        y: 0
                    }

                    , {
                        x: 100,
                        y: 0
                    }

                    , {
                        x: 100,
                        y: 0
                    }


                ]],


            ],
            "signs": [
                [450, 670, 13, 90],
                [1000, 390, 14, 270],

            ]
        }
    },

    /*
     * Level 9
     * Einfahrt verboten
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground01",
            "participants": [
                [790, 800, 'bikeSprite02', 0, 90, 500, {relative: true, interpolation: 'linear', sprite: 1},
                    [{x: 0, y: -1500}]],

                [400, 590, 'carSprite01', 1, 90, 500, {relative: true, interpolation: 'linear', sprite: 1}, [{
                    x: 1300,
                    y: 0
                }]],

            ],
            "signs": [
                [860, 300, 11, 0],
                // [900, 700, 5, 0],
                // [540, 700, 5, 270],
                // [900, 370, 5, 90],
                // [540, 370, 5, 180],
            ]
        }
    },


    /*
     * Level 10
     * Zebrastreifen
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground04",
            "participants": [
                [200, 610, 'bikeSprite02', 2, 90, 500, {relative: true, interpolation: 'linear', sprite: 1},
                    [{x: 1500, y: 0}]],

                [650, 250, 'carSprite01', 2, 90, 500, {sprite: 1, indicator: {direction: 'right', x: -20, y: 15}},
                    [{x: 650, y: 380}, {x: 620, y: 480}, {x: 600, y: 450}, {x: 550, y: 450}, {x: 100, y: 450}, {
                        x: -100,
                        y: 450
                    }]],


                [365, 350, 'pedestrianSprite01', 1, 90, 200, {
                    ease: false,
                    relative: true,
                    interpolation: 'linear',
                    sprite: 2,
                    frames: [4, 5, 4, 3, 1, 0, 1, 3],
                    framerate: 10
                }, [{x: 0, y: 390}]]

            ],
            "signs": [

                [480, 370, 21, 270],
                [250, 690, 21, 90],
            ]
        }
    },

    /*
     * Level 11
     * Zug
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground05",
            "participants": [
                [790, 800, 'bikeSprite02', 2, 90, 500, {relative: true, interpolation: 'linear', sprite: 1},
                    [{x: 0, y: -1500}]],

                [1750, 100, 'train', 1, 270, 500, {relative: true, interpolation: 'linear', sprite: 1},
                    [{x: -3500, y: 0},]],

            ],
            "signs": [
                [870, 220, 22, 0],
            ]
        }
    },
    /*
     * Level 12
     * Drei Straßen
     *
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground10",
            "participants": [
                [790, 800, 'bikeSprite02', 1, 90, 500, {sprite: 2, frames: [1]},
                    [{x: 790, y: 800}, {x: 790, y: 450}, {x: 1000, y: 600}, {x: 1200, y: 600}, {
                        x: 1400,
                        y: 600
                    }, {x: 1600, y: 600}]],

                [400, 590, 'carSprite01', 2, 90, 500, {
                    relative: true,
                    interpolation: 'linear', sprite: 1
                }, [{
                    x: 1300,
                    y: 0
                }]],


                [1110, 465, 'truckSprite02', 1, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 5
                }, [{x: -1300, y: 0}]]


            ],
            "signs": [
                [990, 370, 15, 270],
            ]
        }
    },

    /*
     * Level 13
     * Drei Straßen 2
     * Skizze inhaltlich ident. mit lvl 11
     *
     * Dummy
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground10",
            "participants": [
                [790, 800, 'truckSprite01', 0, 90, 500, {sprite: 1, indicator: {direction: 'right', x: -20, y: 15}},
                    [{x: 790, y: 800}, {x: 790, y: 450}, {x: 1000, y: 600}, {x: 1200, y: 600}, {
                        x: 1400,
                        y: 600
                    }, {x: 1600, y: 600}]],


                [400, 590, 'carSprite01', 1, 90, 500, {relative: true, sprite: 1}, [{
                    x: 200,
                    y: 0
                }, {
                    x: 50,
                    y: 50
                },
                    {
                        x: 0,
                        y: 100
                    },
                    {
                        x: 0,
                        y: 100
                    },
                    {
                        x: 0,
                        y: 1000
                    }

                ]],


                [1110, 465, 'bikeSprite02', 1, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 1
                }, [{x: -1300, y: 0}]]
            ],
            "signs": [
                [500, 700, 17, 90],
                [900, 730, 17, 0, true],
                [1000, 680, 6, 90],
            ]
        }
    },

    /*
     * Level 14
     * RvL an allen 4 Kreuzungen ist nicht eindeutig lösbar.
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground04",
            "participants": [
                [355, 350, 'pedestrianSprite01', 2, 90, 200, {
                    ease: false,
                    relative: true,
                    interpolation: 'linear',
                    sprite: 2,
                    frames: [4, 5, 4, 3, 1, 0, 1, 3],
                    framerate: 10
                }, [{x: 0, y: 390}]],

                [1050, 470, 'emergencyCar01', 1, 90, 500, {
                    siren: {left: 'sirenBlue', right: 'sirenBlue', x: 20, y: -115},
                    relative: true,
                    interpolation: 'linear'
                }, [{x: -1200, y: 0}]]

            ],
            "signs": [
                [480, 370, 21, 270],
                [250, 690, 21, 90],
            ]
        }
    }
    ,

    /*
     * Level 15
     * Drei Straßen 3
     * HS/NS
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground10",
            "participants": [
                [790, 800, 'truckSprite01', 2, 90, 500, {sprite: 1, indicator: {direction: 'right', x: -20, y: 15}},
                    [{x: 790, y: 800}, {x: 790, y: 450}, {x: 1000, y: 600}, {x: 1200, y: 600}, {
                        x: 1400,
                        y: 600
                    }, {x: 1600, y: 600}]],

                [400, 590, 'carSprite01', 1, 90, 500, {relative: true, interpolation: 'linear', sprite: 3}, [{
                    x: 1300,
                    y: 0
                }]],


                [1110, 465, 'bikeSprite02', 1, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 1
                }, [{x: -1300, y: 0}]]


            ],
            "signs": [
                [500, 700, 4, 90],
                [940, 370, 4, 270],
                [940, 700, 2, 0],
            ]
        }
    }
    ,


    /*
     * Level 16
     * Einfahrt für Motorfahrzeuge verboten
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground01",
            "participants": [
                [790, 850, 'truckSprite02', 0, 90, 500, {relative: true, sprite: 2},
                    [{x: 0, y: -1200}]],

                [1110, 465, 'bikeSprite02', 1, 90, 500, {
                    relative: true,
                    interpolation: 'linear',
                    sprite: 1
                }, [{x: -1300, y: 0}]]
            ],
            "signs": [
                [890, 270, 7, 0],
            ]
        }
    }
    ,

    /*
     * Level 17
     * ?
     *
     */

    {
        "score": 0,
        "finished": false,
        "contents": {
            "image": "levelBackground06",
            "participants": [
                [1010, 465, 'bikeSprite02', 1, 90, 500, {
                    relative: true,

                    sprite: 2, frames: [1]
                }, [{x: -200, y: 0}, {x: -50, y: -50}, {x: 0, y: -100}, {x: 0, y: -100}, {x: 0, y: -500}]],

                [400, 590, 'carSprite01', 1, 90, 500, {relative: true, sprite: 1}, [{
                    x: 200,
                    y: 0
                }, {
                    x: 50,
                    y: 50
                },
                    {
                        x: 0,
                        y: 100
                    },
                    {
                        x: 0,
                        y: 100
                    },
                    {
                        x: 0,
                        y: 1000
                    }

                ]],

                [790, 800, 'taxi', 0, 90, 500, {relative: true},
                    [{x: 0, y: -1000}]],

            ],
            "signs": [
                [870, 270, 19, 0],
            ]
        }
    }
    ,


]
