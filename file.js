google.load("visualization", "1", {
	packages: ["corechart"]
});
google.setOnLoadCallback(drawChart1);

function drawChart1() {
	var data = google.visualization.arrayToDataTable(arr);

	var options = {
		title: 'Confirmed Cases',
		curveType: 'function',
		hAxis: {
			textStyle: {
				color: 'gray',
				fontSize: 12,
			}
		},
		width: '100%',
		/*
						height:'300px',*/
		titleTextStyle: {
			color: '#188e82',
			fontSize: 20,
		},
		vAxis: {
			textStyle: {
				color: 'gray',
				fontSize: 12,
			},
			gridlines: {
				color: 'transparent'
			}
		},
		backgroundColor: {
			fill: '#1e1e1e'
		},
		legend: {
			position: 'bottom',
			textStyle: {
				color: 'white'
			}
		},
		colors: ['#3a4cb7']
	};

	var chart = new google.visualization.LineChart(document.getElementById('case'));
	chart.draw(data, options);
}

google.setOnLoadCallback(drawChart2);

function drawChart2() {
	var data = google.visualization.arrayToDataTable(arr_1);

	var options = {
		title: 'Recovered Cases',
		curveType: 'function',
		hAxis: {
			textStyle: {
				color: 'gray',
				fontSize: 12,
			}
		},

		titleTextStyle: {
			color: '#188e82',
			fontSize: 20,
		},
		width: '100%',
		vAxis: {
			textStyle: {
				color: 'gray',
				fontSize: 12,
			},
			gridlines: {
				color: 'transparent'
			}
		},
		backgroundColor: {
			fill: '#1e1e1e'
		},
		legend: {
			position: 'bottom',
			textStyle: {
				color: 'white'
			}
		},
		colors: ['orangered']
	};

	var chart = new google.visualization.LineChart(document.getElementById('recover'));
	chart.draw(data, options);
}
google.setOnLoadCallback(drawChart3);

function drawChart3() {
	var data = google.visualization.arrayToDataTable([
				['Recovered', 'Not-Recovered'],
				['Recovered', parseFloat(a / b * 100)],
				['Not Recovered', 100 - parseFloat(a / b * 100)],

			]);

	var options = {
		pieSliceTextStyle: {
			fontsize: 16,
			color: 'transparent'
		},
		slices: {
			0: {
				color: '#09b4ff'
			},
			1: {
				color: '#444'
			}
		},
		title: 'Recovery-Rate',
		pieHole: 0.70,
		colors: ['#3a4cb7', '#dde1e7'],
		responsive: true,
		labels: false,
		backgroundColor: {
			fill: '#1e1e1e'
		},
		titleTextStyle: {
			color: '#188e82',
			fontSize: 20,
		},
		legend: {
			position: 'bottom',
			textStyle: {
				color: 'white'
			}
		},
	};

	var chart = new google.visualization.PieChart(document.getElementById('recovery'));
	chart.draw(data, options);
}
google.setOnLoadCallback(drawChart4);

function drawChart4() {
	var data = google.visualization.arrayToDataTable([
				['Death', 'Active&Recovered', {
			role: 'style'
				}],
				['Death', parseFloat(c / b * 100), 'color: #e5e4e2'],
				['Active & Recovered', 100 - parseFloat(c / b * 100), 'green'],

			]);

	var options = {
		pieSliceTextStyle: {
			fontsize: 16,
			color: 'transparent'
		},
		slices: {
			0: {
				color: 'orangered'
			},
			1: {
				color: '#444'
			}
		},
		title: 'Fatality-Rate',
		pieHole: 0.70,
		colors: ['#3a4cb7', '#dde1e7'],
		responsive: true,
		labels: false,
		backgroundColor: {
			fill: '#1e1e1e'
		},
		titleTextStyle: {
			color: '#188e82',
			fontSize: 20,
		},
		legend: {
			position: 'bottom',
			textStyle: {
				color: 'white'
			}
		},
	};

	var chart = new google.visualization.PieChart(document.getElementById('fatality'));
	chart.draw(data, options);
}

