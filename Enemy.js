function Enemy(enemyName, posX, posY, imgsrc){

    this.enemyName = enemyName;
    this.posX = posX;
    this.posY = posY;
    this.imgsrc = imgsrc;

    this.enemyArray = [];

    this.enemy = document.createElement('img');
    this.enemy.id = this.enemyName;
    this.enemy.className = "enemy";
    document.getElementById('game-window').appendChild(this.enemy);
    this.enemyArray.push(this.enemy);

    for (let i = 0; i < this.enemyArray.length; i++) {
        this.enemyArray[i].style.left = this.posX + 'px';
        this.enemyArray[i].style.top = this.posY + 'px';
        this.enemyArray[i].src = this.imgsrc;
    }
}