class PlatformDropGame {
  constructor(debug = true) {
    this.spriteData;
    this.spriteImage;
    this.canvas = document.getElementById("platformDropGameCanvas");
    this.context = this.canvas.getContext('2d');
    this.debug = debug;

    this.level = 0;
    this.gameOver = false;
    this.stage = 'waiting';
    this.score = 0;

    const game = this;
    this.loadJSON("games/platformDrop/bucket", function(data) {
      game.spriteData = JSON.parse(data);
      game.spriteImage = new Image();
      game.spriteImage.src = game.spriteData.meta.image;
      game.spriteImage.onload = function() {
        game.init();
        game.refresh();
      }
    });
  }

  loadJSON(json, callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', json + '.json', true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  init() {

    this.gameOver = false;
    // console.log(`level of latform drop = ${this.level}`);
    // create an engine
    const Bodies = Matter.Bodies;
    const Events = Matter.Events;
    const Constraint = Matter.Constraint;

    this.engine = Matter.Engine.create();

    let bodies = [];
    let sprites = [];
    let pins = [];
    let body;
    const frame = this.spriteData.frames[0].frame;
    const scale = 0.5;
    const fps = 12;
    const game = this;
    this.anims = [];
    this.anims.push(new Anim("ambient", {
      frameData: this.spriteData.frames,
      frames: [0],
      fps: fps
    }));
    this.anims.push(new Anim("walk", {
      frameData: this.spriteData.frames,
      frames: [0, "..", 7],
      fps: fps
    }));
    this.anims.push(new Anim("fall", {
      frameData: this.spriteData.frames,
      frames: [16, 17],
      loop: false,
      fps: fps
    }));
    this.anims.push(new Anim("crash", {
      frameData: this.spriteData.frames,
      frames: [18, "..", 30],
      loop: false,
      oncomplete: function() {
        game.bucket.anim = "ambient";
        Matter.Body.setAngle(game.bucket.physicsBody, 0);
      },
      fps: fps
    }));
    this.anims.push(new Anim("pour", {
      frameData: this.spriteData.frames,
      frames: [0, 0, 0, 0, 0, 0, 35, "..", 40],
      loop: false,
      fps: fps
    }));

    // categotries apply to options passed to body below
    const defaultCategory = 0x0001;
    const draggableCategory = 0x0002;

    body = Bodies.rectangle(50, 100, frame.w * scale, frame.h * scale, {
      label: "bucket",
      collisionFilter: {
        category: draggableCategory
      },
      friction: 0.0001
    });
    const options = {
      context: this.context,
      image: this.spriteImage,
      anchor: new Vertex(0.5, 0.95),
      scale: scale,
      physicsBody: body,
      anims: this.anims
    }
    this.bucket = new AnimSprite("bucket", options);
    this.bucket.anim = "ambient";
    sprites.push(this.bucket);
    bodies.push(body);

    this.sprites = sprites;

    // angelabelle: create 5 levels (0-4) with different platform placements
    if (this.level == 0) {
      bodies.push(Bodies.rectangle(300, 458, 603, 45, {
        isStatic: true,
        label: "floor",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Floor
      bodies.push(Bodies.rectangle(90, 113, 180, 8, {
        collisionFilter: {
          category: defaultCategory
        }
      }));
      bodies.push(Bodies.rectangle(15, 131, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of bucket platform
      bodies.push(Bodies.rectangle(128, 131, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of bucket platform
      bodies.push(Bodies.rectangle(-23, 225, 40, 400, {
        isStatic: true,
        collisionFilter: {
          category: defaultCategory
        }
      })); //Left side
      bodies.push(Bodies.rectangle(300, 150, 300, 8, {
        collisionFilter: {
          category: defaultCategory
        }
      }));
      bodies.push(Bodies.rectangle(195, 165, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of middle platform
      bodies.push(Bodies.rectangle(420, 165, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of middle platform
      bodies.push(Bodies.rectangle(450, 210, 8, 8, {
        isStatic: true,
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of middle platform
      bodies.push(Bodies.rectangle(510, 225, 165, 22.5, {
        isStatic: true,
        label: "exit platform",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath platform
      bodies.push(Bodies.rectangle(570, 203, 60, 22.5, {
        isStatic: true,
        label: "bath",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath
      bodies.push(Bodies.rectangle(596, 225, 8, 400, {
        isStatic: true,
        label: "right",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Right side
    } else if (this.level == 1) {
      bodies.push(Bodies.rectangle(300, 458, 603, 45, {
        isStatic: true,
        label: "floor",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Floor
      bodies.push(Bodies.rectangle(100, 111, 187, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //first platform

      bodies.push(Bodies.rectangle(17, 130, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of bucket platform
      bodies.push(Bodies.rectangle(127, 130, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of bucket platform

      bodies.push(Bodies.rectangle(157, 155, 9, 9, {
        isStatic: true,
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports after drop first platform

      bodies.push(Bodies.rectangle(291, 187, 105, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //second platform
      bodies.push(Bodies.rectangle(263, 206, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of second platform
      bodies.push(Bodies.rectangle(340, 206, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of second platform

      bodies.push(Bodies.rectangle(245, 216, 9, 9, {
        isStatic: true,
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports after drop second platform

      bodies.push(Bodies.rectangle(198, 272, 245, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //third platform
      bodies.push(Bodies.rectangle(79, 290, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of third platform
      bodies.push(Bodies.rectangle(224, 290, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of third platform
      bodies.push(Bodies.rectangle(400, 331, 176, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //fourth platform
      bodies.push(Bodies.rectangle(314, 350, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of third platform
      bodies.push(Bodies.rectangle(456, 350, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of third platform

      bodies.push(Bodies.rectangle(520, 402, 161, 23.5, {
        isStatic: true,
        label: "exit platform",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath platform

      // angelabelle: i changed just this one to test if switch was working
      bodies.push(Bodies.rectangle(570.5, 379, 59.3, 23.5, {
        isStatic: true,
        label: "bath",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath
      bodies.push(Bodies.rectangle(597, 225, 7, 392.5, {
        isStatic: true,
        label: "right",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Right side

    } else if (this.level == 2) {
      bodies.push(Bodies.rectangle(300, 458, 603, 45, {
        isStatic: true,
        label: "floor",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Floor
      bodies.push(Bodies.rectangle(141, 102, 245, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //first platform

      bodies.push(Bodies.rectangle(16, 121, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of first platform
      bodies.push(Bodies.rectangle(236, 121, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of first platform
      bodies.push(Bodies.rectangle(216, 150, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports middle of first platform

      bodies.push(Bodies.rectangle(397, 141, 270, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //second platform
      bodies.push(Bodies.rectangle(318, 160, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of second platform
      bodies.push(Bodies.rectangle(534, 160, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of second platform

      bodies.push(Bodies.rectangle(306, 215, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports after drop of second platform
      bodies.push(Bodies.rectangle(211, 234, 154.5, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //third platform
      bodies.push(Bodies.rectangle(130, 252, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of third platform
      bodies.push(Bodies.rectangle(260, 252, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of third platform
      bodies.push(Bodies.rectangle(358, 281, 154, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //fourth platform
      bodies.push(Bodies.rectangle(278, 300, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of fourth platform
      bodies.push(Bodies.rectangle(407, 300, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of fourth platform

      bodies.push(Bodies.rectangle(474, 328, 91, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //fifth platform
      bodies.push(Bodies.rectangle(423, 347, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of fourth platform
      bodies.push(Bodies.rectangle(496, 347, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of fourth platform

      bodies.push(Bodies.rectangle(527, 376, 154, 23.5, {
        isStatic: true,
        label: "exit platform",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath platform

      // angelabelle: i changed just this one to test if switch was working
      bodies.push(Bodies.rectangle(582, 351, 43.5, 23.5, {
        isStatic: true,
        label: "bath",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath
      bodies.push(Bodies.rectangle(597, 238, 7, 392.5, {
        isStatic: true,
        label: "right",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Right side
    } else if (this.level == 3) {


      bodies.push(Bodies.rectangle(300, 458, 603, 45, {
        isStatic: true,
        label: "floor",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Floor
      bodies.push(Bodies.rectangle(62, 125, 88, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //first platform

      bodies.push(Bodies.rectangle(15, 144, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of first platform
      bodies.push(Bodies.rectangle(106, 144, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of first platform

      bodies.push(Bodies.rectangle(139, 170, 88, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //second platform

      bodies.push(Bodies.rectangle(92, 188, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of first platform
      bodies.push(Bodies.rectangle(183, 188, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of first platform

      bodies.push(Bodies.rectangle(217, 214, 88, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //third platform
      bodies.push(Bodies.rectangle(170, 233, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of third platform
      bodies.push(Bodies.rectangle(261, 233, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of third platform
      bodies.push(Bodies.rectangle(293, 259, 88, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //fourth platform
      bodies.push(Bodies.rectangle(245, 278, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of fourth platform
      bodies.push(Bodies.rectangle(337, 278, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of fourth platform

      bodies.push(Bodies.rectangle(371, 303, 88, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //fifth platform
      bodies.push(Bodies.rectangle(324, 322, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of fifth platform
      bodies.push(Bodies.rectangle(415, 322, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of fifth platform
      bodies.push(Bodies.rectangle(447, 348, 88, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //sixth platform
      bodies.push(Bodies.rectangle(400, 367, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of sixth platform
      bodies.push(Bodies.rectangle(492, 367, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of sixth platform

      bodies.push(Bodies.rectangle(527, 400, 154, 23.5, {
        isStatic: true,
        label: "exit platform",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath platform

      // angelabelle: i changed just this one to test if switch was working
      bodies.push(Bodies.rectangle(582, 376, 43.5, 23.5, {
        isStatic: true,
        label: "bath",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath
      bodies.push(Bodies.rectangle(597, 238, 7, 392.5, {
        isStatic: true,
        label: "right",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Right side
    } else if (this.level == 4) {


      bodies.push(Bodies.rectangle(300, 458, 603, 45, {
        isStatic: true,
        label: "floor",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Floor
      bodies.push(Bodies.rectangle(90, 102, 176, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //first platform

      bodies.push(Bodies.rectangle(16, 121, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of first platform
      bodies.push(Bodies.rectangle(125, 121, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of first platform

      bodies.push(Bodies.rectangle(235, 157, 125, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //second platform

      bodies.push(Bodies.rectangle(171, 175, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of first platform
      bodies.push(Bodies.rectangle(253, 175, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of first platform

      bodies.push(Bodies.rectangle(377, 157, 154, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //third platform
      bodies.push(Bodies.rectangle(436, 148, 9, 9, {
        isStatic: true,
        collisionFilter: {
          category: defaultCategory
        }
      })); //cube on third platform
      bodies.push(Bodies.rectangle(329, 176, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of third platform
      bodies.push(Bodies.rectangle(454, 175, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of third platform
      bodies.push(Bodies.rectangle(338, 243, 215, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //fourth platform
      bodies.push(Bodies.rectangle(260, 262, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of fourth platform
      bodies.push(Bodies.rectangle(422, 262, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of fourth platform
      bodies.push(Bodies.rectangle(508, 309, 173, 23.5, {
        isStatic: true,
        label: "exit platform",
        collisionFilter: {
          category: defaultCategory
        }
      })); //exit platform
      bodies.push(Bodies.rectangle(447, 293, 9, 9, {
        isStatic: true,
        collisionFilter: {
          category: defaultCategory
        }
      })); //cube on exit platform
      // angelabelle: i changed just this one to test if switch was working
      bodies.push(Bodies.rectangle(570, 285, 49, 23.5, {
        isStatic: true,
        label: "bath",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath
      bodies.push(Bodies.rectangle(597, 238, 7, 392.5, {
        isStatic: true,
        label: "right",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Right side
    } else if (this.level == 5) {


      bodies.push(Bodies.rectangle(300, 458, 603, 45, {
        isStatic: true,
        label: "floor",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Floor
      bodies.push(Bodies.rectangle(96.5, 102, 176.5, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //first platform

      bodies.push(Bodies.rectangle(16, 121, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of first platform
      bodies.push(Bodies.rectangle(125, 121, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of first platform

      bodies.push(Bodies.rectangle(206, 161, 102, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //second platform

      bodies.push(Bodies.rectangle(163, 179, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports left end of first platform
      bodies.push(Bodies.rectangle(254, 180, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of first platform

      bodies.push(Bodies.rectangle(347, 161, 176.5, 9, {
        collisionFilter: {
          category: defaultCategory
        }
      })); //third platform

      bodies.push(Bodies.rectangle(435, 179.5, 30, 30, {
        isStatic: true,
        label: "clickable",
        collisionFilter: {
          category: defaultCategory
        }
      })); //supports right end of third platform



      bodies.push(Bodies.rectangle(508, 228, 173, 23.5, {
        isStatic: true,
        label: "exit platform",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath platform

      // angelabelle: i changed just this one to test if switch was working
      bodies.push(Bodies.rectangle(570, 205, 49, 23.5, {
        isStatic: true,
        label: "bath",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Bath

      bodies.push(Bodies.rectangle(597, 238, 7, 392.5, {
        isStatic: true,
        label: "right",
        collisionFilter: {
          category: defaultCategory
        }
      })); //Right side
    }

    // add all of the bodies to the world
    Matter.World.add(this.engine.world, bodies);
    // add all of the pins to the world
    Matter.World.add(this.engine.world, pins);

    //Allow dragging of non-static bodies
    const mouseConstraint = Matter.MouseConstraint.create(this.engine, { //Create Constraint
      element: this.canvas,
      constraint: {
        render: {
          visible: true
        },
        stiffness: 0.8
      }
    });
    mouseConstraint.collisionFilter.mask = draggableCategory;
    Matter.World.add(this.engine.world, mouseConstraint);

    // const game = this;
    function down(evt) {
      game.mousedown(evt);
    }

    if ('ontouchstart' in window) {
      this.canvas.addEventListener("touchstart", down);
    } else {
      this.canvas.addEventListener("mousedown", down);
    }

    Events.on(mouseConstraint, 'startdrag', function(event) {
      // console.log(event);
      if (event.body.label != "bucket") Events.trigger(mouseConstraint, 'enddrag');
    });

    Events.on(this.engine, 'collisionStart', function(event) {
      const pairs = event.pairs;

      for (let pair of pairs) {
        let bucket;
        let platform;
        if (pair.bodyA === game.bucket.physicsBody) {
          bucket = pair.bodyA;
          platform = pair.bodyB;
        } else if (pair.bodyB === game.bucket.physicsBody) {
          bucket = pair.bodyB;
          platform = pair.bodyA;
        }
        if (bucket != undefined) {
          game.bucket.supported = true;
          if (platform.label == "floor" && game.gameOver == false) {
            game.bucket.anim = "crash";
            game.gameOver = true;
            setTimeout(function() {
              game.stage = "gameOver";
              game.level = (game.level + 1) % 6;
              // game.level = Math.floor((Math.random() * 6));
              game.init();
              // game.newScene();
            }, 1500);

          } else if (platform.label == "bath" && game.gameOver == false) {
            game.score = 50;
            game.bucket.anim = "pour";
            game.gameOver = true;
            setTimeout(function() {
              game.stage = "youWon";
              game.level = (game.level + 1) % 6;
              // game.level = Math.floor((Math.random() * 6));
              game.init();
              // game.newScene();
            }, 1500);
          }
        }
      }
    })

    Events.on(this.engine, 'collisionEnd', function(event) {
      const pairs = event.pairs;

      for (let pair of pairs) {
        let bucket;
        let platform;
        if (pair.bodyA === game.bucket.physicsBody) {
          bucket = pair.bodyA;
          platform = pair.bodyB;
        } else if (pair.bodyB === game.bucket.physicsBody) {
          bucket = pair.bodyB;
          platform = pair.bodyA;
        }
        if (bucket != undefined) {
          //console.log("Bucket collides with " + platform.label);
          game.bucket.supported = false;
        }
      }
    })

    Events.on(this.engine, 'collisionActive', function(event) {
      const pairs = event.pairs;

      for (let pair of pairs) {

        if (pair.bodyA === game.bucket.physicsBody) {

        } else if (pair.bodyB === game.bucket.physicsBody) {

        }
      }
    })

    // run the engine
    Matter.Engine.run(this.engine);
  }

  refresh() {
    const game = this;
    window.requestAnimationFrame(function() {
      game.refresh()
    });
    const now = Date.now();
    if (this.lastTime == null) this.lastTime = now;
    const dt = (now - this.lastTime) / 1000.0
    this.update(dt);
    this.render();
    this.lastTime = now;
  }

  update(dt) {
    const velocity = this.bucket.physicsBody.velocity;
    //console.log(`Bucket update ${velocity.x.toFixed(1)}, ${velocity.y.toFixed(1)}`);

    const animName = this.bucket.animName;

    if (animName != "crash" && animName != "pour") {
      if (velocity.x < 1) {
        this.bucket.anim = "ambient";
      } else if (velocity.x > 1) {
        this.bucket.anim = "walk";
      }

      if (!this.bucket.supported && velocity.y > 1) {
        this.bucket.anim = "fall";
      }
    }

    this.bucket.update(dt);
  }

  debugPhysics(bodies, constraints) {
    this.context.beginPath();

    for (let body of bodies) {
      const vertices = body.vertices;

      this.context.moveTo(vertices[0].x, vertices[0].y);

      for (let vertex of vertices) {
        this.context.lineTo(vertex.x, vertex.y);
      }

      this.context.lineTo(vertices[0].x, vertices[0].y);
    }

    this.context.lineWidth = 1;
    this.context.strokeStyle = '#999';
    this.context.stroke();

    this.context.beginPath();

    for (let constraint of constraints) {
      switch (constraint.render.type) {
        case "pin":
          this.context.moveTo(constraint.pointB.x, constraint.pointB.y);
          this.context.arc(constraint.pointB.x, constraint.pointB.y, 2, 0, 2 * Math.PI);
          let pos = Matter.Vector.add(constraint.bodyA.position, constraint.pointA);
          this.context.arc(pos.x, pos.y, 2, 0, 2 * Math.PI);
          break;
      }
    }

    this.context.lineWidth = 1;
    this.context.strokeStyle = '#933';
    this.context.stroke();
  }

  render() {
    let bodies = Matter.Composite.allBodies(this.engine.world);
    let constraints = Matter.Composite.allConstraints(this.engine.world);

    if (this.stage == 'waiting') {
      // do nothing
    } else if (this.stage == 'intro') {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // // display placeholder title
      // this.context.font = "60px Verdana";
      // this.context.fillStyle = "#ACD02D";
      // let str = "PLATFORM DROP";
      // let txt = this.context.measureText(str);
      // let left = (this.canvas.width - txt.width) / 2;
      // let top = this.canvas.height / 3;
      // this.context.fillText("PLATFORM DROP", left, top);
      //
      // // display instructions
      // this.context.font = "24px Courier";
      // this.context.fillStyle = "#ACD02D";
      // let maxWidthInst = 400;
      // let lineHeightInst = 25;
      // let xInst = (canvas.width - maxWidthInst) / 2;
      // let yInst = this.canvas.height * 2 / 3;
      //
      // let textInst = 'Instructions: Click on PINK blocks to guide your Gotchi to the prize.';
      //
      //
      // this.wrapText(this.context, textInst, xInst, yInst, maxWidthInst, lineHeightInst);


    } else if (this.stage == 'play') {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //draw background
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.sprites.length; i++) {
        this.sprites[i].render(this.context);
      }

      if (this.debug) this.debugPhysics(bodies, constraints);
    } else if (this.stage == 'gameOver') {
      //clear previous
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //draw background
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // display placeholder GameOver
      this.context.font = "60px Verdana";
      this.context.fillStyle = "#ACD02D";
      let str = "GAME OVER";
      let txt = this.context.measureText(str);
      let left = (this.canvas.width - txt.width) / 2;
      let top = this.canvas.height / 2;
      this.context.fillText("GAME OVER", left, top);
    } else if (this.stage == 'youWon') {
      //clear previous
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //draw background
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // display placeholder GameOver
      this.context.font = "60px Verdana";
      this.context.fillStyle = "#ACD02D";
      let str = "YOU WON";
      let txt = this.context.measureText(str);
      let left = (this.canvas.width - txt.width) / 2;
      let top = this.canvas.height / 2;
      this.context.fillText("YOU WON", left, top);

    }

  }

  // wrapText(context, text, x, y, maxWidth, lineHeight) {
  //   let words = text.split(' ');
  //   let line = '';
  //
  //   for (let n = 0; n < words.length; n++) {
  //     let testLine = line + words[n] + ' ';
  //     let metrics = context.measureText(testLine);
  //     let testWidth = metrics.width;
  //     if (testWidth > maxWidth && n > 0) {
  //       context.fillText(line, x, y);
  //       line = words[n] + ' ';
  //       y += lineHeight;
  //     } else {
  //       line = testLine;
  //     }
  //   }
  //   context.fillText(line, x, y);
  // }

  getMousePos(evt) {
    const rect = this.canvas.getBoundingClientRect();
    const scale = {
      x: this.canvas.width / rect.width,
      y: this.canvas.height / rect.height
    };
    const clientX = evt.targetTouches ? evt.targetTouches[0].clientX : evt.pageX;
    const clientY = evt.targetTouches ? evt.targetTouches[0].clientY : evt.pageY;
    return new Vertex((clientX - rect.left) * scale.x, (clientY - rect.top) * scale.y);

    // let clientX = evt.targetTouches ? evt.targetTouches[0].pageX : evt.pageX;
    // let clientY = evt.targetTouches ? evt.targetTouches[0].pageY : evt.pageY;
    // return new Vertex(clientX - this.canvas.offsetLeft, clientY - this.canvas.offsetTop);
  }

  mousedown(evt) {
    evt.preventDefault();


    const mousePos = this.getMousePos(evt);

    const bodies = Matter.Composite.allBodies(this.engine.world);

    for (let body of bodies) {
      if (body.label != "clickable") continue;
      if (Matter.Bounds.contains(body.bounds, mousePos)) {
        for (let j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {

          const part = body.parts[j];
          if (Matter.Vertices.contains(part.vertices, mousePos)) {
            Matter.Composite.remove(this.engine.world, body);
            break;
          }
        }
      }
    }
  }
}
