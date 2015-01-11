var gameOver = false;
var score = 0;
var level = 1;
var lives = 3;
var enemySpeed = [30,40,50,60,70,80,90,100];


// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = enemySpeed[Math.floor(Math.random()*8)];//this.speed generate a number for initial speed from enemySpped array
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x<505){
        this.x = this.x + this.speed*Math.random()*3*dt;
    }
    else {
        this.x = 0+ this.speed*Math.random()*3*dt; 
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
// Condition to reset the player: if player reaches the water 
// this.y ===-40.
     if(lives > 0){
        if(this.y === -40){
            player.reset();
            lives--;
            //lifeHearts.update();
        }
    }
    else {
        GameOver();
    }
};

//reset the position of player
Player.prototype.reset = function(){
    
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    
};




// Add 1 score when player get 1 gem, level up when got 5 scores,
// add 3 more bugs to the allEnemies array when level up.
Player.prototype.scoreAdd = function(){
    score++;
    if(score % 5 === 0){
        level++;
        for(i = allEnemies.length; i < level*3+1; i++){
            enemyi = new Enemy(-20,60*(Math.floor(Math.random()*3))+83);
            allEnemies.push(enemyi);
            console.log(enemyi);
        }
    
    
    }
};



// Keycode presses control player's movement
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
            if(this.y > 0){
                this.y = this.y -40; 
            }
            else{
                this.y = -40; //  player in river
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

// Gem array including 3 color gems
var GemSprites = ['images/Gem Green.png','images/Gem Blue.png','images/Gem Orange.png'];

// Gem class, one color Gem will randomly appears on the stone-block area, render() method render the gem on canvas
var Gem = function(){
    this.sprite = GemSprites[Math.floor(Math.random()*3)];
    this.x = Math.floor(Math.random()*5)*101;// vol width is 101 as setted in engine.js
    this.y = Math.floor(Math.random()*3)*83+83;
    console.log(this.x);
    console.log(this.y);
      
};

// Render a gem on canvas
Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

// checkCollisions()  
// function checks for enemy-player collisions. the for loop checks for 
// each enemy bug's relative position to the player, collision occurs 
// within a 50*50 square place. One Life will lost if 
// collision occurs, and the player is returned back to his
// initial position. gameOver() is called when lives = 0.
function checkCollisions(){
    if(lives > 0){
        for(var i = 0; i < allEnemies.length; i++){
        if(Math.abs(allEnemies[i].x - player.x) < 50 && Math.abs(allEnemies[i].y - player.y) < 50){
            player.reset();
            lives--;
            //lifeHearts.update();
            }
        }
    }
    
    else {
        GameOver();
    }        
};

// checkGemTakes()  
// function checks for player takes the gem. Similar to checkCollision(), 
// score will increment 1 when player is with the 30*30 square intersection
// allGems array been cleared, then add a new gen at a new position.
function checkGemTakes(){
    for(var i = 0; i < allGems.length; i++){
        if(Math.abs(allGems[i].x - player.x) < 30 && Math.abs(allGems[i].y - player.y) < 30){
            
            player.scoreAdd();
            allGems = [];
            allGems.push(new Gem());
            console.log(score);
        }
    }
};


// When lost all lives, this function causes the 'GAMEOVER' overlay to appear and stops player and bugs' movements
function GameOver() {
    document.getElementById('gameOver').style.visibility = 'visible';
    gameOver = true;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place lifehearts object in a variable called LifeHearts
// Place gem objects in an array called allGems
var enemy1 = new Enemy(-20,60);
var enemy2 = new Enemy(-20,150);
var enemy3 = new Enemy(-20,240);
var allEnemies = [enemy1,enemy2,enemy3];
var player = new Player(200,400);

var allGems = []; 
var gem = new Gem();
allGems.push(gem);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// 
document.addEventListener('keydown'/*'keyup' 1 movement/key press*/, function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
