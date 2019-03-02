/*template.js*/
const { PerformanceObserver, performance } = require('perf_hooks');
const seedrandom = require('seedrandom');
var rng = seedrandom(3141);
//SETUP


const obs = new PerformanceObserver((list, observer) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {console.log(entry.name + ": " + entry.duration)});
  observer.disconnect();
});


//RECORD RESULTS
performance.mark("Start");
//RUN
performance.mark("End");


//OUTPUT RESULTS
obs.observe({ entryTypes: ['measure'], buffered: true });
performance.measure("X", "Start", "End")