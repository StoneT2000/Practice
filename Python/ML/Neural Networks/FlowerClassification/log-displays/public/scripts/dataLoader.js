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
            name:"Training Accuracy",
            color:"red",
          },
          val_acc:{
            name:"Validation Accuracy",
            color:"rgb(55,155,230)",
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
            name:"Training Loss",
            color:"red",
          },
          val_loss:{
            name:"Validation Loss",
            color:"rgb(55,155,230)",
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
  let data = msg.splice(1, msg.length/10) //contains the actual data
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
      if (!mapKeyToGraph.hasOwnProperty(key)){
        mapKeyToGraph[key] = {};
        mapKeyToGraph[key][graphConfig] = i;
      }
      else {
        mapKeyToGraph[key][graphConfig] = i;
      }
      let statChartData = new Array(data.length);
      for(let j = 0; j < data.length; j++) {
        statChartData[j] = {y:parseFloat(data[j][key]),x:(j)}
      }
      console.log(statChartData);
      datasetsArr.push({
            label:thisGraph.dataConfig[key].name,
            data: statChartData,
            borderColor: thisGraph.dataConfig[key].color,
            backgroundColor: 'white',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHoverBackgroundColor: 'white',
            cubicInterpolationMode:'monotone',
            lineTension:0.01
          });
    });
    
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
  metricData = msg;
  }
});
socket.on('jsonUpdate', function(msg) {
  console.log("received update")
  
  /*Add update to corresponding graph using the configuration data initially sent*/
  /**/
  
  
  appendMetrics(msg[0], msg[1])
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
