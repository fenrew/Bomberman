var keyState = {};

window.addEventListener(
  "keydown",
  function(e) {
    keyState[e.keyCode || e.which] = true;
  },
  true
);

window.addEventListener(
  "keyup",
  function(e) {
    keyState[e.keyCode || e.which] = false;
  },
  true
);

const Player = function(game, playerCss) {
    this.game = game;
  this.playerCss = playerCss;
  this.xPosition = 0;
  this.yPosition = 0;
  this.speed = 70;
  this.lives = 3;
  this.strength = 200;
  this.bombTimer = 100;
  this.numberOfBombs = 0;
  this.placedBombs = [];

  this.movement = function(key) {
    if (key === "W") {
      this.yPosition -= 20;
      if (this.yPosition < 0) return (this.yPosition += 20);
      $("#" + this.playerCss).css("top", this.yPosition + "px");
    } else if (key === "S") {
      this.yPosition += 20;
      if (this.yPosition >= 580) return (this.yPosition -= 20);
      $("#" + this.playerCss).css("top", this.yPosition + "px");
    } else if (key === "A") {
      this.xPosition -= 20;
      if (this.xPosition < 0) return (this.xPosition += 20);
      $("#" + this.playerCss).css("left", this.xPosition + "px");
    } else if (key === "D") {
      this.xPosition += 20;
      if (this.xPosition >= 1100) return (this.xPosition -= 20);
      $("#" + this.playerCss).css("left", this.xPosition + "px");
    }
  };

  this.gameLoop = function() {
    if (keyState[87]) {
      this.movement("W");
    }
    if (keyState[83]) {
      this.movement("S");
    }
    if (keyState[65]) {
      this.movement("A");
    }
    if (keyState[68]) {
      this.movement("D");
    }

    setTimeout(
      function() {
        this.gameLoop();
      }.bind(this),
      this.speed
    );
  };

  $(window).on(
    "keydown",
    function(evt) {
      if (evt.keyCode == 32) {
        console.log("SPACE");
        this.numberOfBombs += 1;
        this.placeBomb(
          this.xPosition,
          this.yPosition,
          this.numberOfBombs,
          this.strength
        );
      }
    }.bind(this)
  );

  this.placeBomb = function(xPos, yPos, id, str) {
    let occupiedSpot = false;
    this.placedBombs.forEach(el => {
      if (el.posX == xPos && el.posY == yPos) return (occupiedSpot = true);
    });
    if (occupiedSpot) return;
    this.placedBombs.push({ posX: xPos, posY: yPos, id: id });
    $("#the-whole-game-contianer").append(
      "<div class='bomb' id='" + this.playerCss + id + "'></div>"
    );
    $("#the-whole-game-contianer").append(
      "<div class='bomb' id='" + id + this.playerCss + "'></div>"
    );
    $("#" + this.playerCss + id).css({ left: xPos + "px", top: yPos + "px" });
    $("#" + id + this.playerCss).css({ left: xPos + "px", top: yPos + "px" });

    setTimeout(
      function() {
        // let xStr = str;
        // yPos -= str / 2;
        // if (yPos < 0) {
        //   str += yPos;
        //   yPos = 0;
        // }
        // if (yPos + str >= 580) {
        //   str -= (yPos + str) % 560;
        // }
        // str += 20;
        // xPos -= xStr / 2;
        // if (xPos < 0) {
        //   xStr += xPos;
        //   xPos = 0;
        // }
        // if (xPos + xStr > 1100) {
        //   xStr -= (xPos + xStr)%1080;
        // }
        // xStr += 20;
        // $("#" + this.playerCss + id).css({
        //   "background-color": "yellow",
        //   height: str + "px",
        //   top: yPos + "px"
        // });
        // $("#" + id + this.playerCss).css({
        //   "background-color": "yellow",
        //   width: xStr + "px",
        //   left: xPos + "px"
        // });
        // setTimeout(
        //   function() {
        //     $("#" + this.playerCss + id).remove();
        //     $("#" + id + this.playerCss).remove();
        //     this.placedBombs = this.placedBombs.filter(el => {
        //       return el.id !== id;
        //     });
        //   }.bind(this),
        //   1000
        // );
      }.bind(this),
      2000
    );
  };
};
