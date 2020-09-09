google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['Country', 'Leads'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['RU', 700]
    ]);

    var options = {
      colorAxis: {colors: ['#FBB23B']},  
    };

    var chart = new google.visualization.GeoChart(document.getElementById('map-chart'));

    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'onclick', function(e) {
      setTooltipContent(dataTable,e.row);
  });
  }
  function setTooltipContent(dataTable,row) {
    if (row != null) {
        var content = '<div class="custom-tooltip" ><h1>' + dataTable.getValue(row, 0) + '</h1><div>' + dataTable.getValue(row, 1) + '</div></div>'; //generate tooltip content
        var tooltip = document.getElementsByClassName("google-visualization-tooltip")[0];
        tooltip.innerHTML = content;
    }
}