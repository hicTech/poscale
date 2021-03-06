
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
    var $group = $("#group");
    var $line = $(".line");

    startWatch();
    bindClick();
    setModel($model, $group);
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
/*

    DEVICES TABLE           pollici	dims	    res	        device.model

    -----------------------------group_a-----------------------------------                            
    iphone 11	            6.1	    75-150-8.3	414x896	    12,1
    iphone XR	            6.1	    75-150-8.3	414x896	    11,8
    iphone 11 Pro max	    6.5	    77-158-8.1	414x896	    12,5
    iphone XS max	        6.5	    77-157	    414x896	    11,4 - 11,6

    -----------------------------group_b-----------------------------------
    iphone 11 Pro	        5.8	    71-144-8.1	375x812	    12,3
    iphone X	            5.8	    71-143-7.7	375x812	    10,3 - 10,6
    iphone XS	            5.8	    71-143	    375x812	    11,2

    -----------------------------group_c-----------------------------------
    iphone 8	            4.7	    67-138-7.3	375x667	    10,1 - 10,4
    iphone 7	            4.7	    67-138	    375x667	    9,1 - 9,3

    -----------------------------group_d-----------------------------------
    iphone 8plus	        5.5	    78-158	    414x736	    10,2 - 10,5
    iphone 7 plus	        5.5	    78-158	    414x736	    9,2 - 9,4
    iphone 6s plus	        5.5	    78-158	    414x736	    8,2
    iphone 6s 	            4.7	    67-138	    414x736	    8,1

    in base al modello appioppo al body la class di appartenenza 
    "group_a","group_b","group_c","group_d" questa classe server 
    per customizzare l'UI dell'app e per selezionare il set di taratura
*/


