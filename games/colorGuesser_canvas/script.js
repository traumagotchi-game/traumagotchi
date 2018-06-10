// JavaScript Document
class Game {
  constructor() {
    this.canvas = document.getElementById("colorGuesserGameCanvas");
    this.context = this.canvas.getContext("2d");
    // this.scaleFactor = 3/4;
    this.stage = 'play';
    this.lastRefreshTime = Date.now();
    this.sinceLastSpawn = 0;
    this.colorArray = [];
    this.rectArray = [];
    this.sprites = [];
    this.cellSize = 128;
    this.score = 0;
    this.spriteData;
    this.spriteImage;
    this.flowers = [];
    this.audioContext = new(window.AudioContext || window.webkitAudioContext)();
    this.correctSfx = new SFX({
      context: this.audioContext,
      src: {
        mp3: "gliss.mp3",
        webm: "gliss.webm"
      },
      loop: false,
      volume: 0.3
    });
    this.wrongSfx = new SFX({
      context: this.audioContext,
      src: {
        mp3: "boing.mp3",
        webm: "boing.webm"
      },
      loop: false,
      volume: 0.3
    });
    this.dropSfx = new SFX({
      context: this.audioContext,
      src: {
        mp3: "swish.mp3",
        webm: "swish.webm"
      },
      loop: false,
      volume: 0.3
    });
    const game = this;
    this.loadJSON("flowers", function(data, game) {
      game.spriteData = JSON.parse(data);
      game.spriteImage = new Image();
      game.spriteImage.src = game.spriteData.meta.image;
      game.spriteImage.onload = function() {
        game.init();
      }
    })
  }

