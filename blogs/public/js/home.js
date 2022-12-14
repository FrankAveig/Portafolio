import {db} from './firebase.js'
import { collection,getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
const blogSection = document.querySelector('.blogs-section');


const createBlog= (blog)=>{
  let data = blog.data();
  blogSection.innerHTML+=`
  <div class="blog-card">
    <img src="${data.bannerImage}" class="blog-image" alt="">
    <h2 class="blog-tittle">${data.title.substring(0,100)+ '...'}</h2>
    <p class="blog-overview">${data.article.substring(0,200)+ '...'}</p>
    <a href="/${blog.id}" class="btn dark">read</a>
  </div>`
}

const blogs = async() => await getDocs(collection(db, "blogs"));
blogs.forEach((blog) => {
  if(blog.id !=decodeURI(location.pathname.split('/').pop())){
    createBlog(blog)
  }
});