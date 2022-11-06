var snapTo = {
  svg: undefined,
  limitingDimension: undefined,
  resolution: 25,
  r: 15,
  init: function() {
    snapTo.limitingDimension = quiltPlay.limitingDimension();
    var width = snapTo.limitingDimension;
    var height = snapTo.limitingDimension;

    $('#addrect').on('click', function(e) {
      e.preventDefault();
      snapTo.addRect();
    });
    $('#addgoose').on('click', function(e) {
      e.preventDefault();
      snapTo.addPolygon();
    });

    snapTo.svg = d3.select('#justdrawgrid').append('svg')
        .attr('width', width)
        .attr('height', height);
    
    snapTo.svg.selectAll('.vertical')
        .data(d3.range(1, width / snapTo.resolution))
      .enter().append('line')
        .attr('class', 'vertical')
        .attr('x1', function(d) { return d * snapTo.resolution; })
        .attr('y1', 0)
        .attr('x2', function(d) { return d * snapTo.resolution; })
        .attr('y2', height);
    
    snapTo.svg.selectAll('.horizontal')
        .data(d3.range(1, height / snapTo.resolution))
      .enter().append('line')
        .attr('class', 'horizontal')
        .attr('x1', 0)
        .attr('y1', function(d) { return d * snapTo.resolution; })
        .attr('x2', width)
        .attr('y2', function(d) { return d * snapTo.resolution; });
  },
  polygonData: [],
  rectData: [],
  addRect: function() {
    snapTo.rectData.push({ x: 25, y: 25 });
    var circles = snapTo.svg.selectAll('rect')
      .data(snapTo.rectData)
      .enter().append('rect')
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; })
      .attr('height', 25)
      .attr('width', 25)
      .attr('fill', '#000000')
      .call(rectdrag);
  },
  addPolygon: function() {
    snapTo.polygonData.push("25,25 50,25 25,50");
    snapTo.svg.selectAll("polygon")
      .data(snapTo.polygonData)
      .enter().append("polygon")
      .attr("points", function(d) { return d; })
      .attr("stroke","black")
      .attr("stroke-width",2)
      .call(polydrag);
  },
  clearDrawing: function() {
    if (draggedSvg) draggedSvg.remove();
    draggedSvg = null;
    newElementData = null;
    if (svg) {
      svg.on('mousedown', null);
      view.exit().remove();
      svg.remove();
      svg = null;
    }
  }
};

var rectdrag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragged);
var polydrag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", polydragged);

function dragged(d) {
  var x = d3.event.x,
      y = d3.event.y,
      gridX = round(Math.max(snapTo.r, Math.min(snapTo.limitingDimension - snapTo.r, x)), snapTo.resolution),
      gridY = round(Math.max(snapTo.r, Math.min(snapTo.limitingDimension - snapTo.r, y)), snapTo.resolution);

  d3.select(this).attr('x', d.x = gridX).attr('y', d.y = gridY);
}
function polydragged(d) {
console.log(d3.event);
  var x = d3.event.dx,
      y = d3.event.dy,
      //gridX = round(Math.max(snapTo.r, Math.min(snapTo.limitingDimension - snapTo.r, x)), snapTo.resolution),
      //gridY = round(Math.max(snapTo.r, Math.min(snapTo.limitingDimension - snapTo.r, y)), snapTo.resolution);
      gridX = round(Math.max(snapTo.r, Math.min(snapTo.limitingDimension - snapTo.r, x)), snapTo.resolution),
      gridY = round(Math.max(snapTo.r, Math.min(snapTo.limitingDimension - snapTo.r, y)), snapTo.resolution);
/*
  result = [];
  $.each(d.split(' '), function(i, point) {
    var newX = parseInt(point.split(',')[0]) + x; //parseInt(gridX);
    var newY = parseInt(point.split(',')[1]) + y; //parseInt(gridY);
    console.log('new x is ' + newX + ' and new y is ' + newY);
    result.push(newX + ',' + newY);
  });
console.log(result);
*/
  var currentTransform = d3.select(this).attr('transform');
  var cTrans = [0,0];
  if(currentTransform !== null) {
console.log(currentTransform);
    var cTrans = currentTransform.replace(/translate\(/, '').replace(/\)/, '').split(',');
console.log(cTrans);
    //currentTransform = currentTransform.replace(/translate(/, '');//.replace(/)/, '');
//console.log(currentTransform);
  }
//console.log(x);
//console.log(y);
  
  d3.select(this).attr('transform', 'translate(' + cTrans[0] + x + ',' + cTrans[1] + y + ')');
}

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}
