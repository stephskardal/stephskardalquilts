jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/working_independent.css? ' + jQuery.now() + '"><link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">');

jQuery(document).ready(function() {
  jQuery('#sidebar,.post-related').remove();
  jQuery('#main').width(jQuery('.sp-container').width());

  google.charts.load('current', {'packages':['corechart']});

  google.charts.setOnLoadCallback(drawChart2022);
  google.charts.setOnLoadCallback(drawChart2021);
  google.charts.setOnLoadCallback(drawChart2020);
  google.charts.setOnLoadCallback(drawChart2019);

  // 2022
  function drawChart2022() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Recipient');
    data.addColumn('number', 'Percentage');
    data.addRows([
      ['Minimalism (40)', 40], //yes
      ['Small (46)', 46], //yes
      ['Modern Traditionalism (68)', 68], //yes
      ['Hexagons (20)', 20], //yes
      ['Piecing (55)', 55],  // yes
      ['Improv (71)', 71], // yes
      ['Negative Space (46)', 46], //yes
      ['Fabric Challenge (31)', 31], //yes
      ['Youth (19)', 19], //yes
      ['Handwork (37)', 37], //yes
      ['Applique (25)',  25], //yes
      ['Group / Bee (23)',  23] //yes for sure
    ]);

    var chartWidth = 400;
    var chartHeight = chartWidth;
    if(chartWidth > 500) {
      chartHeight = chartWidth - 100;
    }
    // Set chart options
    var options = {
                    'title':'2022 Breakdown (481 Total)', //uiltCon 2019 Category Breakdown',
                    'width':chartWidth,
                    'height':chartHeight,
                    pieHole: 0.2,
                    'chartArea': {'width': '90%', 'height': '90%'},
                    pieSliceText: 'percentage',
                    tooltip: { text: 'percentage' },
                    legend: { alignment: 'center', position: 'left'}
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart2022'));
    chart.draw(data, options);
  }

  // 2021
  function drawChart2021() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Recipient');
    data.addColumn('number', 'Percentage');
    data.addRows([
      ['Minimalism (28)',  28], //yes
      ['Small (43)',  43], //yes
      ['Modern Traditionalism (55)',  55], //yes
      ['Wedges (23)',  23], //yes
      ['Piecing (41)',  41],  // yes
      ['Improv (42)',  42],  // yes
      ['Negative Space (19)',  19], //yes
      ['Fabric Challenge (27)',  27], //yes
      ['Youth (5)',  5], //yes
      ['Handwork (19)',  19], //yes
      ['Applique (25)',  25], //yes
      ['Group / Bee (13)',  13] //yes for sure
    ]);

    var chartWidth = 400;
    var chartHeight = chartWidth;
    if(chartWidth > 500) {
      chartHeight = chartWidth - 100;
    }
    // Set chart options
    var options = {
                    'title':'2021 Breakdown (340 Total)', //uiltCon 2019 Category Breakdown',
                    'width':chartWidth,
                    'height':chartHeight,
                    pieHole: 0.2,
                    'chartArea': {'width': '90%', 'height': '90%'},
                    pieSliceText: 'percentage',
                    tooltip: { text: 'percentage' },
                    legend: { alignment: 'center', position: 'left'}
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart2021'));
    chart.draw(data, options);
  }

  // 2020
  function drawChart2020() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Recipient');
    data.addColumn('number', 'Percentage');
    data.addRows([
      ['Minimalism (53)',  53], //yes
      ['Small (58)',  58], //yes
      ['Modern Traditionalism (44)',  44], //yes
      ['Stripes (43)',  43], //yes
      ['Piecing (50)',  50],  // yes
      ['Improv (45)',  45],  // yes
      ['Negative Space (34)',  34], //yes
      ['Fabric Challenge (22)',  22], //yes
      ['Youth (20)',  20], //yes
      ['Handwork (14)',  14], //yes
      ['Applique (28)',  28], //yes
      ['Group / Bee (17)',  17] //yes for sure
    ]);

    
    var chartWidth = 400;
    var chartHeight = chartWidth;
    if(chartWidth > 500) {
      chartHeight = chartWidth - 100;
    }
    // Set chart options
    var options = {
                    'title':'2020 Breakdown (428 Total)', //uiltCon 2019 Category Breakdown',
                    'width':chartWidth,
                    'height':chartHeight,
                    pieHole: 0.2,
                    'chartArea': {'width': '90%', 'height': '90%'},
                    pieSliceText: 'percentage',
                    tooltip: { text: 'percentage' },
                    legend: { alignment: 'center', position: 'left'}
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart2020'));
    chart.draw(data, options);
  }
 
  // 2019 
  google.charts.setOnLoadCallback(drawChart2019);
  function drawChart2019() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Recipient');
    data.addColumn('number', 'Percentage');
    data.addRows([
      ['Minimalism (62)',  62], //yes
      ['Small (45)',  45], //yes
      ['Modern Traditionalism (48)',  48], //yes
      ['Two-Color (43)',  43], //yes
      ['Piecing (39)',  39],  // yes
      ['Improv (37)',  37],  // yes
      ['Negative Space (25)',  25], //yes
      ['Fabric Challenge (23)',  23], //yes
      ['Youth (20)',  20], //yes
      ['Handwork (17)',  17], //yes
      ['Applique (16)',  16], //yes
      ['Group / Bee (12)',  12] //yes for sure
    ]);

    
    var chartWidth = 400;
    var chartHeight = chartWidth;
    if(chartWidth > 500) {
      chartHeight = chartWidth - 100;
    }
    // Set chart options
    var options = {
                    'title':'2019 Breakdown (387 Total)', //uiltCon 2019 Category Breakdown',
                    'width':chartWidth,
                    'height':chartHeight,
                    pieHole: 0.2,
                    'chartArea': {'width': '90%', 'height': '90%'},
                    pieSliceText: 'percentage',
                    tooltip: { text: 'percentage' },
                    legend: { alignment: 'center', position: 'left'}
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart2019'));
    chart.draw(data, options);
  }
});
