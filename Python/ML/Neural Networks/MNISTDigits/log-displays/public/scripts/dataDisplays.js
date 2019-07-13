var statCharts = {};
$(document).ready(function () {
  var ctx1 = document.getElementById('chart-1');
  statCharts['template'] = new Chart(ctx1, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Accuracy',
          data: [{
            x: -10,
            y: 0
            }, {
            x: 0,
            y: 10
            }, {
            x: 10,
            y: 5
            }],
          borderColor: 'rgb(55,155,230)',
          backgroundColor: 'white',
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'white',
        },
        ],
      labels: [1, 2, 3, 4.5, 6, 7]
    },
    options: defaultChartOption
  });
});

function generateDefaultDatasetOptions(index) {
  let defaultDatasetOptions = {
    label:'Label_' + index,
    borderColor: defaultColors[index],
    backgroundColor: 'white',
    fill: false,
    pointRadius: 0,
    pointHoverRadius: 0,
    pointHoverBackgroundColor: 'white',
    cubicInterpolationMode:'monotone',
    lineTension:0
  }
  return defaultDatasetOptions;
}
//default colors chosen from if color not given
var defaultColors = ['rgb(255, 99, 132)','rgb(55, 159, 255)','#3cbbb1','rgb(155, 99, 255)', '#a4ddac','#ff8469','#c7cfd1','#ffaa5a','#a6988d','#e9eb87','#55546d'];
var defaultIndex = 0; //index of properties to use from various default option styling
var maxDefaultIndex = 11;
var defaultChartOption = {
  responsive: true,
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: "Training Accuracy"
      }
        }],
    xAxes: [{
      type: 'linear',
      scaleLabel: {
        display: true,
        labelString: "Epochs"
      }
        }],
  },
  animation: {
    duration: 1400
  },
  legend: {
    display: true
  },
  maintainAspectRatio: false,
  plugins: {
	zoom: {
		// Container for pan options
		pan: {
			// Boolean to enable panning
			enabled: false,

			// Panning directions. Remove the appropriate direction to disable
			// Eg. 'y' would only allow panning in the y direction
			mode: 'xy',
			rangeMin: {
				// Format of min pan range depends on scale type
				x: null,
				y: null
			},
			rangeMax: {
				// Format of max pan range depends on scale type
				x: null,
				y: null
			},
			// Function called once panning is completed
			// Useful for dynamic data loading
			onPan: function({chart}) { console.log(`I was panned!!!`); }
		},

		// Container for zoom options
		zoom: {
			// Boolean to enable zooming
			enabled: true,

			// Enable drag-to-zoom behavior
			drag: true,

			// Drag-to-zoom rectangle style can be customized
			// drag: {
			// 	 borderColor: 'rgba(225,225,225,0.3)'
			// 	 borderWidth: 5,
			// 	 backgroundColor: 'rgb(225,225,225)'
			// },

			// Zooming directions. Remove the appropriate direction to disable
			// Eg. 'y' would only allow zooming in the y direction
			mode: 'xy',

			rangeMin: {
				// Format of min zoom range depends on scale type
				x: null,
				y: null
			},
			rangeMax: {
				// Format of max zoom range depends on scale type
				x: null,
				y: null
			},

			// Speed of zoom via mouse wheel
			// (percentage of zoom on a wheel event)
			speed: 0.1,

			// Function called once zooming is completed
			// Useful for dynamic data loading
			onZoom: function({chart}) { console.log(`I was zoomed!!!`); }
		}
	}
}
}