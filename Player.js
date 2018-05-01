function Player(){
    this.player = document.getElementById("player");
    this.enemyFight = document.getElementById("enemy-fight");
    this.health = 100;
    this.playerDamage = 200;
    this.moveSpeed = 2;
    this.posX = 650;
    this.posY = 550;
    this.previousPosX;
    this.previousPosY;
    this.currentFrame = 1;
    this.player.src = "images/animations/up-anim/up-1.png";
    this.animPath;
    this.bushManager = new BushManager();
    this.treeManager = new TreeManager();
    this.wallManager = new WallManager();
    this.enemyManager = new EnemyManager();
    this.randomEnemy;
    this.enemyIndex;
    this.colliding = false;
    this.showGame = true;
    this.showFight = false;
    this.attackButtons = document.getElementsByClassName("attackButton");

    this.enemyCount = 0;
    this.turn = 0;

    this.healthBarEnemy = document.getElementById("health-bar-enemy");
    this.innerBarEnemy = document.getElementById("bar-enemy");
    this.healthBarPlayer = document.getElementById("health-bar-player");
    this.innerBarPlayer = document.getElementById("bar-player");

    this.valEnemy;
    this.totalEnemy;
    this.newValEnemy;
    this.barWidthEnemy;

    this.valPlayer;
    this.totalPlayer;
    this.newValPlayer;
    this.barWidthPlayer;

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
                this.holdLeft = true;
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
        for(var i = 0; i < this.enemyManager.enemyArray.length; i++){
            if(this.posX >= this.enemyManager.enemyArray[i].posX - 48 && this.posX <= this.enemyManager.enemyArray[i].posX + 48 &&
                this.posY >= this.enemyManager.enemyArray[i].posY - 50 && this.posY <= this.enemyManager.enemyArray[i].posY + 40)
            {
                this.posX = this.previousPosX;
                this.posY = this.previousPosY;
                this.colliding = true;
                this.DisplayFightImage(i);
                this.CollidingWithEnemy();
                this.enemyManager.enemyArray.splice(i, 1);
            } else {
                this.colliding = false;
            }
        }

        for(var i = 0; i < this.treeManager.treeArray.length; i++){
            if(this.posX >= this.treeManager.treeArray[i].posX - 20 && this.posX <= this.treeManager.treeArray[i].posX + 70 &&
                this.posY >= this.treeManager.treeArray[i].posY - 50 && this.posY <= this.treeManager.treeArray[i].posY + 100)
            {
                this.posX = this.previousPosX;
                this.posY = this.previousPosY;
            }
        }
        
        for(var i = 0; i < this.wallManager.wallArray.length; i++){
            if(this.posX >= this.wallManager.wallArray[i].posX - 48 && this.posX <= this.wallManager.wallArray[i].posX + 48 &&
                this.posY >= this.wallManager.wallArray[i].posY - 50 && this.posY <= this.wallManager.wallArray[i].posY + 10)
            {
                this.posX = this.previousPosX;
                this.posY = this.previousPosY;
            }
        }
    }

    this.CollidingWithEnemy = function(){
        if(this.colliding == true){
            this.showGame = false;
            this.showFight = true;
        } 
    }

    this.SwitchScreenBooleans = function(){
        if(this.showGame == true && this.showFight == false){
            gameScreen.style.display = "block";
            fightScreen.style.display = "none";
        }
        if(this.showGame == false && this.showFight == true){
            gameScreen.style.display = "none";
            fightScreen.style.display = "block";
        }
        if(this.showGame == false && this.showFight == false){
            gameScreen.style.display = "none";
            fightScreen.style.display = "none";
            deathScreen.style.display = "block";
        }
    }

    this.PlayerAttack = function(e, id){
        if(this.turn == 0){
            this.valEnemy = this.healthBarEnemy.dataset.value;
            this.totalEnemy = this.healthBarEnemy.dataset.total;
            this.newValEnemy = this.valEnemy - this.playerDamage;
            this.barWidthEnemy = (this.newValEnemy / this.totalEnemy) * 100;
            this.healthBarEnemy.dataset.value = this.newValEnemy;
            this.innerBarEnemy.style.width =  this.barWidthEnemy + "%";
            this.turn = 1;
            this.EnemyAttack();
        }
    }

    this.EnemyAttack = function(){
        if(this.turn == 1){
            this.valPlayer = this.healthBarPlayer.dataset.value;
            this.totalPlayer = this.healthBarPlayer.dataset.total;
            this.enemyDamage = Math.floor(Math.random()*100)+40;
            this.newValPlayer = this.valPlayer - this.enemyDamage;
            this.barWidthPlayer = (this.newValPlayer / this.totalPlayer) * 100;
            this.healthBarPlayer.dataset.value = this.newValPlayer;
            this.innerBarPlayer.style.width =  this.barWidthPlayer + "%";
            this.turn = 0;
        }
    }

    this.CheckHealth = function(){
        if(this.healthBarEnemy.dataset.value <= 0){
            this.enemyCount++;
            this.showGame = true;
            this.showFight = false;
            this.colliding = false;
            this.healthBarEnemy.dataset.value = 1000;
            this.innerBarEnemy.style.width = 100 + "%";
        }

        console.log(this.healthBarPlayer.dataset.value);
        if(this.healthBarPlayer.dataset.value <= 0){
            this.showGame = false;
            this.showFight = false;
        }
    }

    this.DisplayFightImage = function(i){
        if(this.enemyManager.enemyArray[i].enemyName == "jigglypuff"){
            this.enemyFight.style.backgroundImage = "url('images/Jigglypuff.gif')";
        }
        else if(this.enemyManager.enemyArray[i].enemyName == "pikachu"){
            this.enemyFight.style.backgroundImage = "url('images/pikachu.gif')";
        }
        else if(this.enemyManager.enemyArray[i].enemyName == "charmander"){
            this.enemyFight.style.backgroundImage = "url('images/charmander.gif')";
        }  
    }

    this.GoToBoss = function(){
       this.showGame = false;
       this.showFight = true;
    }          
    
}