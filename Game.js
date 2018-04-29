var player = new Player();
var bushManager = new BushManager();
var door = new Door(500, 100);

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
    player.CollidingWithEnemy();
}

setInterval(Update, 1000/60);

setInterval(function(){
    console.log(bushManager.randomEnemyBush())
}, 3000);

setInterval(function(){
    door.doorAnimation();
}, 1000/2);