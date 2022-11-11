function isMobile() {
  if (sessionStorage.desktop)
      return false;
  else if (localStorage.mobile)
      return true;
  var mobile2 = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
  for (var i in mobile2)
      if (navigator.userAgent.toLowerCase().indexOf(mobile2[i].toLowerCase()) > 0) return true;
  return false;
}

const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop2 = 'https://web.whatsapp.com/';
const urlMobile2 = 'whatsapp://';
const telefono2 = '593991269373';

formulario.addEventListener('submit', (event) => {
  event.preventDefault()
  buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>'
  buttonSubmit.disabled = true
  setTimeout(() => {
  let nombre = document.querySelector('#nombre').value
  let apellidos = document.querySelector('#apellidos').value
  let email = document.querySelector('#email').value
  let comentarios = document.getElementById('comentarios').value


  let mensaje2 = 'send?phone=' + telefono2 + '&text=*Desde el portafolio*%0A%0A*Nombres*%0A' +  nombre + '%0A%0A*Apellidos*%0A' + apellidos  +  '%0A%0A*Correo electrónico*%0A' + email +'%0A%0A*Motivo*%0A'+comentarios + ''
  if(isMobile()) {
    window.open(urlMobile2 + mensaje2, '_blank')
  }else{
      window.open(urlDesktop2 + mensaje2, '_blank')
  }
  buttonSubmit2.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp'
  buttonSubmit2.disabled = false
}, 1000);
});