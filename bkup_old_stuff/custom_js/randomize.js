jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/konaColors.css? ' + jQuery.now() + '">');
jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/randomize.css? ' + jQuery.now() + '">');

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

var randomize = {
  init: function() {
    randomize.initializePieChart();
    randomize.drawPieChart();
    jQuery('#randomize').on('click', function(e) {
      e.preventDefault();
      randomize.generate(1000);
    });
    randomize.generate(1000);
  },
  randomSize: function() {
    return 12;
  },
  randomSquareSize: function() {
    if(jQuery(window).width() < 768) {
      return jQuery('.post-entry').width() / randomize.randomSize();
    } else {
      return jQuery('.post-entry').width() / (2*randomize.randomSize());
    }
  },
  generate: function(iterations) {
    d3.select('#random').select('svg').remove();

    if(jQuery(window).width() < 768) {
      var screenWidth = jQuery('.post-entry').width();
    } else {
      var screenWidth = jQuery('.post-entry').width() / 2;
    }
    var svg = d3.select('#random').append('svg').attr({
        width: screenWidth,
        height: screenWidth,
        viewBox: '0 0 ' + screenWidth + ' ' + screenWidth,
        preserveAspectRatio: 'xMinYMin' });

    var colors = [];
    jQuery.each(randomize.colorValues, function(color, value) {
      for(var i = 0; i < value; i++) {
        colors.push(konaColors.colors[color]);
      }
    });
    var trianglePoints = randomize.allTheTriangles();
    var size = trianglePoints.length;
    for(var i = 0; i < iterations; i++) {
      var randomNumber = Math.floor(Math.random()*size);
      var colorIndex = Math.floor(Math.random()*colors.length);
      var pointSet = trianglePoints[randomNumber].split(':')[0];
      var sizeClass = 'size-' + trianglePoints[randomNumber].split(':')[1];
      svg.append('polygon')
        .attr({
          points: pointSet,
          fill: colors[colorIndex],
          class: 'random ' + sizeClass
        });
    }
    for(var i = randomize.randomSize(); i > 1; i-=1) {
      d3.selectAll('.size-' + i).each(function(a) {
        d3.select(this).moveToFront();
      });
    }

    var colors = '<br /><h5 style="margin-bottom:0px;">Your Colors:</h5>';
    jQuery.each(randomize.colorValues, function(i, value) {
      if(value != 0) {
        colors += i + ': ' + value + '<br />';
      }
    });
    jQuery('#yourcolors').html(colors);

  },
  allTheTriangles: function() {
    var points = [];
    var squareSize = randomize.randomSquareSize();
    for(var size = 1; size <= randomize.randomSize(); size++) {
      for(var col = 0; col < randomize.randomSize(); col++) {
        for(var row = 0; row < randomize.randomSize(); row++) {
          if((col + size) <= randomize.randomSize() && (row + size) <= randomize.randomSize()) {
            var topLeft = col*squareSize + ',' + row*squareSize;
            var topRight = (col + size)*squareSize + ',' + row*squareSize;
            var bottomRight = (col + size)*squareSize + ',' + (row + size)*squareSize;
            var bottomLeft = col*squareSize + ',' + (row + size)*squareSize;
            var topMid = (col + 0.5*size)*squareSize + ',' + row*squareSize;
            var rightMid = (col + size)*squareSize + ',' + (row + 0.5*size)*squareSize;
            var bottomMid = (col + 0.5*size)*squareSize + ',' + (row + size)*squareSize;
            var leftMid = col*squareSize + ',' + (row + 0.5*size)*squareSize;
            points.push(topLeft + ' ' + topRight + ' ' + bottomRight + ':' + size);
            points.push(topLeft + ' ' + topRight + ' ' + bottomLeft) + ':' + size;
            points.push(bottomLeft + ' ' + topRight + ' ' + bottomRight + ':' + size);
            points.push(topLeft + ' ' + bottomLeft + ' ' + bottomRight + ':' + size);
          }
        }
      }
    }
    return points;
  },
  colorValues: {
    'sky_1513': 1,
    'everglade_356': 1,
    'glacier_146': 1,
    'fog_444': 1
  },
  addColor: function(color) {
    if(randomize.colorValues[color] !== undefined) {
      randomize.colorValues[color] += 1;
    } else {
      randomize.colorValues[color] = 1;
    }
    randomize.drawPieChart();
  },
  subtractColor: function(color) {
    randomize.colorValues[color] -= 1;
    randomize.drawPieChart();
  },
  pieChartData: function() {
    var colors = new Array();
    jQuery.each(randomize.colorValues, function(i, v) {
      colors.push({ value: v, color: i, hex: konaColors.colors[i] });
    });
    return colors;
  },
  initializePieChart: function() {
    jQuery('a.swatch').on('click', function(e) {
      e.preventDefault();
      randomize.addColor(jQuery(this).data('value'));
    });
  },
  drawPieChart: function() {
    d3.select('#piechart').select('svg').remove();

    var width = 100;
    var height = 100;
    var radius = width / 2;

    var vis = d3.select('#piechart')
        .append('svg:svg')
        .data([randomize.pieChartData()])
            .attr('width', width)
            .attr('height', height)
        .append('svg:g')
            .attr('transform', 'translate(' + radius + ',' + radius + ')')

    var arc = d3.svg.arc()
        .outerRadius(radius);

    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });

    var arcs = vis.selectAll('g.slice')
        .data(pie)
        .enter()
            .append('svg:g')
                .attr('class', 'slice');

        arcs.append('svg:path')
                .attr('fill', function(d, i) { return randomize.pieChartData()[i].hex; } )
                .attr('color', function(d, i) { return randomize.pieChartData()[i].color; } )
                .attr('d', arc)
        arcs.on('click', function(e) {
          var jQueryelement = d3.select(this);
          randomize.subtractColor(d3.select(jQueryelement[0][0].children[0]).attr('color'));
        });
  },
  save: function(dataBlob, filesize) {
    saveAs( dataBlob, 'exported.png' );
  }
};

jQuery(document).ready(function() {
  jQuery('.post-related, .post-pagination, .post-comments, .post-meta,#sidebar').hide();
  jQuery('#main').css({ width: '100%' });
  randomize.init();
  jQuery('#random-save').on('click', function(e) {
    var svg = d3.select('#random').select('svg');
    var svgString = getSVGString(svg.node());
    svgString2Image( svgString, 2*svg.attr('width'), 2*svg.attr('height'), 'png', randomize.save );
  });
});
