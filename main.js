 const api = axios.create({
     baseURL: 'https://api.thedogapi.com/v1'
 });
 api.defaults.headers.common['X-API-KEY'] = '61a4ede6-a91f-46d7-8645-00103d1fb759';
 const RandomURL = 'https://api.thedogapi.com/v1/images/search?limit=10';
 const FavoriteURL = 'https://api.thedogapi.com/v1/favourites';
 const UploadURL = 'https://api.thedogapi.com/v1/images/upload';
 const deleteFavoriteURL = (id) => `https://api.thedogapi.com/v1/favourites/${id}?&api_key=61a4ede6-a91f-46d7-8645-00103d1fb759`;


const spanError = document.getElementById('error')

async function LoadRandomDoggys() {
    const res = await fetch(RandomURL);
    const data = await res.json();
    console.log('random')
    console.log(data)

    if (res.status !== 200) {  
        spanError.innerHTML = `"there was a errrrror"${res.status}${data.message}` 
    } else {

 
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const img5 = document.getElementById('img5');
    const img6 = document.getElementById('img6');
    const img7 = document.getElementById('img7');
    const img8 = document.getElementById('img8');
    const img9 = document.getElementById('img9');
    const img10 = document.getElementById('img10');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
    const btn5 = document.getElementById('btn5');
    const btn6 = document.getElementById('btn6');
    const btn7 = document.getElementById('btn7');
    const btn8 = document.getElementById('btn8');
    const btn9 = document.getElementById('btn9');
    const btn10 = document.getElementById('btn10');



    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    img5.src = data[4].url;
    img6.src = data[5].url;
    img7.src = data[6].url;
    img8.src = data[7].url;
    img9.src = data[8].url;
    img10.src = data[9].url;

   

    btn1.onclick = () => saveFavoriteDoggys(data[0].id);
    btn2.onclick = () => saveFavoriteDoggys(data[1].id);
    btn3.onclick = () => saveFavoriteDoggys(data[2].id);
    btn4.onclick = () => saveFavoriteDoggys(data[3].id);
    btn5.onclick = () => saveFavoriteDoggys(data[4].id);
    btn6.onclick = () => saveFavoriteDoggys(data[5].id);
    btn7.onclick = () => saveFavoriteDoggys(data[6].id);
    btn8.onclick = () => saveFavoriteDoggys(data[7].id);
    btn9.onclick = () => saveFavoriteDoggys(data[8].id);
    btn10.onclick = () => saveFavoriteDoggys(data[9].id);
   }
}

async function LoadFavoritesDoggys() {
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
        spanError.innerHTML = `"ther was a error:" ${res.status}${data.message}` 
    } else {
        const section = document.getElementById('favoriteDoggys')
        section.innerHTML = "";  ////<---- VERY IMPORTANT TO NOT DUPLICATE THE PAGE

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favorites Doggys');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(doggy => {    
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnDel = document.createElement('span');
           
            
            
            img.src = doggy.image.url
            img.width = 150;
            btn.appendChild(btnDel);
            btn.onclick = () => deleteFavoriteDoggy(doggy.id);
     
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
    
}
async function saveFavoriteDoggys(id) { 
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });
   /*  const res = await fetch(FavoriteURL, {
    method: 'POST',
     headers: {  
         'Content-Type': 'application/json',
         'X-API-KEY':'61a4ede6-a91f-46d7-8645-00103d1fb759', // antigua forma de realizar la solitud sin axios
     },
     body: JSON.stringify({
         image_id:id 
     }),
    }); 
    const data = await res.json(); */

    console.log('save');

    if (status !== 200) {  
        spanError.innerHTML = `"there was a error" ${res.status}${data.message}`
    } else {
        console.log('doggy save in favorites')
        LoadFavoritesDoggys();
    }
}

async function deleteFavoriteDoggy(id) {
    const res = await fetch(deleteFavoriteURL(id) , {
        method: 'DELETE',
        headers: {
            'X-API-KEY':'61a4ede6-a91f-46d7-8645-00103d1fb759',
        }
        }); 
        const data = await res.json();

        if (res.status !== 200) {  
            spanError.innerHTML = `"there was a error" ${res.status}${data.message}`
        } else {
            console.log('doggy out of favorites')
            LoadFavoritesDoggys();
        }
}

async function uploadDoggyPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(UploadURL, {
        method: 'POST',
        headers: {
          /*   'Content-Type': 'multipart/form-data', */
            'X-API-KEY':'61a4ede6-a91f-46d7-8645-00103d1fb759',
        },
        body: formData,
     })
     const data = await res.json();

     if (res.status !== 200) {  
        spanError.innerHTML = `"there was a error" ${res.status}${data.message}`
        console.log('picture uploaded')
        console.log({data});
        console.log(data.url);
        saveFavoriteDoggys(data.id)
    }
}
LoadRandomDoggys();
LoadFavoritesDoggys();
