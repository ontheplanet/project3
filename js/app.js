var gameOver = false;
var score = 0;
var level = 1;
var life = 3;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x<505){
        this.x = this.x + 100*Math.random()*3*dt;
    }
    else {
        this.x = 0+ 100*Math.random()*(Math.random()*10+1)*dt; 
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(gameOver!==true){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y){
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
};
//render player on the canvas.
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

Player.prototype.update = function(){
};
//keycode presses control player's movement
Player.prototype.handleInput = function(keyCode){
    //console.log (keyCode);
    if(gameOver!==true){
        if(keyCode === "left"){
            if(this.x>40){
                this.x = this.x -40;
            }
            else {
                this.x = 0;
            }
            
        }
        if(keyCode === "right"){
            if(this.x < 400){
                this.x = this.x +40;
            }
            else{
                this.x = 420;
            }
        }
        if(keyCode === "up"){
            if(this.y > 80){
                this.y = this.y -40;
            }
            else{
                this.y = 40;
            }
        }
        if(keyCode === "down"){
            if(this.y < 400){
                this.y =  this.y +40;
            }
            else{
                this.y = 400;
            }
        }
        //console.log(this.x);
        //console.log(this.y);
    }
};

var Gem = function(x,y){
    this.x = x;
    this.y = y;

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0,50,75);

var enemy2 = new Enemy(0,150,90);
var enemy3 = new Enemy(0,240,60);
var allEnemies = [enemy1,enemy2,enemy3];

var player = new Player(200,400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// keyup:one movement/key press
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
