class TreeItem {
    constructor(list, parent){
        this.rawList = list;
        this.mergedList = [];
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.level = parent ? parent.level +1 : 0;
    }
}