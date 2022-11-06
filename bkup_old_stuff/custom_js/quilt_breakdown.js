jQuery(document).ready(function() {
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
      ['Design', 2],
      ['Initial Piecing & Organizing', 7],
      ['Piecing', 27],
      ['Quilting (Machine)', 15],
      ['Binding', 4],
      ['Thread Burying', 1]
    ]);

    var chartWidth = 450;
    if(jQuery('#first-paragraph').width() < 800) {
      chartWidth = jQuery('#first-paragraph').width();
    }
    // Set chart options
    var options = {'title':'Relative Breakdown of Making Recent Quilt',
                   'width':chartWidth,
                   'height':chartWidth,
                   colors: ['#c32654', '#c2b827', '#26c338', '#c32675', '#2634c3', 'c39526']};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
});
