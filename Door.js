function Door(posX, posY){

    this.posX = posX;
    this.posY = posY;

    this.currentFrame = 1;
    this.door = document.getElementById("door");

    this.door.style.left = this.posX + 'px';
    this.door.style.top = this.posY + 'px';

    this.door.src = "images/animations/door-anim/door-1.png"

    this.doorAnimation = function(){
        if(this.currentFrame <= 4){
            this.door.src = "images/animations/door-anim/door-" + this.currentFrame + ".png";            
            this.currentFrame++; 
        }
    }
}