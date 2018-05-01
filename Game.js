var player = new Player();
var bushManager = new BushManager();
var door = new Door(550, 0);
var tree = new TreeManager();
var wall = new WallManager();
var enemyManager = new EnemyManager();

var restartButton = document.getElementById("restartButton");

var gameScreen = document.getElementById("game-window");
var fightScreen = document.getElementById("fight-window");
var deathScreen = document.getElementById("dead-window");
deathScreen.style.display = "none";

var playerFight = document.getElementById("player-fight");
var enemyFight = document.getElementById("enemy-fight");

var attackButtons = document.getElementsByClassName("attackButton");

var frame = 1;

document.addEventListener('keydown', function(event){
    player.keyDown(event);
});

document.addEventListener('keyup', function(event){
    player.keyUp(event);
});

for(var i = 0; i < attackButtons.length; i++){
    attackButtons[i].addEventListener('click', function(event){
        player.PlayerAttack(event, this.id);
    });
}


function FightAnimation(){
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
    player.CheckHealth();
}

setInterval(Update, 1000/60);

setInterval(function(){
    // player.randomEnemy = bushManager.randomEnemyBush();
    if(player.enemyCount >= 3){
        setInterval(function(){
            door.doorAnimation();
            playerdoor();
        }, 1000/2);
        enemyFight.style.width = 500 + 'px';
        enemyFight.style.height = 500 + 'px';
        enemyFight.style.top = 300 + 'px';
        player.enemyFight.style.backgroundImage = "url('images/boss.gif')";
    }
}, 1000);

setInterval(FightAnimation, 1000/10);

function playerdoor(){
    if(player.posX >= door.posX  && player.posX <= door.posX + 130  &&
        player.posY >= door.posY - 50 && player.posY <= door.posY + 80)
    {
        player.GoToBoss();
    }
}

restartButton.addEventListener('click', function(){
    location.reload();
});



