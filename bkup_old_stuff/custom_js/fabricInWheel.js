jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/colorWheel.css? ' + jQuery.now() + '">');

var data, split;

var refreshAll = function() {
  d3.text("/custom_js/fabricSwatches.js?v=20200507", function(error, root) {
    if (error) throw error;

    if(jQuery(window).width() < 960) { 
      jQuery('#sidebar').css({ width: '100%', margin: '0px', padding: '20px 0px 0px 0px' }).insertAfter(jQuery('#sequence'));
      jQuery('#instruction').insertAfter(jQuery('#sequence'));
      jQuery('#sequence').css({ 'text-align': 'center' });
      jQuery('#color-selected').css('display', 'block');
    }

    eval(root);

    resetData(fabricSwatches); 
    loadDataSet();
    renderData(fabricSwatches);
   
    jQuery('#refresh').on('click', function(e) {
      e.preventDefault();
      refreshCenter(750);
    }); 
    jQuery('a.limit-by').on('click', function(e) {
      e.preventDefault();
      var $link = jQuery(this);
      $link.toggleClass('selected');
      if($link.data('value') == 'all') {
        if($link.hasClass('selected')) {
          jQuery('a.limit-by').addClass('selected');   
        } else {
          jQuery('a.limit-by').removeClass('selected');   
        }
      } else {
        if(jQuery("a.limit-by[data-value!='all']").size() ==
           jQuery("a.limit-by.selected[data-value!='all']").size()) {
          jQuery("a.limit-by[data-value='all']").addClass('selected');
        } else { 
          jQuery("a.limit-by[data-value='all']").removeClass('selected');
        }
      }
      resetData(fabricSwatches);
      loadDataSet();
      renderData(fabricSwatches);
      refreshCenter(750);
    });
  });
};

var refreshCenter = function(length) {
  jQuery('#overlay').fadeIn(750);
  jQuery('#color-selected').html('<span class="swatch">Click to expand a color</span>');

  var d = data;
  d3.select('#sequence svg').transition()
      .duration(length)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attr('original-d', d)
      .attrTween("d", function(d) { return function() { return arc(d); }; });
};

var resetData = function(fabricSwatches) {
  data = {
    name: 'white',
    hex: '#FFFFFF',
    parentHex: '#FFFFFF',
    children: []
  };
  split = {
    colors: []
  };
   
  jQuery.each([ '#FEFE33', '#FFE000', '#FFC000', '#FFA000', '#FF8000', '#FF6E00', '#FC4000', '#FF3300', '#FF0000', '#FF0040', '#BF1449', '#94006C', '#800080', '#8000C0', '#55308D', '#2C3BC6', '#0247FE', '#1B62CB', '#347C98', '#4D9665', '#66B032', '#8CC433', '#B2D733', '#D8F208'], function(i, el) {
    var color = new Color(el);
    colorSorting.constructColor(color);
    color.name = 'Base: ' + el;
    color.dist = 'Base';
    color.children = [];
    split.colors.push(color);
  });

  jQuery.each(fabricSwatches, function(key, swatchData) {
    if(jQuery("a.limit-by[data-value='all']").hasClass('selected') || jQuery("a.limit-by[data-value='" + key + "']").hasClass('selected')) {
      if(jQuery('#limit-to a.read-more[data-value="' + key + '"]').size() == 0) {
        jQuery('#limit-to').append(jQuery('<a href="#" class="limit-by read-more selected" data-value="' + key + '">' + swatchData.label + '</a>'));
      }
      jQuery.each(swatchData.swatches, function(i, el) {
        var color = new Color(el);
        colorSorting.constructColor(color);
        color.name = swatchData.label + ': ' + i;
        color.children = [];

        if(color.sat != 0 && color.hue != 0) {
          split.colors.push(color);
        }
      });
    }
  });
};

var x,y;
var partition = d3.layout.partition()
    .value(function(d) { return d.size; }).sort(null);
