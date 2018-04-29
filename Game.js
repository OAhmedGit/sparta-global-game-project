var player = new Player();

var bushesArray = [];
bushesArray.push(new Bushes(100, 400));
bushesArray.push(new Bushes(400, 400));
bushesArray.push(new Bushes(700, 400));

var randomEnemy = 0;

document.addEventListener('keydown', function(event){
    player.keyDown(event);
});

document.addEventListener('keyup', function(event){
    player.keyUp(event);
});


function CheckCollisions(){
    for(var i = 0; i < bushesArray.length; i++){
        if(player.posX >= bushesArray[i].posX - 48 && player.posX <= bushesArray[i].posX + 48 &&
            player.posY >= bushesArray[i].posY - 50 && player.posY <= bushesArray[i].posY + 50)
        {
            player.posX = player.previousPosX;
            player.posY = player.previousPosY;
            
            if(randomEnemy == 1){
                setTimeout(function(){
                    window.location="fight.html"
                }, 2000);
            }
        }
    }
}

function update(){
    player.GameBounds();
    player.UpdatePosition();
    player.Move();
    CheckCollisions();
}

function randomEnemyBush(){
    randomEnemy = Math.floor(Math.random()*3)+1;
    return randomEnemy;
}

setInterval(update, 1000/60);

setInterval(function(){
    console.log(randomEnemyBush());
}, 3000);


