//Enemy object responsible for setting the position of the enemies in the level using the object constructor.
function Enemy(enemyName, posX, posY, imgsrc){
    this.enemyName = enemyName; //Sets the name of the enemy.
    this.posX = posX; //specifies the position on the x-axis.
    this.posY = posY; //specifies the position on the y-axis.
    this.imgsrc = imgsrc; //Sets the source of the image.

    this.enemyArray = []; //Array which holds the information for the enemies.

    this.enemy = document.createElement('img'); //creates an img element in the document.
    this.enemy.id = this.enemyName; //sets the id of the enemy to the enemy name from the constructor
    this.enemy.className = "enemy"; //sets the class name.
    document.getElementById('game-window').appendChild(this.enemy); //appends the enemy element created to the game-window div.
    this.enemyArray.push(this.enemy); //Pushes the new enemy to the array.

    for (let i = 0; i < this.enemyArray.length; i++) {
        this.enemyArray[i].style.left = this.posX + 'px'; //Sets the x-position.
        this.enemyArray[i].style.top = this.posY + 'px'; //sets the y-position.
        this.enemyArray[i].src = this.imgsrc; //sets the source of the image.
    }
}