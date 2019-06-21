//Tree object which sets the position of the trees in the level passed from the TreeManager object.
function Tree (posX, posY){
    this.posX = posX;
    this.posY = posY;

    this.treeArray = [];

    this.tree = document.createElement('div');
    this.tree.className = "tree";
    document.getElementById('game-window').appendChild(this.tree);
    this.treeArray.push(this.tree);

    for(var i = 0; i < this.treeArray.length; i++){
        this.treeArray[i].style.left = posX + 'px';
        this.treeArray[i].style.top = posY + 'px';
    }
}