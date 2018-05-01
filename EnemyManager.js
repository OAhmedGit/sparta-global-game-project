function EnemyManager(){
    this.enemyArray = [];
    
    this.enemyArray.push(new Enemy("jigglypuff", 100, 400, "images/Jigglypuff.gif"));
    this.enemyArray.push(new Enemy("pikachu", 1000, 160, "images/pikachu.gif"));
    this.enemyArray.push(new Enemy("charmander", 100, 100, "images/charmander.gif"));
}
