  (function ($) {
  
  "use strict";

    // AOS ANIMATIONS
    AOS.init();

    // STORE COLLAPSED NAVBAR HEIGHT
    var collapsedNavbarHeight = 0;
    $(document).ready(function() {
        // Ensure navbar is collapsed to get accurate height
        $("#navbarNav").removeClass('show');
        collapsedNavbarHeight = $('.navbar').outerHeight() + 20; // Add 20px buffer for better visibility
    });

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // NAVBAR TOGGLE SCROLL HANDLER
    $('.navbar-toggler').click(function() {
        var $navbarCollapse = $('#navbarNav');
        var $navbar = $('.navbar');
        
        // Check if navbar is currently collapsed (about to expand)
        if (!$navbarCollapse.hasClass('show')) {
            setTimeout(function() {
                var navbarBottom = $navbar.offset().top + $navbar.outerHeight();
                var viewportBottom = $(window).scrollTop() + $(window).height();
                
                // If navbar extends beyond viewport, scroll to show it
                if (navbarBottom > viewportBottom) {
                    $('html, body').animate({
                        scrollTop: navbarBottom - $(window).height() + 20
                    }, 300);
                }
            }, 350); // Wait for Bootstrap collapse animation
        }
    });

    // SCROLLSPY INITIALIZATION
    $(document).ready(function() {
        $('body').scrollspy({
            target: '.navbar',
            offset: collapsedNavbarHeight
        });
    });

    // SMOOTH SCROLLING FOR ANCHOR LINKS
    $('a[href*="#"]').click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          
          // Always use collapsed navbar height for consistent scrolling
          $('html, body').animate({
            scrollTop: target.offset().top - collapsedNavbarHeight
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

  
