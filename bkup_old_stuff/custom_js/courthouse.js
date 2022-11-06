jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/courthouse.css? ' + jQuery.now() + '">');

jQuery(document).ready(function() {
  setTimeout(function() {
    resizeBlockRowWrappers(); 
  }, 500);
  jQuery(window).resize(function() {
    resizeBlockRowWrappers(); 
  });
});
  

var resizeBlockRowWrappers = function() {
  if(jQuery(document).width() > 768) {
    return;
  }
  jQuery.each(jQuery('.block_row_wrapper'), function(i, el) {
    var wrapperWidth = jQuery(el).width();
    var originalHeight = jQuery(el).find('.block_row').children().first().width();
    if(jQuery(el).find('.strip').size()) {
      originalHeight += 56;
    }
    var divWidth = 4*(jQuery(el).find('.block_row').children().first().width() + 10);
    var scale = parseFloat(wrapperWidth)/parseFloat(divWidth);
    jQuery(el).css({ transform: 'scale(' + scale + ')', height: scale*originalHeight + 10 });
  });
  var scale = parseFloat(jQuery('div.hst-wrapper').width())/670;
  jQuery('div.hst-wrapper').css({ transform: 'scale(' + scale + ')', height: scale*144, 'transform-origin': 'top left' });

  var scale = parseFloat(jQuery('div.hst-wrapper').width())/508;
  jQuery('div.onpoint-wrappers').css({ transform: 'scale(' + scale + ')', height: scale*239 + 30, 'transform-origin': 'top left' });
};
