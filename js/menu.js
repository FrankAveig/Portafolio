const main = document.getElementById('main');
const habilidades = document.getElementById('habilidades');
const proyectos = document.getElementById('proyectos');
const contacto = document.getElementById('contacto');

function showMain (){
  if(main.classList.contains('hide')){
    main.classList.remove('hide')
    habilidades.classList.add('hide')
    proyectos.classList.add('hide')
    contacto.classList.add('hide')
    
  }
}

function showHabilidades(){
  if(habilidades.classList.contains('hide')){
    habilidades.classList.remove('hide')
    main.classList.add('hide')
    proyectos.classList.add('hide')
    contacto.classList.add('hide')
    
  }
}

function showProyectos(){
  if(proyectos.classList.contains('hide')){
    proyectos.classList.remove('hide')
    main.classList.add('hide')
    habilidades.classList.add('hide')
    contacto.classList.add('hide')
    
  }
}

function showContacto(){
  if(contacto.classList.contains('hide')){
    contacto.classList.remove('hide')
    main.classList.add('hide')
    habilidades.classList.add('hide')
    proyectos.classList.add('hide')
    
  }
}