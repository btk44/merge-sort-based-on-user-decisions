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