google.setOnLoadCallback(drawChart5);

function drawChart5() {
	var data = google.visualization.arrayToDataTable(arr_2);

	var view = new google.visualization.DataView(data);


	var options = {
		bar: {
			groupWidth: "70%",
		},
		title: 'Daily Cases',
		curveType: 'function',
		hAxis: {
			textStyle: {
				color: 'gray',
				fontSize: 12,
			}
		},
		titleTextStyle: {
			color: '#188e82',
			fontSize: 20,
		},
		vAxis: {
			textStyle: {
				color: 'gray',
				fontSize: 12,
			},
			gridlines: {
				color: 'transparent'
			},
			 viewWindow: {
              min:0
            }
		},
		backgroundColor: {
			fill: '#1e1e1e'
		},
		legend: {
			position: 'bottom',
			textStyle: {
				color: 'white'
			}
		},
		colors: ['#ff0050']
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('cases_data'));
	chart.draw(data, options);
}
$(window).resize(function () {
	drawChart1();
	drawChart2();
	drawChart3();
	drawChart4();
	drawChart5();
});
var arr = [],
	arr_1 = [],
	arr_2 = [],
	j = 0,
	i = 0,
	k,
	a, b, c;

const url = "https://data.covid19india.org/data.json";
fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		j = 0;
		k = 0;
		arr[0] = ['Date', 'Total Cases'];
		arr_1[0] = ['Date', 'Recovered Cases'];
		arr_2[0] = ['Date', 'Daily Cases'];
		j = 30;
		k = 14;
		for (i = data.cases_time_series.length - 1; j > 0; i--) {
			var arr1 = [],
				arr2 = [],
				arr3 = [];
			arr1[0] = data.cases_time_series[i].date;
			arr2[0] = data.cases_time_series[i].date;
			arr3[0] = data.cases_time_series[i].date;
			arr1[1] = parseInt(data.cases_time_series[i].totalconfirmed);
			arr2[1] = parseInt(data.cases_time_series[i].totalrecovered);
			arr3[1] = parseInt(data.cases_time_series[i].dailyconfirmed);
			arr[j] = arr1;
			arr_1[j] = arr2;
			if (k > 0) {
				arr_2[k] = arr3;
				k--;
			}

			j--;
		}
		console.log(arr_2);
		console.log(data.statewise);
		//arr[0]['Work', 9];
		a = data.statewise[0].recovered;
		b = data.statewise[0].confirmed;
		c = data.statewise[0].deaths;
		document.getElementById("total_cases").innerHTML = `<h2 >${b}</h2><p>Infected</p>`;
		document.getElementById("total_recovered").innerHTML = `<h2 >${a}</h2><p>Recovered</p>`;
		document.getElementById("total_deaths").innerHTML = `<h2 >${c}</h2><p>Deaths</p>`;
		for (i = 1; i < 38; i++) {
			var element = document.createElement("li");
			document.getElementById("list").appendChild(element);
			element.innerHTML = `${data.statewise[i].confirmed}<span id="state"> ${data.statewise[i].state}</span><br><span id="death"> Death: </span>${data.statewise[i].deaths}<br><span id="recovered">Recovered: </span>${data.statewise[i].recovered}`;
		}

	})

function show(n) {
	var side = document.getElementById("sidebar");
	var main = document.getElementById("main");
	//alert(side.style.textAlign);
	if (side.style.width == "0px" && n == false) {

	} else {
		document.getElementById("btn").classList.toggle("change");
	}
	if (side.style.width == '0px' && n == true) {
		side.style.width = "50vw";
		side.style.maxWidth = "300px";
		main.style.opacity = '0.5';
		main.style.cursor = "pointer";
		side.style.zIndex = "5";
		side.style.padding = "20px";
	} else {
		side.style.width = '0';
		main.style.opacity = '1';
		side.style.zIndex = "1";
		main.style.cursor = "default";
		side.style.padding = "0";
	}
}
