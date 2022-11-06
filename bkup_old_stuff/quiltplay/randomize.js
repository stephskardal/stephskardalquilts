var randomize = {
  init: function() {
    randomize.initializePieChart();
    randomize.drawPieChart();
    $('#randomize').on('click', function(e) {
      e.preventDefault();
      randomize.generate(5000);
    });
    randomize.generate(5000);
  },
  randomSize: function() {
    return parseInt($('#randomSize').val());
  },
  randomSquareSize: function() {
    return parseInt(400/randomize.randomSize());
  },
  generate: function(iterations) {
    d3.select('#random').select('svg').remove();

    var svg = d3.select('#random').append('svg').attr({
        width: 400,
        height: 400,
        viewBox: '0 0 400 400',
        preserveAspectRatio: 'xMinYMin' });

    var colors = [];
    $.each(randomize.colorValues, function(color, value) {
      _.times(value, function(col) {
        colors.push(konaColors[color]);
      });
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
    for(var i = 16; i > 1; i-=1) {
      d3.selectAll('.size-' + i).each(function(a) {
        d3.select(this).moveToFront();
      });
    }
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
/*
            points.push(topLeft + ' ' + topMid + ' ' + bottomRight + ' ' + bottomMid + ':' + size);
            points.push(topMid + ' ' + topRight + ' ' + bottomMid + ' ' + bottomLeft + ':' + size);
            points.push(bottomLeft + ' ' + leftMid + ' ' + topRight + ' ' + rightMid + ':' + size);
            points.push(topLeft + ' ' + leftMid + ' ' + bottomRight + ' ' + rightMid + ':' + size);


            if(Math.abs(col - row) < 1) {
              var coords = [topLeft, topRight, bottomRight, bottomLeft, topMid, rightMid, bottomMid, leftMid];
              var randoms = [];
              for(var i = 0; i<3; i++) {
                var randomNumber = Math.floor(Math.random()*coords.length);
                randoms.push(coords[randomNumber]); 
              }
              points.push(randoms.join(' ') + ':' + size);
           }
*/
/* 
            points.push(topLeft + ' ' + topRight + ' ' + rightMid + ' ' + leftMid + ':' + size);
            points.push(topMid + ' ' + topRight + ' ' + bottomRight + ' ' + bottomMid + ':' + size);
            points.push(bottomLeft + ' ' + leftMid + ' ' + rightMid + ' ' + bottomRight + ':' + size);
*/

          }
        }
      }
    }
    return points;
  },
  colorValues: {
    'black': 0,
    'sky_1513': 5,
    'white_1387': 0,
    'everglade_356': 5,
    'glacier_146': 5,
    'fog_444': 5
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
    $.each(randomize.colorValues, function(i, v) {
      colors.push({ value: v, color: i, hex: konaColors[i] });
    });
    return colors;
  },
  initializePieChart: function() {
    $('#random-add').click(function(e) {
      e.preventDefault();
      randomize.addColor($('#swatches').val());
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
          var $element = d3.select(this);
          randomize.subtractColor(d3.select($element[0][0].children[0]).attr('color'));
        });
  }
};
