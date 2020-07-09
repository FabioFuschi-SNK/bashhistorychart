function sorter(data){
	var sortable = [];

	for (var prop in data) {
		sortable.push([prop, data[prop]]);
	}

	sortable.sort(function(a, b){
			return b[1] - a[1];
	});

	return sortable
}

function map(ary){
	var result = {};

	ary.forEach(function(element){
		var count = result[element.trim()] || 0
		result[element.trim()] = count + 1;
	});

	delete result[""];

	var resultAry = sorter(result);
	resultAry.unshift(['', '']);

	return resultAry
}

function drawChart() {
	var data = google.visualization.arrayToDataTable(map(document.querySelector("#data").textContent.split("\n")));
	var options = {
		title: 'Bash History'
	};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}
(function() {
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart); 
})();