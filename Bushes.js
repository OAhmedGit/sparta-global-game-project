function Bushes (posX, posY){

    this.posX = posX;
    this.posY = posY;

    var bushArray = [];

    var bush = document.createElement('div');
    bush.className = "bush";
    document.getElementById('game-window').appendChild(bush);
    bushArray.push(bush);

    for(var i = 0; i < bushArray.length; i++){
        bushArray[i].style.left = posX + 'px';
        bushArray[i].style.top = posY + 'px';
    }
}