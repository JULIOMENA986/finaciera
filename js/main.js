// ===============================
// LOAD COMPONENTS
// ===============================
function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch(err => console.error("Error cargando componente:", err));
}

// ===============================
// NAVBAR
// ===============================
function initNavbar() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

// ===============================
// SMOOTH SCROLL
// ===============================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===============================
// PRESENCIA (MAPA)
// ===============================
function initPresence() {
  const items = document.querySelectorAll('.presence__item');
  const maps = document.querySelectorAll('.map-state');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const state = item.getAttribute('data-state');

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      maps.forEach(map => {
        map.classList.remove('active');

        if (map.getAttribute('data-state') === state) {
          map.classList.add('active');
        }
      });
    });
  });
}

// ===============================
// FORMULARIO
// ===============================
function initForm() {
  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");

  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const apellido = form.apellido.value.trim();
    const poblacion = form.poblacion.value.trim();
    const telefono = form.telefono.value.trim();

    if (!nombre || !apellido || !poblacion || !telefono) {
      message.textContent = "⚠️ Todos los campos son obligatorios";
      message.style.color = "red";
      return;
    }

    if (!/^[0-9]{10}$/.test(telefono)) {
      message.textContent = "⚠️ El teléfono debe tener 10 dígitos";
      message.style.color = "red";
      return;
    }

    // Simulación envío
    console.log({ nombre, apellido, poblacion, telefono });

    message.textContent = "✅ Enviado correctamente";
    message.style.color = "green";

    form.reset();
  });
}

// ===============================
// INIT GLOBAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // NAV
  loadComponent("nav-container", "componentes/nav.html", initNavbar);

  // FOOTER
  loadComponent("footer-container", "componentes/footer.html");

  // FUNCIONES
  initSmoothScroll();
  initPresence();
  initForm();

});