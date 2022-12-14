// Importamos la librería de express
const express = require('express');
// Importamos la librería de path
const path = require('path');
// Importamos la librería de fileupload
const fileupload = require('express-fileupload')

// Creamos una variable que contenga la ruta completa a la carpeta 'public'
let initial_path = path.join(__dirname, './blogs/public');
let home_path =  path.join(__dirname, '/public')
// Creamos una aplicación de express
const app = express();

// Indicamos que se servirán archivos estáticos desde la carpeta 'public'
app.use(express.static(home_path));
app.use(express.static(initial_path));

// Habilitamos el middleware de fileupload en la aplicación
app.use(fileupload());

// Establecemos una ruta para la página principal del sitio web, que enviará el archivo 'home.js' desde la carpeta 'public' al cliente que realice la solicitud
app.get('/', (req, res) => {
  res.sendFile(path.join(home_path, 'index.html'));
});
app.get('/blogs', (req, res) => {
  res.sendFile(path.join(initial_path, 'home.html'));
});

// Establecemos una ruta para la página del editor, que enviará el archivo 'editor.html' desde la carpeta 'public' al cliente que realice la solicitud
app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, 'editor.html'));
});

/// Establecemos una ruta para la carga de archivos, que recibirá un archivo enviado por el cliente y lo guardará en la carpeta 'public/uploads' con un nombre único
app.post('/upload',(req,res)=>{
  // Obtenemos el archivo enviado en la solicitud
  let file = req.files.image; 
  // Creamos una nueva fecha
  let date = new Date();
  // Creamos un nombre para la imagen basado en la fecha y hora actuales y el nombre del archivo enviado por el cliente
  let imagename= date.getDate() + date.getTime() + file.name
   // Creamos una ruta completa para la imagen en la carpeta 'p ublic/uploads'
  let path = './blogs/public/uploads/' + imagename;
  // Guardamos el archivo en la ruta especificada
  file.mv(path,(err,result)=>{
    if(err){
      // Si hay un error al guardar la imagen, lanzamos una excepción throw err;
      throw err;
    }else{
       // Si la imagen se guarda correctamente, devolvemos la ruta completa de la imagen al cliente que realizó la solicitud
      res.json(`uploads/${imagename}`)
    }
  })
})

app.get('/:blog',(req,res)=>{
  res.sendFile(path.join(initial_path,'blog.html'));
})

app.use((req,res)=>{
  res.json('404')
})

// Iniciamos el servidor en el puerto 3000
app.listen('3000', () => {
console.log('...listening');
}); 