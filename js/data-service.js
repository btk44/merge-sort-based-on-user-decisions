class DataService {
    static getData() {
        // if from api - use fetch (consider loading mask in UI)
        return [
            { id: 1, description: 'one', src: 'css/1.svg' },
            { id: 2, description: 'two', src: 'css/2.svg' },
            { id: 3, description: 'three', src: 'css/3.svg' },
            { id: 4, description: 'four', src: 'css/4.svg' },
            { id: 5, description: 'five', src: 'css/5.svg' },
            { id: 6, description: 'six', src: 'css/6.svg' },
            { id: 7, description: 'seven', src: 'css/7.svg' },
            { id: 8, description: 'eight', src: 'css/8.svg' },
            { id: 9, description: 'nine', src: 'css/9.svg' },
            { id: 10, description: 'ten', src: 'css/10.svg' },
            { id: 11, description: 'eleven', src: 'css/11.svg' },
            { id: 12, description: 'twelve', src: 'css/12.svg' },
            { id: 13, description: 'thirteen', src: 'css/13.svg' },
            { id: 14, description: 'fourteen', src: 'css/14.svg' },
            { id: 15, description: 'fifteen', src: 'css/15.svg' },
        ];
    }

    static postData(data){
        // send data to server
    }
}