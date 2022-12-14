import {db} from './firebase.js'
import { setDoc,doc  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// Este código selecciona elementos de la página HTML y los asigna a variables
const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

const bannerImage= document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn= document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload')

// Este código agrega un escuchador de eventos al elemento bannerImage que escucha por un evento de cambio. Cuando se dispara el evento, llama a la función uploadImage() con los argumentos bannerImage y 'banner'.
bannerImage.addEventListener('change', ()=>{
uploadImage(bannerImage,'banner');

});

uploadInput.addEventListener('change',()=>{
  uploadImage(uploadInput,'image');
})

/* // Esta función toma dos argumentos: 
un uploadfile (que debería ser un elemento que permita la selección de archivos) 
y un uploadType (que debería ser una cadena de texto). 
Recupera el primer archivo del elemento uploadfile y verifica si es un archivo de imagen. 
Si es así, crea un nuevo objeto FormData y agrega el archivo de imagen a él. 
Luego hace una solicitud fetch al punto final '/upload' con los datos del formulario. 
Si la solicitud es exitosa y el tipo de carga es "image", llama a la función addImage() con los datos recibidos 
y el nombre del archivo como argumentos. 
Si el tipo de carga no es "image", establece la variable bannerPath en la URL de la imagen cargada y establece 
la imagen de fondo del elemento banner en la imagen cargada..*/
const uploadImage = (uploadfile, uploadType)=>{
  const[file] = uploadfile.files;
  if(file && file.type.includes('image')){
    const formdata = new FormData();
    formdata.append('image',file);

    fetch('/upload',{
      method:'post',
      body:formdata
    }).then(res=> res.json())
    .then(data=>{
      if(uploadType == "image"){
        addImage(data,file.name);
      }else{
        bannerPath = `${location.origin}/${data}`
        banner.style.backgroundImage = `url("${bannerPath}")`
      }
    })
  }else{
    alert('uload Image Only');
  }
}


/* // Esta función toma dos argumentos: una ruta de imagen (imagepath) y un texto alternativo (alt). 
Recupera la posición actual del cursor en el elemento articleFeild y crea un texto a insertar utilizando 
la ruta de la imagen y el texto alternativo como parte del marcado Markdown. Luego inserta el texto en el 
elemento articleFeild en la posición del cursor.*/
const addImage = (imagepath , alt) =>{
  let curPos = articleFeild.selectionStart;
  let texToInsert = `\r![${alt}](${imagepath})\r`;
  articleFeild.value = articleFeild.value.slice(0,curPos) + texToInsert +
  articleFeild.value.slice(curPos)
}

//creamos un array de meses para poner como dato en la base de datos 
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
publishBtn.addEventListener('click', async ()=>{
  if(articleFeild.value.length && blogTitleField.value.length){
    //generar id
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let blogTitle = blogTitleField.value.split(" ").join("-");
    let id = '';
    for(let i = 0 ; i< 4; i++){
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    // setting up docName
    let docName = `${blogTitle}-${id}`
    let date = new Date(); // para publicar la info

    //acceso a firestore con la variable db
    try{
      const docRef = await setDoc(doc(db,'blogs',docName),{
        title: blogTitleField.value,
        article: articleFeild.value,
        bannerImage:bannerPath,
        publisedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
      })
      location.href= `/${docName}`;
    }catch(e){
      console.error(e);
    }
  }
})