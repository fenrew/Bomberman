let Bomb = function(strength, timer, xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.activate = function() {
        $("the-whole-game-contianer").append("<div class='bomb'></div>")
    }
}