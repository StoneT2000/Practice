var socket = io();
var metricData = [];
var graphConfigs = {
    graphs:{
      accuracy: {
        name:"Accuracy",
        xLabel:"Epochs",
        yLabel:"",
        keys:['acc','val_acc'],
        dataConfig:{
          acc:{
            label:"Training Accuracy",
            borderColor:"green",
          },
          val_acc:{
            label:"Validation Accuracy",
          }
        },
      },
      loss: {
        name:"Loss",
        xLabel:"Epochs",
        yLabel:"",
        keys:['loss','val_loss'],
        dataConfig:{
          loss:{
            label:"Training Loss",
          },
          val_loss:{
            name:"Validation Loss",
          }
        },
      }
    }
  }
var mapKeyToGraph = {}; //mapKeyToGraph[key] = object filled with all relevant graphs names as keys, each = their index position in the .data.datasets array

$(document).ready(function(){
socket.on('jsonLoad', function(msg) {
  console.log(msg)
  $("#data").html("");
  let keys = Object.keys(statCharts)
  //backend also sends a config file that tells the client how to process the data sent
  let config = msg[0];
  //msg[0] contains configuration data
  metricData = msg.slice();
  let data = msg.splice(1, msg.length) //contains the actual data
  console.log(data,msg)
  /*
  msg[0] = {
    graphs:{
      nameOfGraphIncamelCasepreferablly:{
        name:'Accuracy',
        xLabel:'Epochs',
        yLabel:'Accuracy',
        keys:['acc','val_acc'] the keys in data to look for and append to nameOfGraph. Keys must be usable as var names
        dataConfig:{
          acc:{ acc=acc name above in keys
            name:"Training Accuracy",
            color:"red",
          },
          val_acc:{
            name:"Validation Accuracy",
            color:"rgb(55,155,230)",
          }
        },
      }
    }

  }

  */
  config = graphConfigs
  let graphCount = 1;
  let graphKeys = Object.keys(config.graphs);
  let totalGraphs = graphKeys.length;
  for (let graphConfig in config.graphs) {
    let thisGraph = config.graphs[graphConfig];
    let thisGraphID = graphCount;
    //initialize new graph for this graph
    //this is for line graphs
    $('.charts').append("<div class='chart-wrapper'><canvas id='chart-" + graphCount +"'></canvas></div>");
    let ctx = document.getElementById('chart-' + graphCount);
    graphCount+=1;
    console.log(graphConfig);
    
    let datasetsArr = [];
    thisGraph.keys.forEach(function(key, i){
      // Map key to their graphs names and their position in the dataset array of the key
      // Each key represents a metric being plotted on thisGraph
      if (!mapKeyToGraph.hasOwnProperty(key)){
        mapKeyToGraph[key] = {};
        mapKeyToGraph[key][graphConfig] = i;
      }
      else {
        mapKeyToGraph[key][graphConfig] = i;
      }
      let statChartData = new Array(data.length);
      for(let j = 0; j < data.length; j++) {
        statChartData[j] = {y:parseFloat(data[j][key]),x:parseFloat(data[j].x)}
      }
      console.log(statChartData);
      let datasetOptions = generateDefaultDatasetOptions(defaultIndex);
      defaultIndex = (defaultIndex + 1) % maxDefaultIndex;
      datasetsArr.push({
            label:thisGraph.dataConfig[key].label,
            data: statChartData,
            borderColor: thisGraph.dataConfig[key].color,
            backgroundColor: 'white',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHoverBackgroundColor: 'white',
            cubicInterpolationMode:'monotone',
            lineTension:0
          });
      datasetsArr[datasetsArr.length - 1].data = statChartData;
      for (let dKey in thisGraph.dataConfig[key]) {
        datasetsArr[datasetsArr.length - 1][dKey] = thisGraph.dataConfig[key][dKey]
      }
    });
    
    //Setup default charting options, which are nicely formatted
    let thisOption = defaultChartOption;
    thisOption.scales.xAxes[0].scaleLabel.labelString = thisGraph.xLabel;
    thisOption.scales.yAxes[0].scaleLabel.labelString = thisGraph.yLabel;
    statCharts[graphConfig] = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasetsArr,
      },
      options: thisOption
    });
  
  }
});
socket.on('jsonUpdate', function(msg) {
  console.log("received update")
  
  /*Add update to corresponding graph using the configuration data initially sent*/
  /**/
  
  
  appendMetrics(msg[0], msg[0].x)
});
});
function appendMetrics(metric, epoch) {
  metricData.push(metric);
  for (let key in metric) {
    for (let graphKey in mapKeyToGraph[key]){
      //let graphsToAppendto = mapKeyToGraph[key];
      
      let index = mapKeyToGraph[key][graphKey]
      statCharts[graphKey].data.datasets[index].data.push({y:parseFloat(metric[key]),x:epoch});
      statCharts[graphKey].update();
    }
  }
}
