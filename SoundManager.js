//SoundManager object which specifies the source and volume of each sound.
function SoundManager(){
    this.backgroundMusic = new Sound("sounds/gameSound.mp3", 0.2);
    this.mainMenuMusic = new Sound("sounds/mainSound.mp3", 1);
    this.fightMusic = new Sound("sounds/fightSound.mp3", 0.5);
    this.pickUpSound = new Sound("sounds/pickup.mp3", 1);
    this.hitSound = new Sound("sounds/hit.mp3", 1);
}