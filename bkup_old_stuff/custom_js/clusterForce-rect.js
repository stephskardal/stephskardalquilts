
d3.text("/custom_js/fabricSwatches.js?v=2", function(error, root) {
  jQuery('#sidebar,.post-related').remove();
  jQuery('#main').width(jQuery('.sp-container').width());

  eval(root);
  var colorArray = [];

  jQuery.each(fabricSwatches, function(fabricKey, data) {
if(fabricKey == 'artGallery') {
    jQuery.each(data.swatches, function(key, value) {
      var hsl = chroma(value).hsl();
      if(hsl[0] != 0 && hsl[1] != 0) {
        colorArray.push(value);
      }
    });
}
  });

  var width = jQuery('.post-entry').width(),
      height = 500,
      padding = 1.5, // separation between same-color nodes
      clusterPadding = 6, // separation between different-color nodes
      maxRadius = 12;
  
  var n = colorArray.length, // total number of nodes
      m = 18; // number of distinct clusters
  
  // The largest node for each cluster.
  var clusters = new Array(m);
 
  var nodes = colorArray.map(function(el) {
    var hsl = chroma(el).hsl();
    var hue = hsl[0];
    var sat = hsl[1];
    var degrees = 360 / m;
    var i = parseInt(hue/degrees);
     
    d = {
      cluster: i,
      x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
      y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random(),
      width: 1 + sat*10,
      hex: el
    };
    if (!clusters[i]) clusters[i] = d;
    return d;
  });

  var svg = d3.select(".post-entry").append("svg")
      .attr("width", width)
      .attr("height", height);
  
  var node = svg.selectAll("rect")
      .data(nodes)
    .enter().append("rect")
      .attr("x", function(d) { return d.x; })
	  .attr("y", function(d) { return d.y; })
	  .attr("width", function(d) { return d.width; })
	  .attr("height", function(d) { return d.width; })
      .style("fill", function(d) { return d.hex; });
  
  node.transition()
      .duration(750)
      .delay(function(d, i) { return i * 5; })
      .attrTween("r", function(d) {
        var i = d3.interpolate(0, d.width);
        return function(t) { return d.width = i(t); };
      });
 

var force = d3.layout.force()
	.gravity(0.05)
	.charge(function(d, i) { return i ? -30 : -2000; })
	.nodes(nodes)
	.size([width, height]);

force.on('tick', function(e) {
	var q = d3.geom.quadtree(nodes),
		i = 0,
		n = nodes.length;

	while (++i < n) {
		q.visit(collide(nodes[i]));
	}

	svg.selectAll('rect')
		.attr('x', function(d) { return d.x; })
		.attr('y', function(d) { return d.y; });
});

force.start();

  function tick(e) {
    node
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
  }
  
  // Move d to be adjacent to the cluster node.
  function cluster(alpha) {
    return function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
          y = d.y - cluster.y,
          l = Math.sqrt(x * x + y * y),
          r = d.width + cluster.width;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }
 
  function collide(node) {
	return function(quad, x1, y1, x2, y2) {
		var updated = false;
		if (quad.point && (quad.point !== node)) {

			var x = node.x - quad.point.x,
				y = node.y - quad.point.y,
				xSpacing = (quad.point.width + node.width) / 2,
				ySpacing = (quad.point.height + node.height) / 2,
				absX = Math.abs(x),
				absY = Math.abs(y),
				l,
				lx,
				ly;

			if (absX < xSpacing && absY < ySpacing) {
				l = Math.sqrt(x * x + y * y);

				lx = (absX - xSpacing) / l;
				ly = (absY - ySpacing) / l;

				// the one that's barely within the bounds probably triggered the collision
				if (Math.abs(lx) > Math.abs(ly)) {
					lx = 0;
				} else {
					ly = 0;
				}

				node.x -= x *= lx;
				node.y -= y *= ly;
				quad.point.x += x;
				quad.point.y += y;

				updated = true;
			}
		}
		return updated;
	};
  }
});

/*

var width = 960,
	height = 500;

var nodes = d3.range(100).map(function(d, i) {
		return {
			width: ~~(Math.random() * 40 + 15),
			height: ~~(Math.random() * 40 + 15),
		};
	}),
	root = nodes[0],
	color = d3.scale.category10();

  var svg = d3.select(".post-entry").append("svg")
	.attr('width', width)
	.attr('height', height);

svg.selectAll('.rect')
		.data(nodes.slice(1))
	.enter().append('rect')
		.attr('width', function(d) { return d.width; })
		.attr('height', function(d) { return d.height; })
		.style('fill', function(d, i) { return color(i % 3); })
		.attr('transform', function(d) { return 'translate(' + (-d.width / 2) + ',' + (-d.height / 2) + ')'; });

svg.on('mousemove', function() {
	var p1 = d3.mouse(this);

	root.px = p1[0];
	root.py = p1[1];
	force.resume();
});

// mouse node, position off screen initially
root.x = 2000;
root.y = 2000;
root.width = 0;
root.height = 0;
root.fixed = true;

var force = d3.layout.force()
	.gravity(0.05)
	.charge(function(d, i) { return i ? -30 : -2000; })
	.nodes(nodes)
	.size([width, height]);

force.on('tick', function(e) {
	var q = d3.geom.quadtree(nodes),
		i = 0,
		n = nodes.length;

	while (++i < n) {
		q.visit(collide(nodes[i]));
	}

	svg.selectAll('rect')
		.attr('x', function(d) { return d.x; })
		.attr('y', function(d) { return d.y; });
});

force.start();

function collide(node) {
	return function(quad, x1, y1, x2, y2) {
		var updated = false;
		if (quad.point && (quad.point !== node)) {

			var x = node.x - quad.point.x,
				y = node.y - quad.point.y,
				xSpacing = (quad.point.width + node.width) / 2,
				ySpacing = (quad.point.height + node.height) / 2,
				absX = Math.abs(x),
				absY = Math.abs(y),
				l,
				lx,
				ly;

			if (absX < xSpacing && absY < ySpacing) {
				l = Math.sqrt(x * x + y * y);

				lx = (absX - xSpacing) / l;
				ly = (absY - ySpacing) / l;

				// the one that's barely within the bounds probably triggered the collision
				if (Math.abs(lx) > Math.abs(ly)) {
					lx = 0;
				} else {
					ly = 0;
				}

				node.x -= x *= lx;
				node.y -= y *= ly;
				quad.point.x += x;
				quad.point.y += y;

				updated = true;
			}
		}
		return updated;
	};
}
*/
