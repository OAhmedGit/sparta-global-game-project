var player = new Player();
var bushManager = new BushManager();
var door = new Door(550, 0);
var tree = new TreeManager();
var wall = new WallManager();

document.addEventListener('keydown', function(event){
    player.keyDown(event);
});

document.addEventListener('keyup', function(event){
    player.keyUp(event);
});

function Update(){
    player.GameBounds();
    player.UpdatePosition();
    player.Move();
    player.CheckCollisions();
}

setInterval(Update, 1000/60);

setInterval(function(){
    player.randomEnemy = bushManager.randomEnemyBush();
}, 3000);

