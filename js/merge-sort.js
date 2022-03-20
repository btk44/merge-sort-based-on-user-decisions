//import { TreeItem } from './tree-item';

class MergeSort {
    constructor(comparatorContainer, onFinished, onClick){
        this.treeLevels = [];
        this.comparatorContainer = comparatorContainer;
        this.onFinished = onFinished;
        this.onClick = onClick;
    } 

    buildTree(list, parent) {
        const item = new TreeItem(list, parent);

        if(!this.treeLevels[item.level]){
            this.treeLevels[item.level] = [item];
        } else {
            this.treeLevels[item.level].push(item);
        }
        
        if(item.rawList.length <= 1){
            item.left = item.right = null;
            item.mergedList = item.rawList;
        } else {
            const middleIndex = Math.floor(list.length / 2);
            item.left = this.buildTree(list.slice(0, middleIndex), item);
            item.right = this.buildTree(list.slice(middleIndex), item);
        }

        return item;
    }

    isItemMerged(item){
        return item.rawList.length === item.mergedList.length;
    }

    sort(list){
        this.tree = this.buildTree(list, null);
        this.merge(this.treeLevels.length-1);
    }

    merge(currentLevelIndex) {
        const currentLevel = this.treeLevels[currentLevelIndex];
    
        if(currentLevel.length){
            const currentItem = currentLevel[0];
            if(this.isItemMerged(currentItem)){
                currentItem.left = currentItem.right = null;
                currentLevel.shift();
                this.merge(currentLevelIndex);
            } else {
                const leftList = currentItem.left.mergedList;
                const rightList = currentItem.right.mergedList;
    
                if(!leftList.length){
                    currentItem.mergedList = currentItem.mergedList.concat(rightList);
                    this.merge(currentLevelIndex);
                } 
                else if (!rightList.length){
                    currentItem.mergedList = currentItem.mergedList.concat(leftList);
                    this.merge(currentLevelIndex);
                } 
                else {
                    const leftElement = leftList[0].generateDomAElementForComparison();
                    const rightElement = rightList[0].generateDomAElementForComparison();
            
                    this.comparatorContainer.appendChild(leftElement);
                    this.comparatorContainer.appendChild(rightElement);

                    const mergeSort = this;

                    leftElement.onclick = () => {
                        currentItem.mergedList.push(leftList.shift());
                        mergeSort.comparatorContainer.innerHTML = '';
                        mergeSort.merge(currentLevelIndex);
                        return this.onClick();
                    }

                    rightElement.onclick = () => {
                        currentItem.mergedList.push(rightList.shift());
                        mergeSort.comparatorContainer.innerHTML = '';
                        this.merge(currentLevelIndex);
                        return this.onClick();
                    }
                }
            }        
        }
        else if (currentLevelIndex > 0){
            this.treeLevels.pop();
            currentLevelIndex--;
            this.merge(currentLevelIndex);
        } else if(currentLevelIndex === 0){
            this.treeLevels.pop();
            this.onFinished(this.tree.mergedList);
        }
    }
}