var player = new Player();
var bushManager = new BushManager();
var door = new Door(550, 0);
var tree = new TreeManager();
var wall = new WallManager();

var gameScreen = document.getElementById("game-window");
var fightScreen = document.getElementById("fight-window");

var playerFight = document.getElementById("player-fight");

var frame = 1;

document.addEventListener('keydown', function(event){
    player.keyDown(event);
});

document.addEventListener('keyup', function(event){
    player.keyUp(event);
});

function SwitchScreen(){
    if(frame < 18){
        frame++;
        playerFight.src = "images/animations/fight-anim/fight-" + frame + ".png";
    }
    if(frame >= 18){
        frame = 1;
    }
}

function Update(){
    player.GameBounds();
    player.UpdatePosition();
    player.Move();
    player.CheckCollisions();
    player.SwitchScreenBooleans();
}

setInterval(Update, 1000/60);

setInterval(function(){
    player.randomEnemy = bushManager.randomEnemyBush();
}, 1000);

setInterval(SwitchScreen, 1000/10);