const dataItems = [
    { id: 1, description: 2, src: 'css/product.svg' },
    { id: 2, description: 6, src: 'css/product.svg' },
    { id: 3, description: 3, src: 'css/product.svg' },
    { id: 4, description: 8, src: 'css/product.svg' },
    { id: 5, description: 1, src: 'css/product.svg' },
    { id: 6, description: 17, src: 'css/product.svg' },
    // { id: 7, description: '5', src: 'css/product.svg' },
    // { id: 8, description: '9', src: 'css/product.svg' },
    // { id: 9, description: '0', src: 'css/product.svg' },
    // { id: 10, description: '12', src: 'css/product.svg' },
    // { id: 11, description: '14', src: 'css/product.svg' },
    // { id: 12, description: '7', src: 'css/product.svg' },
    // { id: 13, description: '13', src: 'css/product.svg' },
    // { id: 14, description: '100', src: 'css/product.svg' },
    // { id: 15, description: '16', src: 'css/product.svg' },
];

class Item {
    constructor(data){
        [this.id, this.description, this.imgUrl] = [data.id, data.description, data.src];
    }

    generateDomAElementForComparison() {
        const itemContainer = document.createElement('a');
        itemContainer.href = '#';
        itemContainer.onclick = () => false;
        
        const itemImage = new Image()
        itemImage.src = this.imgUrl;
        itemContainer.appendChild(itemImage);

        const itemDescription = document.createElement('span');
        itemDescription.innerHTML = this.description;     
        itemContainer.appendChild(itemDescription);

        return itemContainer;
    }

    generateResultDomLiElement(orderNumber){
        const resultItem = document.createElement('li');
        const orderNumberSpan = document.createElement('span');
        const descriptionSpan = document.createElement('span');

        orderNumberSpan.innerHTML = `${orderNumber}.`;
        descriptionSpan.innerHTML = this.description;

        resultItem.appendChild(orderNumberSpan);
        resultItem.appendChild(descriptionSpan);
        
        return resultItem;
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

window.onload = (() => {
    const startButton = document.getElementById('start-button');
    const infoParagraph = document.getElementById('input-display');
    const comparatorSection = document.getElementById('comparator-s');
    const resultsSection = document.getElementById('results-s');
    const comparatorContainer = document.getElementById('comparator-p');
    const resultsContainer = document.getElementById('results-p');

    comparatorSection.style.display = 'none';
    resultsSection.style.display = 'none';

    const onClick = () => { return false; };

    const onFinished = (items) => {
        const resultsList = document.createElement('ul');
        items.forEach((item, index) => {
            resultsList.appendChild(item.generateResultDomLiElement(index+1));
        });

        resultsContainer.appendChild(resultsList);
        comparatorSection.style.display = 'none';
        resultsSection.style.display = 'block';
    }

    startButton.onclick = () => {
        comparatorContainer.innerHTML = '';
        resultsContainer.innerHTML = '';
        shuffle(dataItems);
        const textArray = dataItems.map(di => di.description).join(',');
        infoParagraph.innerHTML = infoParagraph.innerHTML.replace(/\[.*?\]/, `[${textArray}]`);
        new MergeSort(comparatorContainer, onFinished, onClick).sort(dataItems.map(x=> new Item(x)));
        comparatorSection.style.display = 'block';
        resultsSection.style.display = 'none';
    }
})


class TreeItem {
    constructor(list, parent){
        this.rawList = list;
        this.mergedList = [];
        this.parent = parent;
        this.level = parent ? parent.level +1 : 0;
    }
}


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