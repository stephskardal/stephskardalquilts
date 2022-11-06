jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/colorWheel.css? ' + jQuery.now() + '">');

var data, split;
var originalOpacity = 1.0;

var refreshAll = function() {
  d3.text("/custom_js/fabricSwatches.js?v=20190920", function(error, root) {
    if (error) throw error;

    eval(root);

    resetData(fabricSwatches); 
    loadDataSet();
    renderData(fabricSwatches);
   
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
      jQuery('#harmony-selected').html('<span class="swatch" style="margin-top:30px;">Select solids, harmony type, and a color from the wheel.</span>');
      resetData(fabricSwatches);
      loadDataSet();
      renderData(fabricSwatches);
      refreshCenter(750);
    });

    jQuery('#custom_html-7').append(jQuery('<div style="width:50%;" id="harmony-choice"><h4 class="widget-title">Harmony</h4></div>'));
    jQuery('#harmony-choice').append(jQuery('<a href="#" class="harmony selected" data-value="match">Hue "Match"</a>'));
    jQuery('#harmony-choice').append(jQuery('<a href="#" class="harmony" data-value="complementary">Complementary</a>'));
    jQuery('#harmony-choice').append(jQuery('<a href="#" class="harmony" data-value="triadic">Triadic</a>'));
    jQuery('#harmony-choice').append(jQuery('<a href="#" class="harmony" data-value="analogous">Analogous</a>'));
    jQuery('#harmony-choice').append(jQuery('<div id="harmony-selected"><span class="swatch" style="margin-top:30px;">Select solids, harmony type, and a color from the wheel.</span></div>'));

    jQuery('a.harmony').on('click', function(e) {
      e.preventDefault();
      renderData(fabricSwatches);
      jQuery('#harmony-selected').html('<span class="swatch" style="margin-top:30px;">Select solids, harmony type, and a color from the wheel.</span>');
      var $link = jQuery(this);
      $link.siblings('.selected').removeClass('selected');
      $link.addClass('selected');
    });
  });
};

