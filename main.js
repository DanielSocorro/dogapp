/* 
const URL = 'https://api.thedogapi.com/v1/images/search'

fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    });

                    ↓
                    ↓
                    ↓
                    ↓
                    ↓
 convertido a funciones async y await*/
 const URL = 'https://api.thedogapi.com/v1/images/search';


async function myDog () {
    const res = await fetch(URL);
    const data = await res.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
};

const myButton = document.querySelector("button");
myButton.onclick = myDog;