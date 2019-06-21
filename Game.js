//#region INSTANCES OF OBJECTS
var player = new Player(); //New Instance of Player object.
var bushManager = new BushManager(); //New Instance of BushManager object.
var door = new Door(550, 0); //New instance of Door.
var treeManager = new TreeManager(); //New instance of TreeManager object.
var wallManager = new WallManager(); //New instance of WallManager object.
var enemyManager = new EnemyManager(); //New instance of EnemyManager object.
var heartManager = new HeartManager(); //New instance of HeartManager object.
var soundManager = new SoundManager(); //New instance of SoundManager object.
//#endregion

//#region VARIABLES
var frame = 1; //Door animation frames.
var doorCollisionPosition; //Variable for door collision with player which changes before and after 2 enemies are defeated.
//#endregion

//#region DOM MANIPULATION VARIABLES
var restartButton = document.getElementsByClassName("restartButton");
var mainMenuButton = document.getElementsByClassName("goToMainMenu"); 
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
//#endregion

//#region ADDING ACTIONS TO THE BUTTONS
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
            }, 2000);
        }
    });
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
//#endregion

//#region UPDATE FUNCTIONS
function Update(){
    player.Update();
    PlayerDoorCollision();
}

setInterval(Update, 1000/60); //Runs the update function 60 times per second.

//Function which checks the collision between the player and the door.
function PlayerDoorCollision(){
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

//Changes the attributes of the enemy for boss fight.
setInterval(function(){
    if(player.enemyCount == 2){
        setInterval(function(){
            door.doorAnimation();
        }, 1000/2);

        player.enemyFight.style.width = 500 + 'px';
        player.enemyFight.style.height = 500 + 'px';
        player.enemyFight.style.top = 300 + 'px';
        player.enemyFight.style.backgroundImage = "url('images/boss.gif')";
    }
}, 1000)
//#endregion

