d3.text("/custom_js/fabricSwatches.js?v=2", function(error, root) {
  jQuery('#sidebar,.post-related').remove();
  jQuery('#main').width(jQuery('.sp-container').width());

  eval(root);
  var colorArray = [];

  jQuery.each(fabricSwatches, function(fabricKey, data) {
//if(fabricKey == 'kona') {
    jQuery.each(data.swatches, function(key, value) {
      var hsl = chroma(value).hsl();
      if(hsl[0] != 0 && hsl[1] != 0) {
        colorArray.push(value);
      }
    });
//}
  });

  var width = 6500,
      height = 5525,
      padding = 15, // separation between same-color nodes
      clusterPadding = 60, // separation between different-color nodes
      maxRadius = 10;
  
  var n = colorArray.length, // total number of nodes
      m = 18; // number of distinct clusters
  
  // The largest node for each cluster.
  var clusters = new Array(m);
  var nodes = [];
  
  jQuery.each(colorArray, function(i, el) {
    var hsl = chroma(el).hsl();
    var hue = hsl[0];
    var sat = hsl[1];
    var degrees = 360 / m;
    var i = parseInt(hue/degrees);
    var radius = 5 + sat*40;
     
    d = {
      cluster: i,
      radius: radius,
      sat: sat,
      x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
      y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random(),
      hex: el
    };
    if (!clusters[i]) clusters[i] = d;
    nodes.push(d);
  });

  jQuery.each(colorArray, function(i, el) {
    var hsl = chroma(el).hsl();
    var hue = hsl[0];
    var sat = hsl[1];
    var degrees = 360 / m;
    var i = parseInt(hue/degrees);
    var radius = 5 + sat*40;
     
    d = {
      cluster: i,
      radius: radius,
      sat: sat,
      x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
      y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random(),
      hex: el
    };
    if (!clusters[i]) clusters[i] = d;
    nodes.push(d);
  });
  jQuery.each(colorArray, function(i, el) {
    var hsl = chroma(el).hsl();
    var hue = hsl[0];
    var sat = hsl[1];
    var degrees = 360 / m;
    var i = parseInt(hue/degrees);
    var radius = 5 + sat*40;
     
    d = {
      cluster: i,
      radius: radius,
      sat: sat,
      x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
      y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random(),
      hex: el
    };
    if (!clusters[i]) clusters[i] = d;
    nodes.push(d);
  });

  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(.01)
      .friction(0.5)
      .charge(function(d) { return d.sat*10; })
      .on("tick", tick)
      .start();
  
  var svg = d3.select(".post-entry").append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', '0 0 6500 5525');
  
  var node = svg.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .style("fill", function(d) { return d.hex; })
      .call(force.drag);
  
  node.transition()
      .duration(20)
      .delay(function(d, i) { return i * 5; })
      .attrTween("r", function(d) {
        var i = d3.interpolate(0, d.radius);
        return function(t) { return d.radius = i(t); };
      });
  
  function tick(e) {
    node
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
  
  // Move d to be adjacent to the cluster node.
  function cluster(alpha) {
    return function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
          y = d.y - cluster.y,
          l = Math.sqrt(x * x + y * y),
          r = d.radius + cluster.radius;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }
  
  // Resolves collisions
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }
});
