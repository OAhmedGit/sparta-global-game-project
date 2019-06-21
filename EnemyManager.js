//Object responsible for setting the name, position and source. 
function EnemyManager(){
    this.enemyArray = [];

    this.enemyArray.push(new Enemy("pikachu", 1000, 160, "images/pikachu.gif")); //Create new instance of enemy and pushes to array.
    this.enemyArray.push(new Enemy("charmander", 100, 100, "images/charmander.gif")); //Create new instance of enemy and pushes to array.
}
