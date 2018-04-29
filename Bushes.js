function Bushes (posX, posY){

    this.posX = posX;
    this.posY = posY;

    this.bushArray = [];

    this.bush = document.createElement('div');
    this.bush.className = "bush";
    document.getElementById('game-window').appendChild(this.bush);
    this.bushArray.push(this.bush);

    for(var i = 0; i < this.bushArray.length; i++){
        this.bushArray[i].style.left = posX + 'px';
        this.bushArray[i].style.top = posY + 'px';
    }
}