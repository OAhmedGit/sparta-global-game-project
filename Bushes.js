//Bushes object responsible for setting the position of the bushes set by the bush manager in the level using the object constructor.
function Bushes (posX, posY){

    this.posX = posX;
    this.posY = posY;

    this.bushArray = [];

    this.bush = document.createElement('div');
    this.bush.className = "bush";
    document.getElementById('game-window').appendChild(this.bush);
    this.bushArray.push(this.bush);

    for(var i = 0; i < this.bushArray.length; i++){
        this.bushArray[i].style.left = this.posX + 'px';
        this.bushArray[i].style.top = this.posY + 'px';
    }
}