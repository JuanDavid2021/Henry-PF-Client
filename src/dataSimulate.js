const p1 = JSON.parse(`{
  "id":1,
  "nombre":"bife",
  "precio": 900,
  "fotos":[
    "https://static.wixstatic.com/media/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.png/v1/fill/w_278,h_278,al_c,q_85,usm_0.66_1.00_0.01/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.webp",
    "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-1.jpg",
    "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-2.jpg"
  ],
  "presentacion":"Some quick example text to build on the card title and make up the bulk of the card's content."}`)

  const p2 = JSON.parse(`{
    "id":2,
    "nombre": "costillar",
    "precio": 850,
    "fotos":[
      "https://static.wixstatic.com/media/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.png/v1/fill/w_278,h_278,al_c,q_85,usm_0.66_1.00_0.01/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.webp", 
      "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-1.jpg",
      "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-2.jpg"
    ],
    "presentacion":
      "Some quick example text to build on the card title and make up the bulk of the card's content."
  }`)

  const p3 = JSON.parse(`{
    "id":3,
    "nombre": "lomo",
    "precio": 950,
    "fotos": [
      "https://static.wixstatic.com/media/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.png/v1/fill/w_278,h_278,al_c,q_85,usm_0.66_1.00_0.01/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.webp", 
      "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-1.jpg",
      "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-2.jpg"
    ],
    "presentacion":
      "Some quick example text to build on the card title and make up the bulk of the card's content."
  }`)

  const p4 = JSON.parse(`{
    "id":4,
    "nombre": "bola de lomo",
    "precio": 850,
    "fotos":[
      "https://static.wixstatic.com/media/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.png/v1/fill/w_278,h_278,al_c,q_85,usm_0.66_1.00_0.01/91fc24_8b6b6cd3d7ad49ed9695daa84257494a~mv2.webp", 
      "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-1.jpg",
      "http://azim.commonsupport.com/Carneshop/assets/images/resource/shop/shop-2.jpg"
    ],
    "presentacion":
      "Some quick example text to build on the card title and make up the bulk of the card's content."
  }`)


const arrProductos = [p1,p2,p3,p4];

export default arrProductos