var randomizeArcs = {
  init: function() {
    randomizeArcs.initializePieChart();
    randomizeArcs.drawPieChart();
    $('#randomize2').on('click', function(e) {
      e.preventDefault();
      randomizeArcs.generate(40, 40);
    });
    randomizeArcs.generate(40, 40);
  },
  arcSize: function() {
    return 25;
  },
  generate: function(rows, cols) {
    d3.select('#random2').select('svg').remove();

    var svg = d3.select('#random2').append('svg').attr({
        width: 1000,
        height: 1000,
        viewBox: '0 0 1000 1000',
        preserveAspectRatio: 'xMinYMin' });

    var colors = [];
    $.each(randomizeArcs.colorValues, function(color, value) {
      _.times(value, function(col) {
        colors.push(konaColors[color]);
      });
    });
    var arcs = randomizeArcs.allTheArcs();

    for(var i = 0; i < cols; i++) {
      for(var j = 0; j < rows; j++) {
        var randomNumber = Math.floor(Math.random()*4);
        var colorIndex = Math.floor(Math.random()*colors.length);
        var arc = arcs[randomNumber];
        var shiftX = parseInt(j*randomizeArcs.arcSize()) + parseInt(randomizeArcs.arcShiftX(randomNumber));
        var shiftY = parseInt(i*randomizeArcs.arcSize()) + parseInt(randomizeArcs.arcShiftY(randomNumber));

        svg.append("path")
          .attr("class", "arc")
          .attr("d", arc)
          .attr('fill', colors[colorIndex])
          .attr('transform', 'translate(' + shiftX + ',' + shiftY + ')');
      }
    }
  },
  arcShiftX: function(i) {
    if(i == 0 || i == 1) {
      return 0;
    } else {
      return randomizeArcs.arcSize();
    }
  },
  arcShiftY: function(i) {
    if(i == 0 || i == 3) {
      return randomizeArcs.arcSize();
    } else {
      return 0;
    }
  },
  allTheArcs: function() {
    var arcs = [];
    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(randomizeArcs.arcSize())
      .startAngle(0)
      .endAngle(0.5 * Math.PI);
    arcs.push(arc);

    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(randomizeArcs.arcSize())
      .startAngle(0.5 * Math.PI)
      .endAngle(Math.PI);
    arcs.push(arc); 

    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(randomizeArcs.arcSize())
      .startAngle(Math.PI)
      .endAngle(1.5 * Math.PI);
    arcs.push(arc); 

    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(randomizeArcs.arcSize())
      .startAngle(1.5 * Math.PI)
      .endAngle(2 * Math.PI);
    arcs.push(arc); 

    return arcs;
  },
  colorValues: {
    'glacier_146': 2,
    'lightgray': 3,
    'gray': 3,
    'watermelon': 1
  },
  addColor: function(color) {
    if(randomizeArcs.colorValues[color] !== undefined) {
      randomizeArcs.colorValues[color] += 1;
    } else {
      randomizeArcs.colorValues[color] = 1;
    }
    randomizeArcs.drawPieChart();
  },
  subtractColor: function(color) {
    randomizeArcs.colorValues[color] -= 1;
    randomizeArcs.drawPieChart();
  },
  pieChartData: function() {
    var colors = new Array();
    $.each(randomizeArcs.colorValues, function(i, v) {
      colors.push({ value: v, color: i, hex: konaColors[i] });
    });
    return colors;
  },
  initializePieChart: function() {
console.log('here');
    $('#random2-add').click(function(e) {
      e.preventDefault();
      randomizeArcs.addColor($('#swatches').val());
    });
  },
  drawPieChart: function() {
    d3.select('#piechart2').select('svg').remove();

    var width = 100;
    var height = 100;
    var radius = width / 2;

    var vis = d3.select('#piechart2')
        .append('svg:svg')
        .data([randomizeArcs.pieChartData()])
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
                .attr('fill', function(d, i) { return randomizeArcs.pieChartData()[i].hex; } )
                .attr('color', function(d, i) { return randomizeArcs.pieChartData()[i].color; } )
                .attr('d', arc)
        arcs.on('click', function(e) {
          var $element = d3.select(this);
          randomizeArcs.subtractColor(d3.select($element[0][0].children[0]).attr('color'));
        });
  }
};
