var $ = jQuery;

d3.selection.prototype.moveToFront = function() {  
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};
d3.selection.prototype.moveToBack = function() {  
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
    } 
  });
};


var quiltPlay = {
  gray: '#D4D4D4',
  reverseKonaLookup: {},
  konaColorHexes: [],
  currentColor: function() {
    return konaColors[$('#swatches').val()];
  },
  blockRows: function() {
    return parseInt($('#sliderRows').val());
  },
  blockCols: function() {
    return parseInt($('#sliderCols').val());
  },
  squareSize: function() {
    return 25;
  },
  currentUnits: function() {
    return $('input#currentUnits').val();
  },
  colorFormat: function(color) {
      return $('<span><span class="swatch" style="background-color:' + konaColors[color.text] + '"></span>');
  },
  resultFormat: function(color) {
      return $('<span><span class="swatch" style="background-color:' + konaColors[color.text] + '"></span>' + color.text + '</span>');
  },
  clickChange: function($element, color) {
    var $fillElement = d3.select('.' + $element.attr('class').replace(/hovers/, 'fills').split(' ').join('.'));
    if($fillElement.attr('fill') == 'none' || $fillElement.attr('fill') != color) {
      $fillElement.attr('fill', color).classed('filled', true);
      $fillElement.moveToFront();
      $element.attr('fill', color).classed('filled', true);
      $element.attr('previous-fill', color);;
      $element.moveToFront();
    } else {
      $fillElement.attr('fill', 'none').classed('filled', false);
      $fillElement.moveToBack();
      $element.attr('fill', 'none').classed('filled', false);
      $element.attr('previous-fill', '#FFFFFF');
      $element.moveToBack();
    }
    quiltPlay.updateRecentSwatches();
  },
  updateRecentSwatches: function() {
    var swatches = {};
    d3.selectAll('.filled, #canvas svg polygon, #canvas svg rect').each(function(a) {
      swatches[d3.select(this).attr('fill')] = true;
    });
    if($('#border').val() !== null && konaColors[$('#border').val()] !== undefined) {
      swatches[konaColors[$('#border').val()]] = true;
    }
    var content = '';
    $.each(swatches, function(swatch, i) {
      if(quiltPlay.reverseKonaLookup[swatch] !== undefined) {
        content += '<a href="#" title="' + quiltPlay.reverseKonaLookup[swatch] + '" style="background-color:' + swatch + '"></a>';
      }
    });
    $('#recent-swatches').html(content);
  },
  makeOmbre: function() {
    //TODO
  },
  completeSave(id) {
    var svg = d3.select('#' + id).select('svg');
    var svgString = getSVGString(svg.node());
	svgString2Image( svgString, 2*svg.attr('width'), 2*svg.attr('height'), 'png', quiltPlay.save );
  },
  save: function(dataBlob, filesize) {
    saveAs( dataBlob, 'exported.png' );
  },
  init: function() {
    $('#sliderRows,#sliderCols,#currentUnits,#sliderBorder').slider({}); 

    quiltPlay.redrawBlock();

    var optionsHtml = '<option value="white_1387">Select Kona Color</option>';
    $.each(konaColors, function(name, hex) {
      optionsHtml += '<option value=' + name + '></span>' + name + '</option>';
      quiltPlay.reverseKonaLookup[hex] = name;
      quiltPlay.konaColorHexes.push(hex);
    });
    $('select#swatches').html(optionsHtml).select2({
      templateSelection: quiltPlay.resultFormat,
      templateResult: quiltPlay.colorFormat,
      width: 400
    });
    $('select#border').html(optionsHtml).select2({
      templateSelection: quiltPlay.resultFormat,
      templateResult: quiltPlay.colorFormat
    });
    hexCanvas.init(optionsHtml);

    quiltPlay.drawHeader();
    quiltPlay.initListeners();
  },
  initListeners: function() {
    $(document).on('click', '#recent-swatches a', function(e) {
      $('#swatches').val($(this).attr('title')).trigger('change');
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
    });

    $('#on-point,input[name="layout"]').on('click', function() {
      quiltPlay.redrawGrid();
    });

    $('input#currentUnits').on('change', function() {
      quiltPlay.redrawBlock();
      quiltPlay.redrawGrid();
    });
    $('input#sliderRows,input#sliderCols,input#sliderBorder,select#border').on('change', function() {
      quiltPlay.redrawGrid();
    });

    $.each(['random', 'random2', 'canvas', 'clickdraw'], function(i, id) {
      $('#' + id + '-save').on('click', function(e) {
        quiltPlay.completeSave($(this).attr('id').replace(/-save/, ''));
      });
    });

    $('#clickdraw-copy').on('click', function() {
      var width = quiltPlay.clickDrawSvg.attr('width');
      var height = quiltPlay.clickDrawSvg.attr('height');
      d3.select('#canvas').append('svg').attr({
        width: width,
        height: height,
        viewBox: '0 0 ' + width + ' ' + height,
        preserveAspectRatio: 'xMinYMin'
      });
      $('#canvas').html($('#clickdraw').html());

      d3.selectAll('#canvas .blockPlay').on('mouseover', function(d, i) {
        var $element = d3.select(this);
        $element.attr('previous-fill', $element.attr('fill'));
        $element.attr('fill', quiltPlay.currentColor());
      }).on('mouseout', function(d, i) {
        var $element = d3.select(this);
        if($('input[name=colortype]:checked').val() == 'click') {
          $element.attr('fill', $element.attr('previous-fill'))
        } else {
          quiltPlay.updateRecentSwatches();
        }
      }).on('click', function(d, i) {
        d3.select(this).attr('fill', quiltPlay.currentColor()).attr('previous-fill', quiltPlay.currentColor());
        quiltPlay.updateRecentSwatches();
      });
    });
  },
  drawHovers: function(svg, units, halfSize, startingX, startingY, row, col) {
    //top-left
    var points = [];
    points.push(startingX + ',' + startingY + ' ' + (startingX + halfSize) + ',' + startingY + ' ' + startingX + ',' + (startingY + halfSize));
    //top-right
    points.push((startingX + halfSize) + ',' + startingY + ' ' + (startingX + quiltPlay.squareSize()) + ',' + startingY + ' ' + (startingX + quiltPlay.squareSize()) + ',' + (startingY + halfSize));
    //bottom-right
    points.push((startingX + quiltPlay.squareSize()) + ',' + (startingY + halfSize) + ' ' + (startingX + quiltPlay.squareSize()) + ',' + (startingY + quiltPlay.squareSize()) + ' ' + (startingX + halfSize) + ',' + (startingY + quiltPlay.squareSize()));
    //bottom-left
    points.push(startingX + ',' + (startingY + halfSize) + ' ' + startingX + ',' + (startingY + quiltPlay.squareSize()) + ' ' + (startingX + halfSize) + ',' + (startingY + quiltPlay.squareSize()));
 
    $.each(points, function(i, pointSet) {
      svg.append('polygon').attr({
        points: pointSet,
        fill: '#FFFFFF',
        stroke: quiltPlay.gray,
        strokeWidth: '5px',
        class: 'hovers row-' + row + ' col-' + col + ' hst-' + i
      })
    });
    svg.append('rect').attr({
      x: quiltPlay.squareSize()*(col + 0.25),
      y: quiltPlay.squareSize()*(row + 0.25),
      height: halfSize,
      width: halfSize,
      fill: '#FFFFFF',
      stroke: quiltPlay.gray,
      strokeWidth: '5px',
      class: 'hovers row-' + row + ' col-' + col + ' square'
    });

    return points;
  },
  drawFills: function(svg, startingX, startingY, row, col) {
    svg.append('rect').attr({
      x: quiltPlay.squareSize()*col,
      y: quiltPlay.squareSize()*row,
      height: quiltPlay.squareSize(),
      width: quiltPlay.squareSize(),
      fill: 'none',
      class: 'rect fills row-' + row + ' col-' + col + ' square'
    });
  
    var points = [];
  
    //top-left
    points.push(startingX + ',' + startingY + ' ' + (startingX + quiltPlay.squareSize()) + ',' + startingY + ' ' + startingX + ',' + (startingY + quiltPlay.squareSize()));
    //top-right
    points.push(startingX + ',' + startingY + ' ' + (startingX + quiltPlay.squareSize()) + ',' + startingY + ' ' + (startingX + quiltPlay.squareSize()) + ',' + (startingY + quiltPlay.squareSize()));
    //bottom-right
    points.push(startingX + ',' + (startingY + quiltPlay.squareSize()) + ' ' + (startingX + quiltPlay.squareSize()) + ',' + (startingY + quiltPlay.squareSize()) + ' ' + (startingX + quiltPlay.squareSize()) + ',' + startingY);
    //bottom-left
    points.push(startingX + ',' + startingY + ' ' + startingX + ',' + (startingY + quiltPlay.squareSize()) + ' ' + (startingX + quiltPlay.squareSize()) + ',' + (startingY + quiltPlay.squareSize()));
  
    $.each(points, function(i, pointSet) {
      svg.append('polygon')
        .attr({
          points: pointSet,
          fill: 'none',
          class: 'polygon fills row-' + row + ' col-' + col + ' hst-' + i,
        });
    });
    
    // Draw hidden larger polys
    //top-left
    var points = [];
    points.push(startingX + ',' + startingY + ' ' + (startingX + 2*quiltPlay.squareSize()) + ',' + startingY + ' ' + startingX + ',' + (startingY + 2*quiltPlay.squareSize()));
    //top-right
    points.push((startingX + 2*quiltPlay.squareSize()) + ',' + startingY + ' ' + (startingX + 4*quiltPlay.squareSize()) + ',' + startingY + ' ' + (startingX + 4*quiltPlay.squareSize()) + ',' + (startingY + 2*quiltPlay.squareSize()));
    //bottom-right
    points.push((startingX + 4*quiltPlay.squareSize()) + ',' + (startingY + 2*quiltPlay.squareSize()) + ' ' + (startingX + 4*quiltPlay.squareSize()) + ',' + (startingY + 4*quiltPlay.squareSize()) + ' ' + (startingX + 2*quiltPlay.squareSize()) + ',' + (startingY + 4*quiltPlay.squareSize()));
    //bottom-left
    points.push(startingX + ',' + (startingY + 2*quiltPlay.squareSize()) + ' ' + startingX + ',' + (startingY + 4*quiltPlay.squareSize()) + ' ' + (startingX + 2*quiltPlay.squareSize()) + ',' + (startingY + 4*quiltPlay.squareSize()));
  
    $.each(points, function(i, pointSet) {
      svg.append('polygon')
        .attr({
          points: pointSet,
          fill: 'none',
          class: 'polygon fills row-' + row + ' col-' + col + ' large-hst-' + i,
        });
    });
  },
  redrawBlock: function() {
    var storedValues = {};
    d3.selectAll('#clickdraw-block .filled').each(function(a) {
      storedValues[d3.select(this).attr('class')] = d3.select(this).attr('fill');
    });

    var dimension = quiltPlay.squareSize()*quiltPlay.currentUnits();
    d3.select('#clickdraw-block').select('svg').remove();
    var svg = d3.select('#clickdraw-block').append('svg')
      .attr({
        width: dimension,
        height: dimension,
        viewBox: '0 0 ' + dimension + ' ' + dimension,
        preserveAspectRatio: 'xMinYMin' });
  
    var currentUnits = quiltPlay.currentUnits();
 
    _.times(currentUnits, function(col) {
      _.times(currentUnits, function(row) {
        var startingX = quiltPlay.squareSize()*col;
        var startingY = quiltPlay.squareSize()*row; 
        var halfSize = quiltPlay.squareSize() / 2;
        quiltPlay.drawFills(svg, startingX, startingY, row, col);
        quiltPlay.drawHovers(svg, currentUnits, halfSize, startingX, startingY, row, col);
      });
    });
  
    d3.selectAll('.hovers').on('mouseover', function(d, i) {
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
      var $element = d3.select(this);
      quiltPlay.clickChange($element, quiltPlay.currentColor());
      quiltPlay.redrawGrid();
    });
  
    $.each(storedValues, function(selector, fillValue) {
      var modifiedSelector = '.' + selector.replace(/ filled/, '').replace(/ /g, '.');
      var $element = d3.select(modifiedSelector);
      if($element.size() > 0) {
        $element.attr('fill', fillValue).classed('filled', true);
        $element.moveToFront();
      }
    });
    quiltPlay.redrawGrid();
  },
  drawHeader: function() {
    d3.select('#header').select('svg').remove();
        
    var width = $(window).width();
    var height = 50;
    var rows = 5;
    var cols = width / 10;

    svg = d3.select('#header').append('svg').attr({
      width: width,
      height: height
    });

    _.times(cols, function(col) {
      _.times(rows, function(row) {
        svg.append('rect').attr({
          x: 10*col,
          y: 10*row,
          height: 10,
          width: 10,
          stroke: quiltPlay.gray,
          strokeWidth: '1px',
          fill: '#FFFFFF',
          class: 'headers'
        });
      });
    });
 
     
    d3.selectAll('#header rect').on('mouseover', function(d, i) {
      var randomNumber = Math.floor(Math.random()*quiltPlay.konaColorHexes.length);
      var hex = quiltPlay.konaColorHexes[randomNumber];
      var $element = d3.select(this);
      $element.attr('fill', hex);
    });
  },
  redrawGrid: function() {
    d3.select('#clickdraw').select('svg').remove();
        
    var width = quiltPlay.blockCols() * quiltPlay.currentUnits() * quiltPlay.squareSize();
    var height = quiltPlay.blockRows() * quiltPlay.currentUnits() * quiltPlay.squareSize()
    $('#clickdraw').width($('#clickdraw').parent().width());

    quiltPlay.clickDrawSvg = d3.select('#clickdraw').append('svg').attr({
      width: width,
      height: height,
      viewBox: '0 0 ' + width + ' ' + height,
      preserveAspectRatio: 'xMinYMin',
      fill: '#FFFFFF'
    });

    if($('#border').val() !== null && konaColors[$('#border').val()] !== undefined && parseInt($('#sliderBorder').val()) != 0) {
      quiltPlay.clickDrawSvg.attr('style', 'border: ' + $('#sliderBorder').val() + 'px solid ' + konaColors[$('#border').val()]);
    }
    
    var dimensionShift = Math.sqrt(2*quiltPlay.currentUnits()*quiltPlay.squareSize()*quiltPlay.currentUnits()*quiltPlay.squareSize());
    var layout = $('input[name="layout"]:checked').val();
    var midCol = Math.floor(quiltPlay.blockCols()/2) - 1;
    var midRow = Math.floor(quiltPlay.blockRows()/2) - 1;

    _.times(quiltPlay.blockCols(), function(col) {
      _.times(quiltPlay.blockRows(), function(row) {
        var transform = '';
        var shiftX = 0;
        var shiftY = 0;
        if($('#on-point').is(':checked')) {
          var shiftX = (col + 0.5)*dimensionShift;
          var shiftY = row*dimensionShift/2;
          if(row%2 == 1) {
            shiftX += dimensionShift/2;
          }
          transform = 'translate(' + shiftX + ',' + shiftY + ') rotate(45)';
        } else {
          shiftX = col*quiltPlay.currentUnits()*quiltPlay.squareSize();
          shiftY = row*quiltPlay.currentUnits()*quiltPlay.squareSize();
          transform = 'translate(' + shiftX + ',' + shiftY + ')';
          switch(layout) {
            case 'plain':
              //do nothing
              break;
            case 'alternate':
              if((row%2 + col%2)%2 == 1) { 
                shiftX = (col + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                transform = 'translate(' + shiftX + ',' + shiftY + ') scale(-1,1)';
              }
              break;
            case 'origin':
              if(col > midCol) {
                if(row > midRow) {
                  // if bottom right quadrant, flip x and y
                  shiftX = (col + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                  shiftY = (row + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                  transform = 'translate(' + shiftX + ',' + shiftY + ') scale(-1,-1)';
                } else {
                  // if top right quandrant, flip y
                  shiftX = (col + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                  transform = 'translate(' + shiftX + ',' + shiftY + ') scale(-1,1)';
                }
              } else if(row > midRow) {
                // if bottom left quadrant, flip x
                shiftY = (row + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                transform = 'translate(' + shiftX + ',' + shiftY + ') scale(1,-1)';
              }
              break;
            case 'random':
              var randomNumber = Math.floor(Math.random()*4);
              if(randomNumber == 0) {
                //do nothing
              } else if(randomNumber == 1) {
                shiftX = (col + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                transform = 'translate(' + shiftX + ',' + shiftY + ') scale(-1,1)';
              } else if(randomNumber == 2) {
                shiftY = (row + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                transform = 'translate(' + shiftX + ',' + shiftY + ') scale(1,-1)';
              } else {
                shiftX = (col + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                shiftY = (row + 1)*quiltPlay.currentUnits()*quiltPlay.squareSize();
                transform = 'translate(' + shiftX + ',' + shiftY + ') scale(-1,-1)';
              }
          }
        }

        var group = quiltPlay.clickDrawSvg.append('g')
          .attr('transform', transform);
        if($('#on-point').is(':checked') && (row%2 == 1) && (col + 1) == quiltPlay.blockCols()) {
          group.attr('class', 'hidden');
        }
        d3.selectAll('.fills.filled').each(function(a) {
          var $filledElement = d3.select(this);
          if($filledElement.classed('polygon')) {
            group.append('polygon').attr({
              points: $filledElement.attr('points'),
              fill: $filledElement.attr('fill'),
              class: 'blockPlay'
            });
          } else {
            group.append('rect').attr({
              x: $filledElement.attr('x'),
              y: $filledElement.attr('y'),
              height: quiltPlay.squareSize(),
              width: quiltPlay.squareSize(),
              fill: $filledElement.attr('fill'),
              class: 'blockPlay'
            });
          }
        });
      });
    });
    quiltPlay.updateRecentSwatches();
  }
};

$(document).ready(function() {
  quiltPlay.init();
});
