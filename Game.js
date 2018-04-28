var player = new Player();

var bushesArray = [];
bushesArray.push(new Bushes(100, 400));
bushesArray.push(new Bushes(400, 400));
bushesArray.push(new Bushes(700, 400));


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
        }
    }
}

function update(){
    player.GameBounds();
    player.UpdatePosition();
    player.Move();
    CheckCollisions();
}

setInterval(update, 1000/60);

