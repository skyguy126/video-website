  (function ($) {
  
  "use strict";

    // AOS ANIMATIONS
    AOS.init();

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // SCROLLSPY INITIALIZATION
    $('body').scrollspy({
        target: '.navbar',
        offset: 66
    });

    // SMOOTH SCROLLING FOR ANCHOR LINKS
    $('a[href*="#"]').click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 66
          }, 1000);
          
          // Update active state manually after scroll
          setTimeout(function() {
            $('.navbar-nav .nav-item').removeClass('active');
            $('a[href="' + target.selector + '"]').parent().addClass('active');
          }, 1000);
        }
      }
    });
    
  })(window.jQuery);

  
