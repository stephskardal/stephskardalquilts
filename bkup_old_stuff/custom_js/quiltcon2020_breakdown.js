jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/working_independent.css? ' + jQuery.now() + '"><link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">');

jQuery(document).ready(function() {
  jQuery('#sidebar,.post-related').remove();
  jQuery('#main').width(jQuery('.sp-container').width());

  google.charts.load('current', {'packages':['corechart']});
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart2020);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart2020() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Recipient');
    data.addColumn('number', 'Percentage');
    data.addRows([
      ['Small (58)',  58], //yes
      ['Minimalism (53)',  53], //yes
      ['Piecing (50)',  50],  // yes
      ['Improv (45)',  45],  // yes
      ['Modern Traditionalism (44)',  44], //yes
      ['Stripes (43)',  43], //yes
      ['Negative Space (34)',  34], //yes
      ['Applique (28)',  28], //yes
      ['Me+You (22)',  22], //yes
      ['Youth (20)',  20], //yes
      ['Group / Bee (17)',  17], //yes for sure
      ['Handwork (14)',  14] //yes
    ]);

    
    var chartWidth = 350;
    var chartHeight = chartWidth;
    if(chartWidth > 500) {
      chartHeight = chartWidth - 100;
    }
    // Set chart options
    var options = {
                    'title':'2020 QuiltCon Breakdown (428 Total)', //uiltCon 2019 Category Breakdown',
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
  
  google.charts.load('current', {'packages':['corechart']});
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart2019);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
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
      ['Michael Miller (23)',  23], //yes
      ['Youth (20)',  20], //yes
      ['Handwork (17)',  17], //yes
      ['Applique (16)',  16], //yes
      ['Group / Bee (12)',  12] //yes for sure
    ]);

    
    var chartWidth = 350;
    var chartHeight = chartWidth;
    if(chartWidth > 500) {
      chartHeight = chartWidth - 100;
    }
    // Set chart options
    var options = {
                    'title':'2019 QuiltCon Breakdown (387 Total)', //uiltCon 2019 Category Breakdown',
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
