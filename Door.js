function Door(posX, posY){

    this.posX = posX;
    this.posY = posY;

    this.currentFrame = 1;
    this.door = document.getElementById("door");

    this.door.style.left = this.posX + 'px';
    this.door.style.top = this.posY + 'px';

    this.doorAnimation = function(){
        this.door.src = "images/animations/door-anim/door-1.png"

        if(this.currentFrame <= 4){
            this.door.src = "images/animations/door-anim/door-" + this.currentFrame + ".png";            
            this.currentFrame++; 
        }
        if(this.currentFrame > 4){
            this.currentFrame = 1;
        }
    }
}