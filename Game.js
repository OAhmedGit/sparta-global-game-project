var player = new Player();
var bushManager = new BushManager();
var door = new Door(550, 0);
var tree = new TreeManager();
var wall = new WallManager();
var enemyManager = new EnemyManager();
var heartManager = new HeartManager();
var soundManager = new SoundManager();

var restartButton = document.getElementsByClassName("restartButton");
var mainMenuButton = document.getElementsByClassName("goToMainMenu");

var doorCollisionPosition;

var gameScreen = document.getElementById("game-window");
var fightScreen = document.getElementById("fight-window");
var deathScreen = document.getElementById("dead-window");
var winScreen = document.getElementById("win-window");
deathScreen.style.display = "none";
winScreen.style.display = "none";

var playerFight = document.getElementById("player-fight");
var enemyFight = document.getElementById("enemy-fight");

var heartIndicator1 = document.getElementById("heart-indicator-1");
var heartIndicator2 = document.getElementById("heart-indicator-2");

heartIndicator1.style.backgroundImage = "none";
heartIndicator2.style.backgroundImage = "none";

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
        player.randomAttack = Math.floor(Math.random() * 3)+1;
        player.PlayerAttack(event, this.id);
        if(player.healthBarEnemy.dataset.value > 0){
            setTimeout(function(){
                player.turn = 1;
                player.EnemyAttack()
            }, 1000);
        }
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
    playerdoor();
}

setInterval(Update, 1000/60);

setInterval(FightAnimation, 1000/10);

function playerdoor(){
    if(player.enemyCount == 2){
        doorCollisionPosition = 50;
    } else {
        doorCollisionPosition = 80;
    }

    if(player.posX >= door.posX  && player.posX <= door.posX + 130  &&
        player.posY >= door.posY - 50 && player.posY <= door.posY + doorCollisionPosition)
    {
        if(player.enemyCount == 2){
            player.GoToBoss();
        } else{
            player.posX = player.previousPosX;
            player.posY = player.previousPosY;
        }
        
    }
}

for(var i = 0; i < restartButton.length; i++){
    restartButton[i].addEventListener('click', function(){
        location.reload();
    });
}
for(var i = 0; i < mainMenuButton.length; i++){
    mainMenuButton[i].addEventListener('click', function(){
        window.location = "start.html";
    });
}

setInterval(function(){
    if(player.enemyCount == 2){
        setInterval(function(){
            door.doorAnimation();
            playerdoor();
        }, 1000/2);
    
        player.enemyFight.style.width = 500 + 'px';
        player.enemyFight.style.height = 500 + 'px';
        player.enemyFight.style.top = 300 + 'px';
        player.enemyFight.style.backgroundImage = "url('images/boss.gif')";
    }
}, 1000)