function setModel($model,$group){

    var iphone = getPhoneInfo(device.model);
    $("body").addClass(iphone.group);
    $group.html(iphone.group);
    $model.html(iphone.name);

   
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


function getPhoneInfo(val) {

  switch( val ) {
  
            /* group_a */
            case "iPhone13,4":                              return { name:"iPhone 12 Pro Max", group: "group_a"}
            case "iPhone10,2", "iPhone10,5":                return { name:"iPhone 8 Plus", group: "group_a"}
            case "iPhone9,2", "iPhone9,4":                  return { name:"iPhone 7 Plus", group: "group_a"}
            case "iPhone8,2":                               return { name:"iPhone 6s Plus", group: "group_a"}
            case "iPhone7,1":                               return { name:"iPhone 6 Plus", group: "group_a"}
            case "iPhone12,5":                              return { name:"iPhone 11 Pro Max", group: "group_a"}
            case "iPhone11,4", "iPhone11,6":                return { name:"iPhone XS Max", group: "group_a"}

            /* group_b */
            case "iPhone11,8":                              return { name:"iPhone XR", group: "group_b"}
            case "iPhone12,1":                              return { name:"iPhone 11", group: "group_b"}

    		/* group_c */
            case "iPhone13,2":                              return { name:"iPhone 12", group: "group_c"}
            case "iPhone13,3":                              return { name:"iPhone 12 Pro", group: "group_c"}


            /* group_d */
            case "iPhone12,3":                              return { name:"iPhone 11 Pro", group: "group_d"}
            case "iPhone11,2":                              return { name:"iPhone XS", group: "group_d"}
            case "iPhone10,3", "iPhone10,6":                return { name:"iPhone X", group: "group_d"}

            /* group_e */
            case "iPhone12,8":                              return { name:"iPhone SE (2nd generation)", group: "group_e"}
            case "iPhone9,1", "iPhone9,3":                  return { name:"iPhone 7", group: "group_e"}
            case "iPhone10,1", "iPhone10,4":                return { name:"iPhone 8", group: "group_e"}
            case "iPhone7,2":                               return { name:"iPhone 6", group: "group_e"}
            case "iPhone8,1":                               return { name:"iPhone 6s", group: "group_e"}
            

            /* group_f */
            case "iPhone13,1":                              return { name:"iPhone 12 mini", group: "group_f"}


            /* group_g */
            case "iPhone5,1", "iPhone5,2":                  return { name:"iPhone 5", group: "group_g"}
            case "iPhone5,3", "iPhone5,4":                  return { name:"iPhone 5c", group: "group_g"}
            case "iPhone6,1", "iPhone6,2":                  return { name:"iPhone 5s", group: "group_g"}            
            case "iPhone8,4":                               return { name:"iPhone SE", group: "group_g"}




            /*
            case "iPhone3,1", "iPhone3,2", "iPhone3,3":     return { name:"iPhone 4", group: "group_a"}
            case "iPhone4,1":                               return { name:"iPhone 4s", group: "group_a"}


            case "iPad2,1", "iPad2,2", "iPad2,3", "iPad2,4":return { name:"iPad 2", group: "group_a"}
            case "iPad3,1", "iPad3,2", "iPad3,3":           return { name:"iPad (3rd generation)", group: "group_a"}
            case "iPad3,4", "iPad3,5", "iPad3,6":           return { name:"iPad (4th generation)", group: "group_a"}
            case "iPad6,11", "iPad6,12":                    return { name:"iPad (5th generation)", group: "group_a"}
            case "iPad7,5", "iPad7,6":                      return { name:"iPad (6th generation)", group: "group_a"}
            case "iPad7,11", "iPad7,12":                    return { name:"iPad (7th generation)", group: "group_a"}
            case "iPad11,6", "iPad11,7":                    return { name:"iPad (8th generation)", group: "group_a"}
            case "iPad4,1", "iPad4,2", "iPad4,3":           return { name:"iPad Air", group: "group_a"}
            case "iPad5,3", "iPad5,4":                      return { name:"iPad Air 2", group: "group_a"}
            case "iPad11,3", "iPad11,4":                    return { name:"iPad Air (3rd generation)", group: "group_a"}
            case "iPad13,1", "iPad13,2":                    return { name:"iPad Air (4th generation)", group: "group_a"}
            case "iPad2,5", "iPad2,6", "iPad2,7":           return { name:"iPad mini", group: "group_a"}
            case "iPad4,4", "iPad4,5", "iPad4,6":           return { name:"iPad mini 2", group: "group_a"}
            case "iPad4,7", "iPad4,8", "iPad4,9":           return { name:"iPad mini 3", group: "group_a"}
            case "iPad5,1", "iPad5,2":                      return { name:"iPad mini 4", group: "group_a"}
            case "iPad11,1", "iPad11,2":                    return { name:"iPad mini (5th generation)", group: "group_a"}
            case "iPad6,3", "iPad6,4":                      return { name:"iPad Pro (9.7-inch)", group: "group_a"}
            case "iPad7,3", "iPad7,4":                      return { name:"iPad Pro (10.5-inch)", group: "group_a"}
            case "iPad8,1", "iPad8,2", "iPad8,3", "iPad8,4":return { name:"iPad Pro (11-inch) (1st generation)", group: "group_a"}
            case "iPad8,9", "iPad8,10":                     return { name:"iPad Pro (11-inch) (2nd generation)", group: "group_a"}
            case "iPad6,7", "iPad6,8":                      return { name:"iPad Pro (12.9-inch) (1st generation)", group: "group_a"}
            case "iPad7,1", "iPad7,2":                      return { name:"iPad Pro (12.9-inch) (2nd generation)", group: "group_a"}
            case "iPad8,5", "iPad8,6", "iPad8,7", "iPad8,8":return { name:"iPad Pro (12.9-inch) (3rd generation)", group: "group_a"}
            case "iPad8,11", "iPad8,12":                    return { name:"iPad Pro (12.9-inch) (4th generation)", group: "group_a"}
            */
   
  }

}

console.log(theTest("iPhone10,5"));
  