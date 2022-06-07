 const RandomURL = 'https://api.thedogapi.com/v1/images/search?limit=2';
 const FavoriteURL = 'https://api.thedogapi.com/v1/favourites';
 const deleteFavoriteURL = (id) => `https://api.thedogapi.com/v1/favourites/${id}?&api_key=61a4ede6-a91f-46d7-8645-00103d1fb759`;


const spanError = document.getElementById('error')

async function LoadRandomDoguis() {
    const res = await fetch(RandomURL);
    const data = await res.json();
    console.log('random')
    console.log(data)

    if (res.status !== 200) {  
        spanError.innerHTML = "ther was a errrrror" + res.status + data.message; 
    } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoriteDoguis(data[0].id);
    btn2.onclick = () => saveFavoriteDoguis(data[1].id);
   }
}

async function LoadFavoritesDoguis() {
    const res = await fetch(FavoriteURL, {
        method: 'GET', 
        headers: {
            'X-API-KEY':'61a4ede6-a91f-46d7-8645-00103d1fb759',
        },
    });
    const data = await res.json();
    console.log('favorites')
    console.log(data)
     if (res.status !== 200) {  
        spanError.innerHTML = "ther was a error:" + res.status + data.message; 
    } else {
        const section = document.getElementById('favoriteDoguis');
      
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favorites Doguis');
        h2.appendChild(h2Text);
        section.appendChild(h2);
        data.forEach(dogui => {
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('put out Dogui from favorites');
            
            btn.appendChild(btnText);
            img.src = dogui.image.url
            img.width = 150;
            btn.onclick = () => deleteFavoriteDogui(dogui.id)
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
            
        });
    }
    
}
async function saveFavoriteDoguis(id) { 
    const res = await fetch(FavoriteURL, {
    method: 'POST',
     headers: {  
         'Content-Type': 'application/json',
         'X-API-KEY':'61a4ede6-a91f-46d7-8645-00103d1fb759',
     },
     body: JSON.stringify({
         image_id:id 
     }),
    }); 
    const data = await res.json();
    console.log('save');
    console.log(res);

    if (res.status !== 200) {  
        spanError.innerHTML = "ther was a error" + res.status + data.message; 
    } else {
        console.log('dogui save in favorites')
        
    }
    
}

async function deleteFavoriteDogui(id) {
    const res = await fetch(deleteFavoriteURL(id) , {
        method: 'DELETE',
        }); 
        const data = await res.json();
        if (res.status !== 200) {  
            spanError.innerHTML = "ther was a error" + res.status + data.message; 
        } else {
            console.log('dogui out of favorites')
            
        }
}

LoadRandomDoguis();
LoadFavoritesDoguis();
