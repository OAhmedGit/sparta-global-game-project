//Wall object which sets the position of the walls passed from the WallManager object.
function Wall(posX, posY){

    this.posX = posX;
    this.posY = posY;

    this.wallArray = [];

    this.wall = document.createElement('div');
    this.wall.className = "wall";
    document.getElementById('game-window').appendChild(this.wall);
    this.wallArray.push(this.wall);

    for(var i = 0; i < this.wallArray.length; i++){
        this.wallArray[i].style.left = posX + 'px';
        this.wallArray[i].style.top = posY + 'px';
    }
}