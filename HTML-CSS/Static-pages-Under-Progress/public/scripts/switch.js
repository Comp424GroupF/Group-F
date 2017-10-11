(function($) {
    $('.nav-pane li').click(function() {
      $(this).addClass('active').siblings('li').removeClass('active');
      $('.section-content:nth-of-type('+$(this).data('rel')+')').stop().fadeIn(400, 'linear').siblings('.section-content').stop().fadeOut(500, 'linear'); 
    });
  })(jQuery);

  (function($) {
    $('.site-nav li').click(function() {
      $(this).addClass('active').siblings('li').removeClass('active');
      $('.section-content:nth-of-type('+$(this).data('rel')+')').stop().fadeIn(400, 'linear').siblings('.section-content').stop().fadeOut(500, 'linear'); 
    });
  })(jQuery);