var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var mouseout = function(d) {
  d3.selectAll('#sequence .hex-' + d.parentHex.replace(/^#/, '')).transition(100)
    .style('opacity', originalOpacity);
};
var mouseover = function(d) {
  d3.selectAll('#sequence .hex-' + d.parentHex.replace(/^#/, '')).transition(100)
    .style('opacity', 1.0);
};

var click = function(d) {
  if(d.name == 'N/A' && d.children === undefined) {
    return;
  }
  if(d.name == 'N/A' && d.children.length == 1 && d.children[0].hex == '#FFFFFF') {
    return;
  }

  if(d.name != 'N/A' && d.name != 'white') {
    var textColor = '#000000';
    if(d.val < 0.7) {
      textColor = '#FFFFFF'; 
    }
    var labelString = d.name;
    jQuery('#color-selected').html('<span style="background-color:' + d.hex + ';color:' + textColor + ';" class="swatch">' + labelString + '</span>');
  } else {
    jQuery('#color-selected').html('<span class="swatch">Click to expand a color</span>');
  }
  d3.select('#sequence svg').transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; });
  if(d != data) {
    jQuery('#overlay').fadeOut(750);
  } else {
    jQuery('#overlay').fadeIn(750);
  }
}

var loadDataSet = function() {
  var clusters = {};
  jQuery.each(split.colors, function(i, outer) {
    if(outer.dist == 'Base') {
      outer.parentHex = outer.hex;
      clusters[outer.hex] = [];
      data.children.push(outer);
    }
  });

  //Second layer
  jQuery.each(split.colors, function(i, el) {
    if(el.dist != 'Base') {
      var distance = 1000;
      var closest = undefined;
      jQuery.each(data.children, function(j, dataPoint) {
        if(Math.abs(dataPoint.hue - el.hue) < distance) {
          distance = Math.abs(dataPoint.hue - el.hue);
          closest = dataPoint;
        }
      });
      if(closest !== undefined) {
        clusters[closest.hex].push(el);
      }
    }
  });

  jQuery.each(data.children, function(i, el) {
    if(clusters[el.hex].length > 0) {
      el.children = buildChildren(el.hex, colorSorting.sortColorsBy(clusters[el.hex], 'sat'));
    } else {
      el.children = [{ name: 'N/A', size: 10, parentHex: 'na', hex: '#FFFFFF', hue: el.hue, children: [] }];
    }
  });
};
var limitingDimension, width, height, radius;

var renderData = function(fabricSwatches) {
  d3.select('#sequence svg').remove();
  var svg = d3.select("#sequence").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  if(jQuery(window).width() < 420) {
    jQuery('#overlay').html('Highest saturation<br />in the center,<br />decreasing as you<br />move away.');
  }
  jQuery('#overlay').css({ 'margin-top': height/2 - jQuery('#overlay').height()/2 });
  jQuery('#overlay').css({ 'margin-left': jQuery('#sequence').width()/2 - jQuery('#overlay').width()/2 }).show();
  svg.selectAll("path")
      .data(partition.nodes(data))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return d.hex; })
      .attr('class', function(d) { return 'hex-' + d.parentHex.replace(/^#/, ''); })
      .style('opacity', function(d) { return (d.dist == 'Base' ? 0.3 : 1.0) })
      .on("click", click)
    .append("title")
      .text(function(d) { return d.name; });
};

var buildChildren = function(parentHex, children) {
  var firstEl = children.shift();
  if(children.length > 1) {
    return [{ name: firstEl.name, size: 10, parentHex: parentHex, hex: firstEl.hex, children: buildChildren(parentHex, children) }];
  } else {
    return [{ name: firstEl.name, size: 10, parentHex: parentHex, hex: firstEl.hex, children: [] }];
  }
};

jQuery(document).on('ready', function() {
  limitingDimension = jQuery('#sequence').width();
  if(jQuery(window).height() - 80 < limitingDimension) {
    limitingDimension = jQuery(window).height() - 80;
  }
  width = limitingDimension;
  height = limitingDimension;
  radius = (Math.min(width, height) / 2) - 10;

  x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

  y = d3.scale.sqrt()
    .range([0, radius]);
  
  refreshAll();
});

