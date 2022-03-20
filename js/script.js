//import { DataService } from './data-service';
//import { Item } from './item';
//import { MergeSort } from './merge-sort';

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
        const dataItems = DataService.getData();

        comparatorContainer.innerHTML = '';
        resultsContainer.innerHTML = '';
        shuffle(dataItems);
        const textArray = dataItems.map(di => `{ ${di.id} | ${di.description} }`).join(', ');
        infoParagraph.innerHTML = infoParagraph.innerHTML.replace(/\[.*?\]/, `[ ${textArray} ]`);
        new MergeSort(comparatorContainer, onFinished, onClick).sort(dataItems.map(x=> new Item(x)));
        comparatorSection.style.display = 'block';
        resultsSection.style.display = 'none';
    }
})

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}