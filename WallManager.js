//WallManager object which specifies the position of the walls around the game world.
function WallManager(){

    this.wallArray = [];

    //Loops used to fill the edges of the game window with walls.
    for(var i = 0; i < 1250; i+=48){
        this.wallArray.push(new Wall(i,0));
    }
    for(var i = 0; i < 1250; i+=48){
        this.wallArray.push(new Wall(i,650));
    }
    for(var i = 0; i < 650; i+=48){
        this.wallArray.push(new Wall(0,i));
    }
    for(var i = 0; i < 650; i+=48){
        this.wallArray.push(new Wall(1250,i));
    }
}