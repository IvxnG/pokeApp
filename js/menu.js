document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');
  
    menuToggle.addEventListener('click', function () {
      menu.classList.toggle('active');
    });
  
    document.addEventListener('click', function (e) {
      const target = e.target;
  
      if (!menu.contains(target) && !menuToggle.contains(target)) {
        menu.classList.remove('active');
      }
    });
  
    // Cerrar el menú al hacer clic en un elemento del menú
    menu.addEventListener('click', function () {
      menu.classList.remove('active');
    });
});