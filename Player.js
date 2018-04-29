function Player(){
    this.window = document.getElementById("game-window");
    this.player = document.getElementById("player");
    this.health = 100;
    this.damage = 30;
    this.moveSpeed = 2;
    this.posX = 650;
    this.posY = 600;
    this.previousPosX;
    this.previousPosY;
    this.currentFrame = 1;
    this.player.src = "images/animations/up-anim/up-1.png";
    this.animPath;

    this.PlayAnimation = function(){
        if(this.currentFrame < 24){
            this.currentFrame++; 
            this.player.src = this.animPath + this.currentFrame + ".png";
        }
        if(this.currentFrame >= 24){
            this.currentFrame = 1;
        }
    }

    this.GameBounds = function(){
        if(this.posX >= 1250){
            this.posX = 1250;
        } else if(this.posX <= 0){
            this.posX = 0;
        }
    
        if(this.posY >= 636){
            this.posY = 636;
        } else if(this.posY <= 0){
            this.posY = 0;
        }
    }

    this.UpdatePosition = function(){
        this.previousPosX = this.posX;
        this.previousPosY = this.posY;

        this.player.style.left = this.posX + 'px';
        this.player.style.top = this.posY + 'px';
    }

    this.keyDown = function(e){
        switch(e.keyCode){
            case 37:
                this.holdLeft = true
                this.animPath = "images/animations/left-anim/left-";
                break;
            case 38:
                this.holdUp = true;
                this.animPath = "images/animations/up-anim/up-";
                break;
            case 39:
                this.holdRight = true;
                this.animPath = "images/animations/right-anim/right-";
                break;
            case 40:
                this.holdDown = true;
                this.animPath = "images/animations/down-anim/down-";
                break;
        }
    }

    this.keyUp = function(e){
        switch(e.keyCode){
            case 37:
                this.holdLeft = false;
                break;
            case 38:
                this.holdUp = false;
                break;
            case 39:
                this.holdRight = false;
                break;
            case 40:
                this.holdDown = false;
                break;
        }
    }

    this.Move = function(){
        if(this.holdLeft == true){
            this.posX -= this.moveSpeed;
            this.PlayAnimation();
        }
        if(this.holdRight == true){
            this.posX += this.moveSpeed;
            this.PlayAnimation();
        }
        if(this.holdUp == true){
            this.posY -= this.moveSpeed;
            this.PlayAnimation();
        }
        if(this.holdDown == true){
            this.posY += this.moveSpeed;
            this.PlayAnimation();
        }
    }
}