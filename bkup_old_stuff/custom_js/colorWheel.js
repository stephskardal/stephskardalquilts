jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/colorWheel.css? ' + jQuery.now() + '">');

var ringKey = 'sat';
var data = {
  name: 'white',
  hex: '#FFFFFF',
  children: []
};
var split = {
  all: { 
    colors: [],
    blacks: []
  }
};

var refreshAll = function() {
  d3.text("/custom_js/fabricSwatches.js?v=20190920", function(error, root) {
    if (error) throw error;

    if(jQuery(window).width() < 960) { 
      jQuery('#sidebar').css({ width: '100%', margin: '0px', padding: '20px 0px 0px 0px' }).insertAfter(jQuery('#sequence'));
      jQuery('#instruction').insertAfter(jQuery('#sequence'));
      jQuery('#sequence').css({ 'text-align': 'center' });
      jQuery('#color-selected').css('display', 'block');
    }
    eval(root);
  
    resetData(fabricSwatches); 
    loadDataSet('all');
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
    children: []
  };
  split = {
    colors: [],
    blacks: []
  };

  jQuery.each(fabricSwatches, function(key, swatchData) {
    if(jQuery("a.limit-by[data-value='all']").hasClass('selected') || jQuery("a.limit-by[data-value='" + key + "']").hasClass('selected')) {
      if(jQuery('#limit-to a.read-more[data-value="' + key + '"]').size() == 0) {
        jQuery('#limit-to').append(jQuery('<a href="#" class="limit-by read-more selected" data-value="' + key + '">' + swatchData.label + '</a>'));
      }
      jQuery.each(swatchData.swatches, function(i, el) {
        var color = new Color(el);
        colorSorting.constructColor(color);
        color.name = i;
        color.children = [];
        color.dist = swatchData.label;

        if(color.sat == 0 && color.hue == 0) {
          color.sat = 1 - color.val;
          split.blacks.push(color);
        } else {
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
    var labelString = d.dist + ' ' + d.name;
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
      .attr('original-d', d)
      .attrTween("d", function(d) { return function() { return arc(d); }; });
  if(d != data) {
    jQuery('#overlay').fadeOut(750);
  } else {
    jQuery('#overlay').fadeIn(750);
  }
}

var loadDataSet = function(key) {
  jQuery.each(split.colors, function(i, outer) {
    //ringKey is saturation here
    if(outer[ringKey] > 0.75) {
      data.children.push(outer);
    }
  });

  //Second layer
  jQuery.each(split.colors, function(i, el) {
    if(el[ringKey] > 0.5 && el[ringKey] <= 0.75) {
      var distance = 1000;
      var closest = undefined;
      jQuery.each(data.children, function(j, dataPoint) {
        if(Math.abs(dataPoint.hue - el.hue) < distance) {
          distance = Math.abs(dataPoint.hue - el.hue);
          closest = dataPoint;
        }
      });
      if(closest !== undefined) {
        closest.children.push(el);
      }
    }
  });
  jQuery.each(data.children, function(i, el) {
    if(el.children.length == 0) {
      el.children = [{ name: 'N/A', size: 10, hex: '#FFFFFF', hue: el.hue, children: [] }];
    } else {
      el.children = colorSorting.sortColorsBy(el.children, 'hue');
    }
  });
  data.children = colorSorting.sortColorsBy(data.children, 'hue');

  //Third layer
  jQuery.each(split.colors, function(i, el) {
    if(el[ringKey] > 0.25 && el[ringKey] <= 0.5) {
      var distance = 1000;
      var closest = undefined;
      jQuery.each(data.children, function(j, dataPoint) {
        jQuery.each(dataPoint.children, function(k, lowerDataPoint) {
          if(Math.abs(lowerDataPoint.hue - el.hue) < distance) {
            distance = Math.abs(lowerDataPoint.hue - el.hue);
            closest = lowerDataPoint;
          }
        });
      });
      el.size = 10;
      closest.children.push(el);
    }
  });
  jQuery.each(data.children, function(i, el) {
    jQuery.each(el.children, function(j, lowerEl) {
      if(lowerEl.children.length == 0) {
        lowerEl.children = [{ name: 'N/A', size: 10, hex: '#FFFFFF', hue: lowerEl.hue, children: [] }];
      } else {
        lowerEl.children = colorSorting.sortColorsBy(lowerEl.children, 'hue');
      }
    });
  });

  //Fourth layer
  jQuery.each(split.colors, function(i, el) {
    if(el[ringKey] <= 0.25) {
      var distance = 1000;
      var closest = undefined;
      jQuery.each(data.children, function(j, dataPoint) {
        jQuery.each(dataPoint.children, function(k, lowerDataPoint) {
          jQuery.each(lowerDataPoint.children, function(k, anotherDataPoint) {
            if(Math.abs(anotherDataPoint.hue - el.hue) < distance) {
              distance = Math.abs(anotherDataPoint.hue - el.hue);
              closest = anotherDataPoint;
            }
          });
        });
      });
      el.size = 10;
      if(closest !== undefined) {
        closest.children.push(el);
      }
    }
  });

  //Set all sizes
  jQuery.each(data.children, function(i, el) {
    jQuery.each(el.children, function(j, lowerEl) {
      jQuery.each(lowerEl.children, function(j, anotherEl) {
        if(anotherEl.children.length == 0) {
          anotherEl.children = [{ name: 'N/A', size: 10, hex: '#FFFFFF', hue: anotherEl.hue, children: [] }];
        } else {
          anotherEl.children = colorSorting.sortColorsBy(anotherEl.children, 'hue');
        }
      });
    });
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
      .on("click", click)
    .append("title")
      .text(function(d) { return (d.dist !== undefined ? d.dist + ': ' + d.name : ''); });

  var html = '';
  jQuery.each(colorSorting.sortColorsBy(split.blacks, 'luma'), function(i, el) {
    var labelString, textColor;
    labelString = el.dist + ' ' + el.name;
    if(el.val < 0.7) {
      textColor = '#FFFFFF'; 
    } else {
      textColor = '#000000';
    }
    html += '<span class="swatch" style="background-color:' + el.hex + ';color:' + textColor + ';" title="' + el.hex + '" >' + labelString + '</span>';
  });
  if(html != '') {
    html = '<h4 class="widget-title">Hueless (Blacks/Grays)</h4>' + html;
  }
  jQuery('#blacks').html(html);
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

