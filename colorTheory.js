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

var fabricSwatches = {
  primaryColors: {
    label: 'Primary Colors',
    swatches: ['#FE2712', '#0247FE', '#FEFE33']
  },
  secondaryColors: {
    label: 'With Secondary Colors',
    swatches: ['#FE2712', '#FF8000', '#FEFE33', '#66B032', '#0247FE', '#800080']
  },
  tertiaryColors: {
    label: 'With Tertiary Colors',
    swatches: ['#FEFE33', '#FFC000', '#FF8000', '#FF4000', '#FE2712', '#BF1449', '#800080', '#55308D', '#0247FE', '#347C98', '#66B032', '#B2D733']
  },
  quaternaryColors: {
    label: 'With Quaternary Colors',
    swatches: ['#FEFE33', '#FFE000', '#FFC000', '#FFA000', '#FF8000', '#FF6E00', '#FC4000', '#FF3300', '#FF0000', '#FF0040', '#BF1449', '#94006C', '#800080', '#8000C0', '#55308D', '#2C3BC6', '#0247FE', '#1B62CB', '#347C98', '#4D9665', '#66B032', '#8CC433', '#B2D733', '#D8F208']
  }
};
var limitingDimension, width, height, radius;

var refreshAll = function () {
  if (jQuery(window).width() < 960) {
    jQuery('#sidebar').css({ width: '100%', margin: '0px', padding: '20px 0px 0px 0px' }).insertBefore(jQuery('#js-includes'));
    jQuery('#sequence').css({ 'text-align': 'center' });
  }

  jQuery('#limit-to a:first').remove();
  resetData('primaryColors');
  loadDataSet('primaryColors');
  renderData('primaryColors');
  jQuery('#limit-to a:first').addClass('selected');

  jQuery('#refresh').on('click', function (e) {
    e.preventDefault();
    refreshCenter(750);
  });
  jQuery('a.limit-by').on('click', function (e) {
    e.preventDefault();
    var $link = jQuery(this);
    $link.siblings('.selected').removeClass('selected');
    $link.addClass('selected');
    resetData($link.data('value'));
    loadDataSet($link.data('value'));
    renderData($link.data('value'));
    refreshCenter(750);
  });
};

var refreshCenter = function (length) {
  jQuery('#overlay').fadeIn(750);
  jQuery('#color-selected').html('<span class="swatch">Hover over a color</span>');

  var d = data;
  d3.select('#sequence svg').transition()
    .duration(length)
    .tween("scale", function () {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : -200, radius + 50]);
      return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
    })
    .selectAll("path")
    .attr('original-d', d)
    .attrTween("d", function (d) { return function () { return arc(d); }; });
};

var resetData = function (selectedKey) {
  data = {
    name: 'white',
    hex: '#FFFFFF',
    children: []
  };
  split = {
    colors: [],
    blacks: []
  };
  jQuery.each(fabricSwatches, function (key, swatchData) {
    if (jQuery('#limit-to a.read-more[data-value="' + key + '"]').size() == 0) {
      jQuery('#limit-to').append(jQuery('<a href="#" class="limit-by read-more" data-value="' + key + '">' + swatchData.label + '</a>'));
    }
    if (selectedKey == 'all' || key == selectedKey) {
      jQuery.each(swatchData.swatches, function (i, el) {
        var color = new Color(el);
        colorSorting.constructColor(color);
        color.children = [];

        if (color.sat == 0 && color.hue == 0) {
          color.sat = 1 - color.val;
          split.blacks.push(color);
        } else {
          split.colors.push(color);
        }
      });
    }
  });
};

var x, y;
var partition = d3.layout.partition()
  .value(function (d) { return d.size; }).sort(null);
var arc = d3.svg.arc()
  .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
  .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
  .innerRadius(function (d) { return Math.max(0, y(d.y)); })
  .outerRadius(function (d) { return Math.max(0, y(d.y + d.dy)); });

var hover = function (d) {
  var textColor = '#000000';
  if (d.val < 0.7) {
    textColor = '#FFFFFF';
  }
  if (d.hex != '#FFFFFF') {
    var labelString = d.hex;
    jQuery('#color-selected').html('<span style="background-color:' + d.hex + ';color:' + textColor + ';" class="swatch">' + labelString + '</span>');
  } else {
    //jQuery('#color-selected').html('<span class="swatch">Hover over a color</span>');
  }
}