  loadJSON(json, callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', json + '.json', true);
    const game = this;
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText, game);
      }
    };
    xobj.send(null);
  }

  init() {
    const sourceSize = this.spriteData.frames[0].sourceSize;
    this.gridSize = {
      rows: 4,
      cols: 4,
      width: this.cellSize,
      height: this.cellSize
      // rows: 7,
      // cols: 7,
      // width: sourceSize.w,
      // height: sourceSize.h
    };
    const topleft = {
      x: 100,
      y: 40
    };
    this.spawnInfo = {
      count: 0,
      total: 0
    }
    this.flowers = [];
    for (let row = 0; row < this.gridSize.rows; row++) {
      let y = row * this.gridSize.height + topleft.y;
      // this.flowers.push([]);
      this.rectArray.push([]);
      for (let col = 0; col < this.gridSize.cols; col++) {
        let x = col * this.gridSize.width + topleft.x;
        const sprite = this.spawn(x, y);
        this.rectArray[row].push(sprite)
        this.spawnInfo.total++;
      }
    }
    this.gridSize.topleft = topleft;
    const game = this;
    if ('ontouchstart' in window) {
      this.canvas.addEventListener("touchstart", function(event) {
        game.tap(event);
      });
    } else {
      this.canvas.addEventListener("mousedown", function(event) {
        game.tap(event);
      });
    }
    this.state = "spawning";
    this.refresh();
  }

  refresh() {
    const now = Date.now();
    const dt = (now - this.lastRefreshTime) / 1000.0;

    this.update(dt);
    this.render();

    this.lastRefreshTime = now;

    const game = this;
    requestAnimationFrame(function() {
      game.refresh();
    });
  };

  update(dt) {
    // let removed;
    // do {
    //   removed = false;
    //   let i = 0;
    //   for (let sprite of this.sprites) {
    //     if (sprite.kill) {
    //       this.sprites.splice(i, 1);
    //       this.clearGrid(sprite);
    //       removed = true;
    //       break;
    //     }
    //     i++;
    //   }
    // } while (removed);

    // switch (this.state) {
    //   case "spawning":
    //     if (this.spawnInfo.count == this.spawnInfo.total) {
    //       delete this.spawnInfo;
    //       this.state = "ready";
    //     }
    //     break;
    //   case "removing":
    //     if (this.removeInfo.count == this.removeInfo.total) {
    //       delete this.removeInfo;
    //       this.removeGridGaps();
    //       this.state = "dropping";
    //       this.dropSfx.play();
    //     }
    //     break;
    //   case "dropping":
    //     if (this.dropInfo.count == this.dropInfo.total) {
    //       delete this.dropInfo;
    //       this.state = "ready";
    //     }
    //     break;
    // }

    // for (let sprite of this.sprites) {
    //   if (sprite == null) continue;
    //   sprite.update(dt);
    // }
  }

  // clearGrid(sprite) {
  //   for (let row of this.flowers) {
  //     let col = row.indexOf(sprite);
  //     if (col != -1) {
  //       //Found it
  //       row[col] = null;
  //       return true;
  //     }
  //   }
  //   return false; //sprite not found
  // }
  //
  // removeGridGaps() {
  //   this.dropInfo = {
  //     count: 0,
  //     total: 0
  //   };
  //
  //   for (let col = 0; col < this.flowers[0].length; col++) {
  //     let row;
  //     let count;
  //     for (row = this.flowers.length - 1; row >= 0; row--) {
  //       if (this.flowers[row][col] == null) {
  //         //Find the first non-null cell above and pull it down to this cell
  //         count = 0;
  //         for (let r = row - 1; r >= 0; r--) {
  //           var sprite = this.flowers[r][col];
  //           count++;
  //           if (sprite != null) {
  //             //Swap the array items
  //             [this.flowers[row][col], this.flowers[r][col]] = [this.flowers[r][col], this.flowers[row][col]];
  //             sprite.initDrop(this.gridSize.topleft.y + this.gridSize.height * row);
  //             break;
  //           }
  //         }
  //       }
  //     }
  //     for (row = this.flowers.length - 1; row >= 0; row--) {
  //       if (this.flowers[row][col] == null) {
  //         break;
  //       }
  //     }
  //     for (let r = row; r >= 0; r--) {
  //       let x = col * this.gridSize.width + this.gridSize.topleft.x;
  //       let y = this.gridSize.topleft.y - this.gridSize.height * (row - r + 1);
  //       const sprite = this.spawn(x, y);
  //       this.flowers[r][col] = sprite;
  //       sprite.initDrop(this.gridSize.topleft.y + r * this.gridSize.height);
  //     }
  //   }
  // }
  //
  // spawn(x, y) {
  //   const index = Math.floor(Math.random() * 5);
  //   const frameData = this.spriteData.frames[index];
  //   const s = new Sprite({
  //     game: this,
  //     context: this.context,
  //     x: x,
  //     y: y,
  //     index: index,
  //     width: frameData.sourceSize.w,
  //     height: frameData.sourceSize.h,
  //     frameData: frameData,
  //     anchor: {
  //       x: 0.5,
  //       y: 0.5
  //     },
  //     image: this.spriteImage,
  //     json: this.spriteData,
  //     states: {
  //       spawn: {
  //         duration: 0.5
  //       },
  //       static: {
  //         duration: 1.5
  //       },
  //       die: {
  //         duration: 0.8
  //       },
  //       drop: {
  //         moveY: 450
  //       }
  //     }
  //   });
  //
  //   this.sprites.push(s);
  //   this.sinceLastSpawn = 0;
  //
  //   return s;
  // }

  render() {
    if (this.stage == 'intro') {
			this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

			// display placeholder
			this.context.font = "60px Verdana";
			this.context.fillStyle = "#ACD02D";
			let str = "COLLAPSE";
			let txt = this.context.measureText(str);
			let left = (this.canvas.width - txt.width)/2;
			let top = this.canvas.height/2;
			this.context.fillText("COLLAPSE", left, top);

    } else if (this.stage == 'play') {
      //clear previous
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //draw background
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


      // for (let sprite of this.sprites) sprite.render();
      for (let rect of this.rectArray) rect.render();

			//display score
      this.context.font = "20px Verdana";
      this.context.fillStyle = "#ACD02D";
      let str = "Score";
      let txt = this.context.measureText(str);
      let left = (this.gridSize.topleft.x - 32 - txt.width) / 2;
      this.context.fillText("Score", left, 30);

      this.context.font = "30px Verdana";
      this.context.fillStyle = "#ACD02D";
      str = String(this.score);
      txt = this.context.measureText(str);
      left = (this.gridSize.topleft.x - 32 - txt.width) / 2;
      this.context.fillText(this.score, left, 65);
    }
  }

  getMousePos(evt) {
    const rect = this.canvas.getBoundingClientRect();
    const scale = {
      x: this.canvas.width / rect.width,
      y: this.canvas.height / rect.height
    };
    const clientX = evt.targetTouches ? evt.targetTouches[0].clientX : evt.pageX;
    const clientY = evt.targetTouches ? evt.targetTouches[0].clientY : evt.pageY;
    return {
      x: (clientX - rect.left) * scale.x,
      y: (clientY - rect.top) * scale.y
    };
  }

  // getConnectedSprites(index, row, col, connected = []) {
  //   const sprite = this.flowers[row][col];
  //   const grid = this.flowers;
  //
  //   try {
  //     if (sprite.index == index && !sprite.checked) {
  //       connected.push(sprite);
  //       sprite.checked = true;
  //       //this.flowers[row][col] = null;
  //
  //       for (let r = row - 1; r <= row + 1; r++) {
  //         if (!boundaryCheck(r, 0)) continue;
  //         for (let c = col - 1; c <= col + 1; c++) {
  //           if (!boundaryCheck(r, c)) continue;
  //           connected.concat(this.getConnectedSprites(index, r, c, connected));
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.log(`Problem with ${row},`)
  //   }
  //   sprite.checked = true;
  //   //console.log(`getConnectedSprites ${row},${col},${connected.length}`);
  //
  //   return connected;
  //
  //   function boundaryCheck(row, col) {
  //     if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return false;
  //     return true;
  //   }
  // }

  tap(evt) {
    if (this.state != "ready") return;

    const mousePos = this.getMousePos(evt);
    const canvasScale = this.canvas.width / this.canvas.offsetWidth;
    const loc = {};

    loc.x = mousePos.x * canvasScale;
    loc.y = mousePos.y * canvasScale;

    for (let sprite of this.sprites) {
      if (sprite.hitTest(loc)) {
        //Need to find this sprite in the flowers grid
        let row, col, found = false;
        //First put flags to show if they have been checked
        for (let sprite of this.sprites) sprite.checked = false;
        let i = 0;
        for (row of this.flowers) {
          col = row.indexOf(sprite);
          if (col != -1) {
            //Found it
            row = i;
            found = true;
            break;
          }
          i++;
        }
        if (found) {
          const connected = this.getConnectedSprites(sprite.index, row, col);
          if (connected.length >= 3) {
            this.correctSfx.play();
            for (let sprite of connected) {
              sprite.state = sprite.states.die;
            }
            this.score += connected.length;
            this.state = "removing";
            this.removeInfo = {
              count: 0,
              total: connected.length
            };
          } else {
            this.wrongSfx.play();
          }
        }
      }
    }
  }
}