var refreshCenter = function(length) {
  jQuery('#overlay').fadeIn(750);
  jQuery('#color-selected').html('');

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

var harmonies = { complementary: {}, triadic: {}, analogous: {} };

var hexes = '#FEFE33,#ffef1a,#FFE000,#ffd000,#FFC000,#ffb000,#FFA000,#ff9000,#FF8000,#ff7700,#FF6E00,#fe5700,#FC4000,#fe3a00,#FF3300,#ff1a00,#FF0000,#ff0020,#FF0040,#df0a45,#BF1449,#aa0a5b,#94006C,#8a0076,#800080,#8000a0,#8000C0,#6b18a7,#55308D,#4136aa,#2C3BC6,#1741e2,#0247FE,#0f55e5,#1B62CB,#286fb2,#347C98,#41897f,#4D9665,#5aa34c,#66B032,#79ba33,#8CC433,#9fce33,#B2D733,#c5e51e,#D8F208,#ebf81e'.split(',');
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
   
  jQuery.each(hexes, function(i, el) {
    if(i < 24) {
      harmonies.complementary[el] = hexes[i+24];
    } else {
      harmonies.complementary[el] = hexes[i - 24];
    }
    if(i < 16) {
      harmonies.triadic[el] = hexes[i+16] + ',' + hexes[i+32];
    } else if(i >=16 && i < 32) {
      harmonies.triadic[el] = hexes[i-16] + ',' + hexes[i+16];
    } else {
      harmonies.triadic[el] = hexes[i-16] + ',' + hexes[i-32];
    }
    if(i == 0) {
      harmonies.analogous[el] = hexes[47] + ',' + hexes[1];
    } else if(i < 47) {
      harmonies.analogous[el] = hexes[i-1] + ',' + hexes[i+1];
    } else if(i == 47) {
      harmonies.analogous[el] = hexes[0] + ',' + hexes[46];
    }

    var color = new Color(el);
    colorSorting.constructColor(color);
    color.name = el;
    color.children = [];
    color.dist = 'Base RYB';
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
        color.name = swatchData.label + ' ' + i;
        color.children = [];
        color.dist = swatchData.label;

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
    .outerRadius(function(d) { return 3000; });

var click = function(d) {
  d3.selectAll('#sequence path')
    .style('opacity', originalOpacity);

  var labels = [];

  var selection;
  var value = jQuery('#harmony-choice a.selected').data('value');
  if(value == 'match') {
    selection = '#sequence .hex-' + d.parentHex.replace(/^#/, '');
  } else if(value == 'complementary') {
    selection = '#sequence .hex-' + d.parentHex.replace(/^#/, '') + ',#sequence .hex-' + harmonies.complementary[d.parentHex].replace(/^#/, '');
  } else {
    selection = '#sequence .hex-' + d.parentHex.replace(/^#/, '') + ',#sequence .hex-' + harmonies[value][d.parentHex].split(',')[0].replace(/^#/, '') + ',#sequence .hex-' + harmonies[value][d.parentHex].split(',')[1].replace(/^#/, '');
  }

  d3.selectAll(selection)
    .transition(100)
    .style('opacity', 1.0)
    .attr('test', function(d) { labels.push({ name: d.name, hex: d.hex, val: d.val }); });
  var html = '';
  jQuery.each(labels, function(i, el) {
    if(el.name != el.hex && el.name != 'N/A') {
      var textColor = '#000000';
      if(el.val < 0.7) {
        textColor = '#FFFFFF'; 
      }
      html += '<span style="width:100%;border:none;background-color:' + el.hex + ';color:' + textColor + ';" class="swatch">' + el.name + '</span>';
    }
  });
  if(html == '') {
    html = '<span class="swatch" style="margin-top:30px;">Select solids, harmony type, and a color from the wheel.</span>';
  } else {
    html = '<h4 class="widget-title" style="margin:30px 0px 10px 0px;">Results</h4>' + html;
  }
  if(d3.selectAll(selection).size() == 1) {
    html += '<span style="width:100%" class="swatch">NOTHING ELSE TO SEE HERE</span>';
  }
  jQuery('#harmony-selected').html(html);
};

var loadDataSet = function(key) {
  var clusters = {};
  jQuery.each(split.colors, function(i, outer) {
    if(outer.dist == 'Base RYB') {
      outer.parentHex = outer.hex;
      clusters[outer.hex] = [];
      data.children.push(outer);
    }
  });

  //Second layer
  jQuery.each(split.colors, function(i, el) {
    if(el.dist != 'Base RYB') {
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
      .attr('class', function(d) { return d.dist != 'Base RYB' ? 'hex-' + d.parentHex.replace(/^#/, '') : ''; })
      .style('opacity', originalOpacity)
      .on('click', click)
    .append("title")
      .text(function(d) { return (d.dist !== undefined ? d.dist + ': ' + d.name : ''); });
};

var buildChildren = function(parentHex, children) {
  var firstEl = children.shift();
  if(children.length > 1) {
    return [{ name: firstEl.name, val: firstEl.val, size: 10, parentHex: parentHex, hex: firstEl.hex, children: buildChildren(parentHex, children) }];
  } else {
    return [{ name: firstEl.name, val: firstEl.val, size: 10, parentHex: parentHex, hex: firstEl.hex, children: [] }];
  }
};

jQuery(document).on('ready', function() {
  jQuery('.post-related,.post-pagination').remove();
  if(jQuery(window).width() < 960) { 
    jQuery('#sidebar').css({ width: '100%', margin: '0px', padding: '20px 0px 0px 0px' }).insertAfter(jQuery('#sequence'));
    jQuery('#instruction').insertAfter(jQuery('#sequence'));
    jQuery('#sequence').css({ 'text-align': 'center' });
    jQuery('#custom_html-7').css({ display: 'flex', 'justify-content': 'space-between' });
    jQuery('#custom_html-7 > div').css({ width: '46%', 'flex-grow': 0 });
  } else {
    jQuery('#sidebar').width('500px');
    jQuery('#main').width(jQuery('div.sp-row').width() - 600);
    jQuery('#custom_html-7').css({ display: 'flex', 'justify-content': 'space-between' });
    jQuery('#custom_html-7 > div').css({ width: '46%', 'flex-grow': 0 });
  }

  limitingDimension = jQuery('#sequence').width();
  if(jQuery(window).height() - 80 < limitingDimension) {
    limitingDimension = jQuery(window).height() - 80;
  }
  width = limitingDimension;
  height = limitingDimension;
  width = 450; //4500;
  height = 300; //3000;
  radius = (Math.min(width, height) / 2) - 10;

  x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

  y = d3.scale.sqrt()
    .range([0, radius]);
  
  refreshAll();
});

