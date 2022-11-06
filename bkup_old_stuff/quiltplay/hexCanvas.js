var hexCanvas = {
  init: function(konaOptionsHtml) {
    hexCanvas.redrawGrid();
    $('select#hexborder,select#hexpadding').html(konaOptionsHtml).select2({
      templateSelection: quiltPlay.resultFormat,
      templateResult: quiltPlay.colorFormat
    });
    $('#sliderHexBorder,#sliderHexPadding').slider({}); 
    $('select#hexborder,#sliderHexBorder').on('change', function() {
      hexCanvas.setBorder();
    });
    $('#sliderHexPadding').on('change', function() {
      hexCanvas.redrawGrid();
    });
  },
  hexSize: function() {
    return 50;
  },
  setBorder: function() {
    if($('#hexborder').val() !== null && konaColors[$('#hexborder').val()] !== undefined && parseInt($('#sliderHexBorder').val()) != 0) {
      d3.select('#hexcanvas svg').attr('style', 'border: ' + $('#sliderHexBorder').val() + 'px solid ' + konaColors[$('#hexborder').val()]);
    } else {
      d3.select('#hexcanvas svg').attr('style', '');
    }
  },
  redrawGrid: function() {
    var storedValues = {};
    d3.selectAll('#hexcanvas .filled').each(function(a) {
      storedValues[d3.select(this).attr('class')] = d3.select(this).attr('fill');
    });

    d3.select('#hexcanvas').select('svg').remove();
        
    var width = quiltPlay.blockCols() * quiltPlay.currentUnits() * quiltPlay.squareSize();
    var height = quiltPlay.blockRows() * quiltPlay.currentUnits() * quiltPlay.squareSize()
    $('#hexcanvas').width($('#hexcanvas').parent().width());


    svg = d3.select('#hexcanvas').append('svg').attr({
      width: width,
      height: height,
      viewBox: '0 0 ' + width + ' ' + height,
      preserveAspectRatio: 'xMinYMin'
    });
    var fill = '#FFFFFF'
    if($('#hexpadding').val() !== null && konaColors[$('#hexpadding').val()] !== undefined && parseInt($('#sliderHexPadding').val()) != 0) {
      fill = konaColors[$('#hexpadding').val()];
    }
    svg.append('rect').attr({
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: fill
    })

    hexCanvas.setBorder();

    var hexSize = hexCanvas.hexSize();
    var height = hexSize/2*Math.sqrt(3);
    var padding = $('input#sliderHexPadding').val();

    _.times(50, function(row) {
      _.times(50, function(col) {
          var shiftX = (col - 1)*hexSize/2 + padding*col;
          var shiftY = row*height + padding*row;
          var transform = 'translate(' + shiftX + ',' + shiftY + ')';
          if((row%2 + col%2)%2 == 1) { 
            shiftY += height;
            transform = 'translate(' + shiftX + ',' + shiftY + ') scale(1,-1)';
          }
          var points = '0,0 ' + hexSize + ',0 ' + hexSize/2 + ',' + height;
          svg.append('polygon').attr({
            points: points,
            fill: '#FFFFFF',
            stroke: quiltPlay.gray,
            strokeWidth: '5px',
            transform: transform,
            class: 'hexPlay row-' + row + ' col-' + col
          });
      });
    });

    $.each(storedValues, function(selector, fillValue) {
      var modifiedSelector = '.' + selector.replace(/ filled/, '').replace(/ /g, '.');
      var $element = d3.select(modifiedSelector);
      if($element.size() > 0) {
        $element.attr('fill', fillValue).classed('filled', true);
      }
    });

    d3.selectAll('.hexPlay').on('mouseover', function(d, i) {
      var $element = d3.select(this);
      $element.attr('previous-fill', $element.attr('fill'));
      if(quiltPlay.currentColor() == $element.attr('fill')) {
        $element.attr('fill', '#FFFFFF');
      } else {
        $element.attr('fill', quiltPlay.currentColor());
      }
    }).on('mouseout', function(d, i) {
      var $element = d3.select(this);
      $element.attr('fill', $element.attr('previous-fill'))
    }).on('click', function(d, i) {
      hexCanvas.clickChange(d3.select(this), quiltPlay.currentColor());
    });
  },
  clickChange: function($element, color) {
    if($element.attr('previous-fill') == 'none' || $element.attr('previous-fill') != color) {
      $element.attr('fill', color).classed('filled', true);
      $element.attr('previous-fill', color);;
    } else {
      $element.attr('fill', 'none').classed('filled', false);
      $element.attr('previous-fill', '#FFFFFF');
    }
    quiltPlay.updateRecentSwatches();
  },
};
