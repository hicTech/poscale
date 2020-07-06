var watchID = null;
var x_values = [];
var y_values = [];

var config = {
    frequency: 1,                       // frequenza con cui memorizzo valori nel registro
    delta_frequency_upadete: 250,       // frequenza di aggiornamento dell'indicatore di bolla
    x_delta_gain: 5,                   // fattore moltiplicativo dello spostamento orizzontale dell'indicatore di bolla
    y_delta_gain: 25,                   // fattore moltiplicativo dello spostamento verticale dell'indicatore di bolla
    y_initial: 1.66,                       // scostamento iniziale rispetto all'orrizzontale
    
    measure_frequency:1200,             // ogni quanto viene fatta la media sui valori e dato il peso
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    var $delta_indicator = $(".delta_indicator");
    var $x = $("#x");
    var $y = $("#y");
    var $line = $(".line")

    startWatch();
    
    /* bolla */
    setInterval(function(){
        var x_delta = x_values[0] * config.x_delta_gain +"px"
        $delta_indicator.css("margin-left",x_delta)
        
        var y_delta = y_values[0]* config.y_delta_gain;
            y_delta = y_delta + (config.y_delta_gain * config.y_initial);
            y_delta = y_delta +"px";
        //console.log(y_delta)
        $delta_indicator.css("margin-top",y_delta)
        
    },config.delta_frequency_upadete)
    
    
    /* calcolo media degli assi x e y */
    setInterval(function(){
        var x_avg = average(x_values);
        x_values = [];
        
        var y_avg = average(y_values);
        
        y_avg = (y_avg + 2) * 10 - 3.74;
        
        $y.html(y_avg);
        y_values = [];
        
        rotate($line,y_avg);
        
    },config.measure_frequency)
   
}



function startWatch() {
    var options = { frequency: config.frequency };
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

function onSuccess(acceleration) {
    addValues(acceleration.x, acceleration.y)
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}



function addValues(x,y){
    x_values.unshift((x*1));
    y_values.unshift((y*1));
}



/* ========================================= utility functions */


function average(arr) {
  // returns the average of all values in the array
  return sum(arr) / arr.length;
}



function sum(arr) {
  // returns the sum total of all values in the array
  return _.reduce(arr, function(memo, num) { return memo + num}, 0);
}
