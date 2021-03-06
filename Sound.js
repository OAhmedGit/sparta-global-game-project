//Sound Object which sets the source and volume of sound passed from the SoundManager object.
function Sound(src, volume) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.volume = volume;
    document.body.appendChild(this.sound);
    
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}