class Sprite {
  constructor(options) {
    this.game = options.game;
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.json = options.json;
    this.index = options.index;
    this.x = options.x;
    this.y = options.y;
    this.frameData = options.frameData;
    this.anchor = (options.anchor == null) ? {
      x: 0.5,
      y: 0.5
    } : options.anchor;
    this.states = options.states;
    this.state = this.states.spawn;
    this.scale = (options.scale == null) ? 1.0 : options.scale;
    this.opacity = (options.opacity == null) ? 1.0 : options.opacity;
    this.currentTime = 0;
    this.kill = false;
  }

  set state(value) {
    this.currentTime = 0;
    this._state = value;
  }

  get state() {
    if (this._state == undefined) this.state = this.states.static;
    return this._state;
  }

  initDrop(y) {
    this.state = this.states.drop;
    this.targetY = y;
    this.game.dropInfo.total++;
  }

// for sprite
  update(dt) {
    const state = this.state;

    this.currentTime += dt;
    let delta = this.currentTime / state.duration;
    if (delta >= 1) {
      if (state == this.states.die) {
        if (!this.kill) this.game.removeInfo.count++;
        this.kill = true;
      }
      if (state == this.states.spawn) {
        this.state = this.states.static;
        this.game.spawnInfo.count++;
      }
      delta = 1;
    }

    switch (state) {
      case this.states.spawn:
        //scale and fade in
        this.scale = delta;
        this.opacity = delta;
        this.frameData = this.game.spriteData.frames[5];
        break;
      case this.states.static:
        this.scale = 1.0;
        this.opacity = 1.0;
        this.frameData = this.game.spriteData.frames[this.index];
        break;
      case this.states.die:
        this.scale = 1.0 + delta;
        this.opacity = 1.0 - delta;
        this.frameData = this.game.spriteData.frames[5];
        break;
      case this.states.drop:
        this.y += (state.moveY * dt);
        if (this.y > this.targetY) {
          this.y = this.targetY;
          this.state = this.states.static;
          this.game.dropInfo.count++;
        }
        this.frameData = this.game.spriteData.frames[this.index];
        break;
    }
  }

// for sprite
  render() {
    // Draw the animation
    const alpha = this.context.globalAlpha;

    this.context.globalAlpha = this.opacity;

    this.context.drawImage(
      this.image,
      this.frameData.frame.x,
      this.frameData.frame.y,
      this.frameData.frame.w,
      this.frameData.frame.h,
      this.x - (this.width - this.frameData.spriteSourceSize.x) * this.scale * this.anchor.x,
      this.y - (this.height - this.frameData.spriteSourceSize.y) * this.scale * this.anchor.y,
      this.frameData.frame.w * this.scale,
      this.frameData.frame.h * this.scale
    );

    this.context.globalAlpha = alpha;
  };

