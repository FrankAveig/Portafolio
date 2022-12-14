/* En este código, se está utilizando la propiedad "pathname" del objeto 
"location" del navegador para obtener la parte de la ruta de acceso de la 
URL actual. Luego, se usa el método split() para dividir la ruta en una 
matriz de segmentos de ruta separados por "/", y se usa el método pop() 
para extraer el último elemento de la matriz. Finalmente, se utiliza la 
función decodeURI() para decodificar el último segmento de la ruta y 
guardarlo en la variable "blogId".

Esto se está haciendo para extraer el ID del blog 
del último segmento de la ruta de acceso de la URL 
actual. Por ejemplo, si la URL actual es 
"https://example.com/blogs/my-blog-id", la variable "blogId" 
se establecerá en "my-blog-id". Esto se puede usar, por ejemplo, 
para cargar el contenido del blog correspondiente desde la base de 
datos de Firestore.*/ 
import {db} from './firebase.js'
import {doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"; 
let blogId = decodeURI(location.pathname.split('/').pop());

const docRef = doc(db, "blogs", blogId);
const docSnap = async() => await getDoc(docRef);

const addArticle = (ele,data)=>{
  data = data.split('\n').filter(item=> item.length)
  data.forEach(item=>{
    if(item[0] == '#'){
      let hCount = 0;
      let i = 0;
      while(item[i]== '#'){
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      ele.innerHTML+= `<${tag}>${item.slice(hCount, item.length)}<${tag}>`;
    }
      else if(item[0]== "!" && item[1] == "["){
        let separator;
        for (let i = 0; i<= item.length; i++){
          if(item[i] == "]" && item[i + 1]=="(" && item[item.length - 1]==")"){
            separator=i;
          }
        }
        let alt = item.slice(2,separator);
        let src = item.slice(separator + 2, item.length -1 )
        console.log(src)
        ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`
      }
    else{
      ele.innerHTML+= `<p>${item}</p>`
    }
  })
}


const setupBlog = (data)=>{
  const banner = document.querySelector('.banner')
  const blogTitle = document.querySelector('.title')
  const titleTag = document.querySelector('title')
  const publish = document.querySelector('.published')
  banner.style.backgroundImage = `url(${data.bannerImage})`
  titleTag.innerHTML += blogTitle.innerHTML = data.title;
  console.log(data)
  publish.innerHTML += data.publisedAt;
  const article = document.querySelector('.article');
  addArticle(article, data.article)
}



if (docSnap.exists()) {
  setupBlog(docSnap.data())
} else {
  // doc.data() will be undefined in this case
  location.remplace('/');
}


