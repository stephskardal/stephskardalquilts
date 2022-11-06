jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/working_independent.css? ' + jQuery.now() + '"><link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">');

jQuery(document).ready(function() {
  jQuery('#tabs').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');;

  google.charts.load('current', {'packages':['corechart']});
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

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
      ['Michael Miller Challenge (23)',  23], //yes
      ['Youth (20)',  20], //yes
      ['Handwork (17)',  17], //yes
      ['Applique (16)',  16], //yes
      ['Group / Bee (12)',  12] //yes for sure
    ]);

    
    var chartWidth = jQuery('#tabs-1').width();
    var chartHeight = chartWidth;
    if(chartWidth > 500) {
      chartHeight = chartWidth - 100;
    }
    // Set chart options
    var options = {
                    'title':'', //uiltCon 2019 Category Breakdown',
                    'width':chartWidth,
                    'height':chartHeight,
                    pieHole: 0.2,
                    'chartArea': {'width': '90%', 'height': '90%'},
                    pieSliceText: 'percentage',
                    tooltip: { text: 'percentage' },
                    legend: { alignment: 'center', position: 'left'}
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
});
