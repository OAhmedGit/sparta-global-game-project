function WallManager(){

    this.wallArray = [];

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