  distanceBetweenPoints(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;

    return Math.sqrt(x * x + y * y);
  }

  hitTest(pt) {
    const centre = {
      x: this.x,
      y: this.y
    };
    const radius = (this.width * this.scale) / 2;
    //Now test if the pt is in the circle
    const dist = this.distanceBetweenPoints(pt, centre);

    return dist < radius;
  }
}

class SFX {
  constructor(options) {
    this.context = options.context;
    const volume = (options.volume != undefined) ? options.volume : 1.0;
    this.gainNode = this.context.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.context.currentTime);
    this.gainNode.connect(this.context.destination);
    this._loop = (options.loop == undefined) ? false : options.loop;
    this.fadeDuration = (options.fadeDuration == undefined) ? 0.5 : options.fadeDuration;
    this.autoplay = (options.autoplay == undefined) ? false : options.autoplay;
    this.buffer = null;

    let codec;
    for (let prop in options.src) {
      if (prop == "webm" && SFX.supportsVideoType(prop)) {
        codec = prop;
        break;
      }
      if (prop == "mp3" && SFX.supportsVideoType(prop)) {
        codec = prop;
      }
    }

    if (codec != undefined) {
      this.url = options.src[codec];
      this.load(this.url);
    } else {
      console.warn("Browser does not support any of the supplied audio files");
    }
  }

  static supportsVideoType(type) {
    let video;
    // Allow user to create shortcuts, i.e. just "webm"
    let formats = {
      ogg: 'video/ogg; codecs="theora"',
      h264: 'video/mp4; codecs="avc1.42E01E"',
      webm: 'video/webm; codecs="vp8, vorbis"',
      vp9: 'video/webm; codecs="vp9"',
      hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
    };

    if (!video) video = document.createElement('video');

    return video.canPlayType(formats[type] || type);
  }

  load(url) {
    // Load buffer asynchronously
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    const sfx = this;

    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      sfx.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            console.error('error decoding file data: ' + sfx.url);
            return;
          }
          sfx.buffer = buffer;
          if (sfx.autoplay) sfx.play();
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }

    request.onerror = function() {
      console.error('SFX Loader: XHR error');
    }

    request.send();
  }

  set loop(value) {
    this._loop = value;
    if (this.source != undefined) this.source.loop = value;
  }

  play() {
    if (this.buffer == null) return;
    if (this.source != undefined) this.source.stop();
    this.source = this.context.createBufferSource();
    this.source.loop = this._loop;
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.source.start(0);
  }

  set volume(value) {
    this._volume = value;
    this.gainNode.gain.setTargetAtTime(value, this.context.currentTime + this.fadeDuration, 0);
  }

  pause() {
    if (this.source == undefined) return;
    this.source.stop();
  }

  stop() {
    if (this.source == undefined) return;
    this.source.stop();
  }
}
