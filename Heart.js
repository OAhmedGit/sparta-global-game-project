function Heart (posX, posY, id){

    this.posX = posX;
    this.posY = posY;
    this.src = "url('images/heart.png')";
    this.heartArray = [];
    this.i = id;

    this.heart = document.createElement('div');
    this.heart.className = "heart";
    this.heart.id = this.i;
    this.heart.style.backgroundImage = this.src;
    document.getElementById('game-window').appendChild(this.heart);
    this.heart.style.left = this.posX + 'px';
    this.heart.style.top = this.posY + 'px';
}