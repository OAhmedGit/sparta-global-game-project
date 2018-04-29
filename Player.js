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
    this.bushManager = new BushManager();
    this.randomEnemy = 0;
    this.colliding = false;

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
                this.player.src = "images/animations/left-anim/left-1.png";
                break;
            case 38:
                this.holdUp = false;
                this.player.src = "images/animations/up-anim/up-1.png";
                break;
            case 39:
                this.holdRight = false;
                this.player.src = "images/animations/right-anim/right-1.png";
                break;
            case 40:
                this.holdDown = false;
                this.player.src = "images/animations/down-anim/down-1.png";
                break;
        }
    }

    this.Move = function(){
        if(this.holdLeft == true){
            this.posX -= this.moveSpeed;
            this.PlayAnimation();
        } else if(this.holdRight == true){
            this.posX += this.moveSpeed;
            this.PlayAnimation();
        } else if(this.holdUp == true){
            this.posY -= this.moveSpeed;
            this.PlayAnimation();
        } else if(this.holdDown == true){
            this.posY += this.moveSpeed;
            this.PlayAnimation();
        }
    }

    this.CheckCollisions = function(){
        for(var i = 0; i < this.bushManager.bushesArray.length; i++){
            if(this.posX >= this.bushManager.bushesArray[i].posX - 48 && this.posX <= this.bushManager.bushesArray[i].posX + 48 &&
                this.posY >= this.bushManager.bushesArray[i].posY - 50 && this.posY <= this.bushManager.bushesArray[i].posY + 50)
            {
                this.posX = this.previousPosX;
                this.posY = this.previousPosY;
                this.colliding = true;
            } else {
                this.colliding = false;
            }
        }
    }

    this.CollidingWithEnemy = function(){
        if(this.bushManager.randomEnemyBush() == 1 && this.colliding == true){
            setTimeout(function(){
                window.location = "fight.html"
            }, 2000);
        }
    }
}