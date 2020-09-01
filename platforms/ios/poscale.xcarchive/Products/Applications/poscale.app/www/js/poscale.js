
var watchID = null;
var x_values = [];
var y_values = [];

var config = {
    frequency: 1,                       // frequenza con cui memorizzo valori nel registro
    delta_frequency_upadete: 250,       // frequenza di aggiornamento dell'indicatore di bolla
    x_delta_gain: 5,                   // fattore moltiplicativo dello spostamento orizzontale dell'indicatore di bolla
    y_delta_gain: 25,                   // fattore moltiplicativo dello spostamento verticale dell'indicatore di bolla
    y_initial: 0.8,                       // scostamento iniziale rispetto all'orrizzontale
    
    measure_frequency:1200,             // ogni quanto viene fatta la media sui valori e dato il peso
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var $delta_indicator = $(".delta_indicator");
    var $x = $("#x");
    var $y = $("#y");
    var $model = $("#model");
    var $line = $(".line");

    startWatch();
    bindClick();
    showModel($model);
    disallowOverscroll();

    StatusBar.hide();
    
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
        
        //con questo metto la lancetta a zero considerando y_initial
        y_avg = y_avg + config.y_initial + 0.08; // questo 0.08 è per azzerare una leggere discrepanza per cui quando la bolla è perfettamente centrata l'indicatore arancione sul perimetro non è perfettammente al centro della tacca dello zero

        $y.html(y_avg);
        y_values = [];
        
        rotate($line,y_avg);
        
    },config.measure_frequency)
   
}



function startWatch() {
    var options = { frequency: config.frequency };
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
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

function bindClick(){
    $(".unity").click(function(){
        $(this).find(".single_option").toggleClass("active");

        if( ! $(this).find(".active").is(".g") )
            $(".tachometer").removeClass("gr").addClass("oz");
        else
            $(".tachometer").removeClass("oz").addClass("gr");
    })

    $(".bottle").click(function(){
        $(this).find(".single_option").toggleClass("active");

        if( $(this).find(".active").is(".w") )
            console.log("setto vino");//$(".tachometer").removeClass("gr").addClass("oz");
        else
            console.log("setto birro");//$(".tachometer").removeClass("oz").addClass("gr");
    })

}

function showModel($elem){

    
    if(device.model == "iPhone7,2"){
        $elem.html("6");
        $(".container").addClass("small_iphone");
    }

    if(device.model == "iPhone8,1"){
        $elem.html("6S");
        $(".container").addClass("small_iphone");
    }

    if(device.model == "iPhone9,1" || device.model == "iPhone9,3"){
        $elem.html("7");
        $(".container").addClass("small_iphone");
    }

    if(device.model == "iPhone9,2" || device.model == "iPhone9,4"){
        $elem.html("7 plus");
    }

    if(device.model == "iPhone10,4" || device.model == "iPhone10,1"){
        $elem.html("8");
        $(".container").addClass("small_iphone");
    }

    if(device.model == "iPhone10,5" || device.model == "iPhone10,2"){
        $elem.html("8 plus");
    }

    if(device.model == "iPhone10,3" || device.model == "iPhone10,6"){
        $elem.html("X");
    }
    

    if(device.model == "iPhone11,2"){
        $elem.html("XS");
    }

    if(device.model == "iPhone11,6"){
        $elem.html("XS max");
    }

    if(device.model == "iPhone11,8"){
        $elem.html("XR");
    }

    if(device.model == "iPhone12,1"){
        $elem.html("11");
    }

    if(device.model == "iPhone12,3"){
        $elem.html("11 pro");
    }

    if(device.model == "iPhone12,5"){
        $elem.html("11 pro max");
    }

    if(device.model == "iPhone12,8"){
        $elem.html("SE");
    }
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


function disallowOverscroll(){
    $(document).on('touchmove',function(e){
      e.preventDefault();
    });
    $('body').on('touchstart','.scrollable',function(e) {
      if (e.currentTarget.scrollTop === 0) {
        e.currentTarget.scrollTop = 1;
      } else if (e.currentTarget.scrollHeight
                === e.currentTarget.scrollTop
                    + e.currentTarget.offsetHeight) {
        e.currentTarget.scrollTop -= 1;
      }
    });
    $('body').on('touchmove','.scrollable',function(e) {
      e.stopPropagation();
    });
  }
  