function Player(){
    //#region DOM MANIPULATION VARIABLES
    this.player = document.getElementById("player");
    this.enemyFight = document.getElementById("enemy-fight");
    this.healthBarEnemy = document.getElementById("health-bar-enemy");
    this.innerBarEnemy = document.getElementById("bar-enemy");
    this.healthBarPlayer = document.getElementById("health-bar-player");
    this.innerBarPlayer = document.getElementById("bar-player");
    this.player.src = "images/animations/up-anim/up-1.png";
    //#endregion

    //#region VARIABLES
    this.playerDamage;
    this.moveSpeed = 2;
    this.posX = 650;
    this.posY = 550;
    this.previousPosX = 0;
    this.previousPosY = 0;
    this.currentFrame = 1;
    this.animPath;
    this.colliding = false;
    this.showGame = true;
    this.showFight = false;
    this.randomAttack = 0;
    this.deathDelay = 120;
    this.enemyCount = 0;
    this.heartCount = 0;
    this.turn = 0;
    this.valEnemy;
    this.totalEnemy;
    this.newValEnemy;
    this.barWidthEnemy;
    this.valPlayer;
    this.totalPlayer;
    this.newValPlayer;
    this.barWidthPlayer;
    //#endregion

    //#region METHODS/FUNCTIONS
    //Method for character animation, loops through images.
    this.PlayAnimation = function(){
        if(this.currentFrame < 24){
            this.currentFrame++; 
            this.player.src = this.animPath + this.currentFrame + ".png";
        }
        if(this.currentFrame >= 24){
            this.currentFrame = 1;
        }
    }

    //Method to update the previousPosition which is used for collision.
    this.UpdatePosition = function(){
        this.previousPosX = this.posX;
        this.previousPosY = this.posY;

        this.player.style.left = this.posX + 'px';
        this.player.style.top = this.posY + 'px';
    }

    //Method when key is pressed.
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

    //Method when key is released.
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

    //Method to move the player according to the key pressed.
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

    //Method which checks collision with all objects in the game world.
    this.CheckCollisions = function(){
        for(var i = 0; i < enemyManager.enemyArray.length; i++){
            if(this.posX >= enemyManager.enemyArray[i].posX - 48 && this.posX <= enemyManager.enemyArray[i].posX + 48 &&
                this.posY >= enemyManager.enemyArray[i].posY - 50 && this.posY <= enemyManager.enemyArray[i].posY + 40)
            {
                this.posX = this.previousPosX;
                this.posY = this.previousPosY;
                this.colliding = true;
                this.DisplayFightImage(i);
                this.CollidingWithEnemy();
                enemyManager.enemyArray.splice(i, 1);
            } else {
                this.colliding = false;
            }
        }

        for(var i = 0; i < treeManager.treeArray.length; i++){
            if(this.posX >= treeManager.treeArray[i].posX - 20 && this.posX <= treeManager.treeArray[i].posX + 70 &&
                this.posY >= treeManager.treeArray[i].posY - 50 && this.posY <= treeManager.treeArray[i].posY + 100)
            {
                this.posX = this.previousPosX;
                this.posY = this.previousPosY;
            }
        }
        
        for(var i = 0; i < wallManager.wallArray.length; i++){
            if(this.posX >= wallManager.wallArray[i].posX - 48 && this.posX <= wallManager.wallArray[i].posX + 48 &&
                this.posY >= wallManager.wallArray[i].posY - 50 && this.posY <= wallManager.wallArray[i].posY + 10)
            {
                this.posX = this.previousPosX;
                this.posY = this.previousPosY;
            }
        }

        for(var i = 0; i < heartManager.heartArray.length; i++){
            if(this.posX >= heartManager.heartArray[i].posX - 48 && this.posX <= heartManager.heartArray[i].posX + 48 &&
                this.posY >= heartManager.heartArray[i].posY - 50 && this.posY <= heartManager.heartArray[i].posY + 10)
            {
                this.heartCount += 2;
                heartManager.heartArray.splice(i, 1);
                $(".heart").remove();
                soundManager.pickUpSound.play();
                heartIndicator1.style.backgroundImage = "url('images/potion.png')";
                heartIndicator2.style.backgroundImage = "url('images/potion.png')";
            }
        }
    }

    //Method which checks if the player is colliding with an enemy.
    this.CollidingWithEnemy = function(){
        if(this.colliding == true){
            this.showGame = false;
            this.showFight = true;
        } 
    }

    //Method which controls which scene is shown and plays the appropriate music.
    this.SwitchScreenBooleans = function(){
        if(this.showGame == true && this.showFight == false){
            gameScreen.style.display = "block";
            fightScreen.style.display = "none";
            soundManager.fightMusic.stop();
            soundManager.backgroundMusic.play();
        }
        if(this.showGame == false && this.showFight == true){
            gameScreen.style.display = "none";
            fightScreen.style.display = "block";
            soundManager.fightMusic.play();
            soundManager.backgroundMusic.stop();
        }
        if(this.showGame == false && this.showFight == false){
            gameScreen.style.display = "none";
            fightScreen.style.display = "none";
            deathScreen.style.display = "block";
        }
    }

    //Method responsible for the player attacks and healing.
    this.PlayerAttack = function(e, id){
        if(id == "attack1Button"){
            this.playerDamage = 100;
        }
        if(id == "attack2Button"){
            this.playerDamage = 200;
        }
        if(id == "attack3Button"){
            this.playerDamage = 300;
        }
        if(id == "heal" && this.heartCount > 0 && this.healthBarPlayer.dataset.value < 1000){
            this.healthBarPlayer.dataset.value = 1000;
            this.innerBarPlayer.style.width =  100 + "%";
            this.heartCount--;
        }

        if(this.turn == 0 && id == "attack1Button" ||id == "attack2Button"){
            this.valEnemy = this.healthBarEnemy.dataset.value;
            this.totalEnemy = this.healthBarEnemy.dataset.total;
            this.newValEnemy = this.valEnemy - this.playerDamage;
            this.barWidthEnemy = (this.newValEnemy / this.totalEnemy) * 100;
            this.healthBarEnemy.dataset.value = this.newValEnemy;
            this.innerBarEnemy.style.width =  this.barWidthEnemy + "%";
            soundManager.hitSound.play();
        }

        if(id == "attack3Button" && this.randomAttack == 3){
            this.valEnemy = this.healthBarEnemy.dataset.value;
            this.totalEnemy = this.healthBarEnemy.dataset.total;
            this.newValEnemy = this.valEnemy - this.playerDamage;
            this.barWidthEnemy = (this.newValEnemy / this.totalEnemy) * 100;
            this.healthBarEnemy.dataset.value = this.newValEnemy;
            this.innerBarEnemy.style.width =  this.barWidthEnemy + "%";
            soundManager.hitSound.play();
        }
    }

    //Method responsible for the enemy attack with random damage each time.
    this.EnemyAttack = function(){
        if(this.turn == 1){
            this.valPlayer = this.healthBarPlayer.dataset.value;
            this.totalPlayer = this.healthBarPlayer.dataset.total;
            this.enemyDamage = Math.floor(Math.random()*200)+100;
            this.newValPlayer = this.valPlayer - this.enemyDamage;
            this.barWidthPlayer = (this.newValPlayer / this.totalPlayer) * 100;
            this.healthBarPlayer.dataset.value = this.newValPlayer;
            this.innerBarPlayer.style.width =  this.barWidthPlayer + "%";
            soundManager.hitSound.play();
            this.turn = 0;
        }
    }

    //Method to check the Health of the enemy and the player.
    this.CheckHealth = function(){
        if(this.healthBarEnemy.dataset.value <= 0 && this.enemyCount <= 3){
            this.deathDelay--; //Delay added between when enemy dies and scene switches back to game.
            $("#enemy-fight").fadeOut(1500, function(){ //Adds the fade out effect when enemy dies.
            });

            if(this.deathDelay <= 0){
                this.enemyCount++;
                this.colliding = false;
                this.healthBarEnemy.dataset.value = 1000;
                this.innerBarEnemy.style.width = 100 + "%";
                this.showGame = true;
                this.showFight = false;
                this.deathDelay = 120;
                $("#enemy-fight").fadeIn("slow", function(){
                });
            }
        }

        if(this.enemyCount >= 3){
            gameScreen.style.display = "none";
            fightScreen.style.display = "none";
            deathScreen.style.display = "none";
            winScreen.style.display = "block";
        }

        if(this.healthBarPlayer.dataset.value <= 0){

            this.deathDelay--;

            $("#player-fight").fadeOut(1500, function(){ //Adds fade out effect when player dies.
            });

            if(this.deathDelay <= 0){
                gameScreen.style.display = "none";
                fightScreen.style.display = "none";
                deathScreen.style.display = "block";
                winScreen.style.display = "none";
            }
        }

        //Checks how many potions are in inventory and displays them top-left of fight screen.
        if(this.heartCount == 1){
            heartIndicator2.style.backgroundImage = "none";
        } else if(this.heartCount < 1){
            heartIndicator1.style.backgroundImage = "none";
        }
    }

    //Method which checks the enemy name set in EnemyManager and shows the correct image.
    this.DisplayFightImage = function(i){
        if(enemyManager.enemyArray[i].enemyName == "jigglypuff"){
            this.enemyFight.style.backgroundImage = "url('images/Jigglypuff.gif')";
        }
        else if(enemyManager.enemyArray[i].enemyName == "pikachu"){
            this.enemyFight.style.backgroundImage = "url('images/pikachu.gif')";
        }
        else if(enemyManager.enemyArray[i].enemyName == "charmander"){
            this.enemyFight.style.backgroundImage = "url('images/charmander.gif')";
        }
    }

    this.GoToBoss = function(){
       this.showGame = false;
       this.showFight = true;
    }

    //Method to play the animation for the player in the fight scene by looping through the images.
    this.FightAnimation = function(){
        if(frame < 18){
            frame++;
            playerFight.src = "images/animations/fight-anim/fight-" + frame + ".png";
        }
        if(frame >= 18){
            frame = 1;
        }
    }

    //Update function to constantly run the methods.
    this.Update = function(){
        this.UpdatePosition();
        this.Move();
        this.CheckCollisions();
        this.SwitchScreenBooleans();
        this.CheckHealth();
    }

    //Runs the player fight animation 10 times per second.
    setInterval(this.FightAnimation, 1000/10);
    //#endregion
}