var loadDataSet = function (key) {
  jQuery.each(split.colors, function (i, outer) {
    //if(outer[ringKey] > 0.3) {
    data.children.push(outer);
    // }
  });

  //Second layer
  jQuery.each(data.children, function (i, el) {
    if (el.children.length == 0) {
      el.children = [{ name: 'N/A', size: 10, hex: '#FFFFFF', hue: el.hue, children: [] }];
    } else {
      el.children = colorSorting.sortColorsBy(el.children, 'hue');
    }
  });
  data.children = colorSorting.sortColorsBy(data.children, 'hue');

  //Set all sizes
  jQuery.each(data.children, function (i, el) {
    jQuery.each(el.children, function (j, lowerEl) {
      jQuery.each(lowerEl.children, function (j, anotherEl) {
        if (anotherEl.children.length == 0) {
          anotherEl.children = [{ name: 'N/A', size: 10, hex: '#FFFFFF', hue: anotherEl.hue, children: [] }];
        } else {
          anotherEl.children = colorSorting.sortColorsBy(anotherEl.children, 'hue');
        }
      });
    });
  });
};

var renderData = function (key) {
  d3.select('#sequence svg').remove();
  var svg = d3.select("#sequence").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  if (jQuery(window).width() < 420) {
    jQuery('#overlay').html('Highest saturation<br />in the center,<br />decreasing as you<br />move away.');
  }
  jQuery('#overlay').css({ 'margin-top': height / 2 - jQuery('#overlay').height() / 2 });
  jQuery('#overlay').css({ 'margin-left': jQuery('#sequence').width() / 2 - jQuery('#overlay').width() / 2 }).show();
  svg.selectAll("path")
    .data(partition.nodes(data))
    .enter().append("path")
    .attr("d", arc)
    .style("fill", function (d) { return d.hex; })
    .on('mouseover', hover)
    .append("title")
    .text(function (d) { return d.hex; });

  var html = '';
  jQuery.each(colorSorting.sortColorsBy(split.blacks, 'luma'), function (i, el) {
    var labelString, textColor;
    if (key == 'all') {
      labelString = el.dist + ' ' + el.name;
    } else {
      labelString = el.name;
    }
    if (el.val < 0.7) {
      textColor = '#FFFFFF';
    } else {
      textColor = '#000000';
    }
    html += '<span class="swatch" style="background-color:' + el.hex + ';color:' + textColor + ';" title="' + el.hex + '" >' + labelString + '</span>';
  });
  if (html != '') {
    if (key == 'all') {
      html = '<h4 class="widget-title">Hueless (Blacks/Grays)</h4>' + html;
    } else {
      html = '<h4 class="widget-title">' + fabricSwatches[key].label + ' Hueless (Blacks/Grays)</h4>' + html;
    }
  }
  jQuery('#blacks').html(html);
};

var buildSecondary = function (buildFrom, buildTo, label) {
  fabricSwatches[buildTo] = {
    label: label,
    swatches: []
  };
  var length = fabricSwatches[buildFrom].swatches.length - 1;
  jQuery.each(fabricSwatches[buildFrom].swatches, function (i, value) {
    fabricSwatches[buildTo].swatches.push(value);
    var scalePos = i + 1;
    if (i == length) {
      scalePos = 0;
    }

    var chromaScale = chroma.scale([fabricSwatches[buildFrom].swatches[i], fabricSwatches[buildFrom].swatches[scalePos]]).colors(3);
    fabricSwatches[buildTo].swatches.push(chromaScale[1]);
  });
};

jQuery(document).on('ready', function () {
  jQuery('#custom_html-7').prepend(jQuery('#sequence'));
  jQuery('#limit-to h4').remove();

  limitingDimension = jQuery('#sequence').width();
  if (jQuery(window).height() - 80 < limitingDimension) {
    limitingDimension = jQuery(window).height() - 80;
  }
  width = limitingDimension;
  height = limitingDimension;
  radius = (Math.min(width, height) / 2) - 10;

  x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

  y = d3.scale.sqrt()
    .range([-200, radius + 50]);

  buildSecondary('quaternaryColors', 'quinaryColors', 'With Quinary Colors');
  buildSecondary('quinaryColors', 'senaryColors', 'With Senary Colors');
  buildSecondary('senaryColors', 'septenaryColors', 'With Septenary Colors');

  refreshAll();

  if (jQuery(window).width() >= 960) {
    jQuery('#custom_html-7').sticky({ topSpacing: 70 });
  }
});

