jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/working_independent.css? ' + jQuery.now() + '"><link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">');

jQuery(document).ready(function() {
  jQuery('.post-related').remove();
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
      ['Quilt Shop', 50],
      ['Distributor', 15],
      ['Designer', 35]
    ]);

    // Set chart options
    var options = {'title':'Approx. Distribution of Pattern Sales',
                   'width':400,
                   'height':300,
                   colors: ['#e0440e', '#ec8f6e', '#f6c7b6']};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
});
