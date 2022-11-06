jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/colorWheel.css? ' + jQuery.now() + '">');
jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/colorPalette.css? ' + jQuery.now() + '">');

var $ = jQuery;
var palette = {};
var borderSize = 150;

$(function() {
  const colorThief = new ColorThief();

  if(jQuery(window).width() < 960) {
    borderSize = 90;
    jQuery('#result').html('');
    jQuery('#sidebar').css({ width: '100%', margin: '0px', padding: '20px 0px 0px 0px' }).insertAfter(jQuery('#result'));
  }
  jQuery('.post-comments,.post-related,.post-pagination').remove();

  $.each(fabricSwatches, function(key, swatchData) {
    if(jQuery('#limit-to a.read-more[data-value="' + key + '"]').size() == 0) {
      jQuery('#limit-to').append(jQuery('<a href="#" class="limit-by read-more" data-value="' + key + '">' + swatchData.label + '</a>'));
    }
    jQuery('#limit-to a:first').addClass('selected');
  });

  $('#harmony-choice a').on('click', function(e) {
    e.preventDefault();
    var $link = jQuery(this);
    $link.toggleClass('selected');
    $('#result div.' + $link.attr('data-value') + ',#result .' + $link.attr('data-value') + '-detail').toggle();
    if($('#harmony-choice a.selected').size() == 2) {
      $('#result div.solo').removeClass('solo');
    } else if($('#harmony-choice a.selected').size() == 1) {
      $('#result div.' + $('#harmony-choice a.selected').attr('data-value')).addClass('solo');
    }
  });

  jQuery('a.limit-by').on('click', function(e) {
    e.preventDefault();
    var $link = jQuery(this);
    $link.toggleClass('selected');
    $link.siblings('a.selected').removeClass('selected');
    var selectedLine = $('#limit-to a.selected').attr('data-value');
    $('#harmony-choice a').not('.selected').addClass('selected');
    $.each($('#result .swatch'), function(i, el) {
      var closestMatch = Object.keys(fabricSwatches[selectedLine].swatches)[0];
      var closestDistance = 10000;
      $.each(Object.keys(fabricSwatches[selectedLine].swatches), function(j, swatchKey) {
        var distance = chroma.distance(fabricSwatches[selectedLine].swatches[swatchKey], $(el).find('.palette').attr('data-color'));
        if(distance < closestDistance) {
          closestDistance = distance;
          closestMatch = swatchKey;
        }   
      });
      var matchExtraCss = '';
      if(chroma(fabricSwatches[selectedLine].swatches[closestMatch]).hsv()[2] < 0.5) {
        matchExtraCss = 'color:#FFF;'
      }
      $(el).find('.match').attr('style', matchExtraCss + 'border-bottom:' + borderSize + 'px solid ' + fabricSwatches[selectedLine].swatches[closestMatch]);
      $(el).find('.detail').html($(el).find('.detail').html().replace(/<\/div>.*/, '</div><div class="match-detail" style="' + matchExtraCss + '">' + closestMatch + '</div>'));
    });
  });


  $('#file-input').change(function(e) {
    var file = e.target.files[0],
      imageType = /image.*/;

    if (!file.type.match(imageType))
      return;

      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
  });

  function fileOnload(e) {
    var $img = $('<img>', { src: e.target.result });
    $img.load(function() {
      palette = {};
      $('#harmony-choice a').not('.selected').addClass('selected');
      $('#canvas').animate({ height: '100%' });

      var selectedLine = $('#limit-to a.selected').attr('data-value');
      var canvas = $('#canvas')[0];
      var context = canvas.getContext('2d');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      context.drawImage(this, 0, 0);
      $('div#result,div#match-result').html('');
      var colorThiefPalette = colorThief.getPalette(document.querySelector('#canvas'), 30, 5);
      $.each(colorThiefPalette, function(i, color) {
        var chromaColor = chroma(color);
        var foundCloseColor = false;
        $.each(palette, function(j, existingColor) {
          if(chroma.distance(existingColor, chromaColor) < 15) {
            foundCloseColor = true;
          }
        });
        if(!foundCloseColor) {
          palette[i] = chromaColor;
          var paletteExtraCss = '';
          if(chromaColor.hsv()[2] < 0.5) {
            paletteExtraCss = 'color:#FFF;'
          }

          var closestMatch = Object.keys(fabricSwatches[selectedLine].swatches)[0];
          var closestDistance = 10000;
          $.each(Object.keys(fabricSwatches[selectedLine].swatches), function(j, swatchKey) {
            var distance = chroma.distance(fabricSwatches[selectedLine].swatches[swatchKey], chromaColor);
            if(distance < closestDistance) {
              closestDistance = distance;
              closestMatch = swatchKey;
            }   
          });
          var matchExtraCss = '';
          if(chroma(fabricSwatches[selectedLine].swatches[closestMatch]).hsv()[2] < 0.5) {
            matchExtraCss = 'color:#FFF;'
          }
         
          var html = '<div class="palette" data-color="' + chromaColor + '" style="' + paletteExtraCss + 'border-top:' + borderSize + 'px solid rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ');"></div>';
          html += '<div class="match" style="' + matchExtraCss + 'border-bottom:' + borderSize + 'px solid ' + fabricSwatches[selectedLine].swatches[closestMatch] + '"></div>';
          html += '<div class="detail"><div class="palette-detail" style="' + paletteExtraCss + '">Sat: ' + chromaColor.hsv()[1].toFixed(2) + ' <br />Value: ' + chromaColor.hsv()[2].toFixed(2) + '</div><div class="match-detail" style="' + matchExtraCss + '">' + closestMatch + '</div></div>';
          var $swatch = '<div class="swatch">' + html + '</div>';
          $('div#result').append($swatch);
        }
      });
    });
  }

});
