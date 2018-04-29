function BushManager(){
    
    this.randomEnemy = 0;

    this.bushesArray = [];
    
    this.bushesArray.push(new Bushes(100, 400));
    this.bushesArray.push(new Bushes(400, 400));
    this.bushesArray.push(new Bushes(700, 400));

    this.randomEnemy = 0;

    this.randomEnemyBush = function(){
        this.randomEnemy = Math.floor(Math.random()*3)+1;
        return this.randomEnemy;
    }
}