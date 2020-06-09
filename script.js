$(document).ready(() => {

  /* Функции */

  function setCurrentTheme() {
    if (localStorage.getItem('page-theme') === 'white') {
      $('body').addClass('body-white-theme');
      $('.header__btn').addClass('header-btn-white-theme');
      $('.scroll-btn').addClass('scroll-btn-white-theme');
      $('.scroll-btn__arrow').addClass('btn-arrow-white-theme');
      $('.error__image').addClass('error-image-white-theme');
      $('input').prop('checked', true);
    }
    else {
      $('body').addClass('body-black-theme');
      $('.header__btn').addClass('header-btn-black-theme');
      $('.scroll-btn').addClass('scroll-btn-black-theme');
      $('.scroll-btn__arrow').addClass('btn-arrow-black-theme');
      $('.error__image').addClass('error-image-black-theme');
    }
  };

  function scrollToTop() {
    $('html, body').animate({ scrollTop: '0' });
  };

  function updateQuote() {
    $('.error').addClass('hide-section');
    $('.content').removeClass('hide-section');

    fetch('https://api.kanye.rest')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.quote.includes('...')) {
          const validatedQuote = data.quote.replace('...', '... ');
          $('.content__quote').text(validatedQuote);
        } else {
          $('.content__quote').text(data.quote);
        }
      })
      .catch((err) => {
        $('.error').removeClass('hide-section');
        $('.content').addClass('hide-section');
      });
  };

  /* Вызовы функций */

  setCurrentTheme();
  updateQuote();

  /* Обработчики событий */

  $(window).scroll(() => {
    if ($(this).scrollTop() >= 120) {
      $('.scroll-btn').fadeIn('fast','linear');
    }
    else {
      $('.scroll-btn').fadeOut('fast','swing');
    }
  });

  $('.scroll-btn').on('click', scrollToTop);
  $('.header__btn').on('click', updateQuote);

  $('.header__toggle-btn').on('click', () => {
    $('body').toggleClass('body-white-theme');
    $('body').toggleClass('body-black-theme');
    $('.header__btn').toggleClass('header-btn-white-theme');
    $('.header__btn').toggleClass('header-btn-black-theme');
    $('.scroll-btn').toggleClass('scroll-btn-white-theme');
    $('.scroll-btn').toggleClass('scroll-btn-black-theme');
    $('.scroll-btn__arrow').toggleClass('btn-arrow-white-theme');
    $('.scroll-btn__arrow').toggleClass('btn-arrow-black-theme');
    $('.error__image').toggleClass('error-image-white-theme');
    $('.error__image').toggleClass('error-image-black-theme');
    localStorage.setItem('page-theme', $('body').hasClass('body-white-theme') ? 'white' : 'black');
  });

});
