// Carrusel 1
const imagenes = [
  "../../contenido/img-pn/contenido-index/longines-conquest 1.jpg",
  "../../contenido/img-pn/contenido-index/longines-conquest 2.jpg",
  "../../contenido/img-pn/contenido-index/longines-grande-classique.jpg"
];
let indice = 0;
function mostrarImagen() {
  const img = document.getElementById("imagen-nov");
  if (img) img.src = imagenes[indice];
}
function siguiente() {
  indice = (indice + 1) % imagenes.length;
  mostrarImagen();
}
function anterior() {
  indice = (indice - 1 + imagenes.length) % imagenes.length;
  mostrarImagen();
}

// Carrusel 2
const imagenes2 = [
  "../../contenido/img-pn/contenido-index/traje 1.jpg",
  "../../contenido/img-pn/contenido-index/traje 2.jpg",
  "../../contenido/img-pn/contenido-index/traje 3.jpg"
];
let indice2 = 0;
function mostrarImagen2() {
  const img = document.getElementById("imagen-nov2");
  if (img) img.src = imagenes2[indice2];
}
function siguiente2() {
  indice2 = (indice2 + 1) % imagenes2.length;
  mostrarImagen2();
}
function anterior2() {
  indice2 = (indice2 - 1 + imagenes2.length) % imagenes2.length;
  mostrarImagen2();
}

// Lógica de login modal (solo si existen los elementos)
const boton1 = document.getElementById('boton1');
const loginForm = document.getElementById('loginForm');
const backdrop = document.getElementById('backdrop');

if (boton1 && loginForm && backdrop) {
  boton1.addEventListener('click', () => {
    const rect = boton1.getBoundingClientRect();
    loginForm.style.top = `${rect.bottom + window.scrollY + 5}px`;
    loginForm.style.right = `${window.innerWidth - rect.right}px`;
    loginForm.style.display = 'block';
    backdrop.style.display = 'block';
  });

  backdrop.addEventListener('click', () => {
    loginForm.style.display = 'none';
    backdrop.style.display = 'none';
  });
}

// Validación de formulario de registro (solo si existen los campos)
function validarFormulario() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const errorMensaje = document.getElementById("errorMensaje");

  if (password && confirmPassword && errorMensaje) {
    if (password.value !== confirmPassword.value) {
      errorMensaje.textContent = "Las contraseñas no coinciden.";
      return false;
    }
    errorMensaje.textContent = "";
    return true;
  }
  return false;
}

// Botón de redirección (solo si existe)
const irBtn = document.getElementById("ir");
if (irBtn) {
  irBtn.addEventListener("click", function () {
    window.location.href = "pagina.html";
  });
}
