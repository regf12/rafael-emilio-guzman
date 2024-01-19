let lang = 'en';
let locale = {
  es: null,
  en: null,
};

/* ------------------------------------------------------------------------ */

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

/* ------------------------------------------------------------------------ */

function getLang() {
  let elementos = document.querySelectorAll('[data-key]');

  actualizarTextos(locale[lang], elementos);
}

function actualizarTextos(json, elementos) {

  for (let elemento of elementos) {
    if (json[elemento.dataset.key]) {
      elemento.textContent = json[elemento.dataset.key];
    }
  }
}

/* ------------------------------------------------------------------------ */

$(document).ready(function() {
  try {
    lang = navigator.language.split('-')[0];
    if (!['es', 'en'].includes(lang)) {
      lang = 'en';
    }
  } catch (error) {
    console.log('error: ', error)
  }

  $('#link-cv').attr('href', `docs/Rafael Guzman Developer (${lang}).pdf`);
  $('#link-cv').attr('download', `Rafael Guzman Developer (${lang}).pdf`);

  fetch(`../locale/${lang || 'en'}.json`)
    .then(response => response.json())
    .then(data => {
      locale[lang] = data;

      getLang();
    });
});