// taptic
//TapticEngine.unofficial.burst();
//TapticEngine.unofficial.weakBoom();
//TapticEngine.unofficial.strongBoom();

//TapticEngine.impact({
    //style: "heavy" // light | medium | heavy | rigid (iOS 13+) | soft (iOS 13+)
//});

var try_to_unlock = config.try_to_unlock;                  

function autoTare(val,delta){
    hideLoading();

    $(".autotare_arc").removeClass("active");

    if(!$('[name="checkbox"]').is(":checked"))
        return false;


    $(".autotare_arc").addClass("active");
    
    showLoading();

    disableTopAndButtonIndicators();


    if(stuckedAutoTare()){
        stopAutoTare();
        showPopup();
        return false;
    }

    if( baypass ){
        baypass = false;
        return false;
    }
        



    switch( true ) {

        // range_1
        case val <= 4 && val > 2.5:
            ranges.current_range = "range_1";
            ranges.range_1.push(val);
            if(delta < 0.5)
                quadrupleBurst();
            else
                tripleBurst();
        break;

        // range_2
        case val <= 2.5 && val > 1:
            ranges.current_range = "range_2";
            ranges.range_2.push(val);
            if(delta < 0.5)
                doubleBurst();
            else
                singleBurst();
        break;

        // range_3
        case val <= 1 && val >= 0.03:
            ranges.current_range = "range_3";
            ranges.range_3.push(val);
            if(delta < 0.03){
                singleStrongBoom();
            }
            else
                singleBoom();
        break;

        default:
            stopAutoTare();

    }

    
}

function stopAutoTare(){
    
    $('[name="checkbox"]').prop('checked', false);
    $(".autotare_arc").removeClass("active");
    hideLoading();
    clearRanges();
    try_to_unlock = config.try_to_unlock;
}

function showPopup(){
    $("body").addClass("show_popup");
    $("[data-role='close_popup']").unbind("click").bind("click",function(){
        $("body").removeClass("show_popup");
    })

}

// la differenza fra l'ultimo valore e la media dei precedenti 3 è < 0.03
function stuckedAutoTare(){

    var range = ranges[ranges.current_range] || [];
    
    if(range.length<5)
        return false;
    
    let last_value = range[range.length - 1];
    let avg = ( range[range.length - 2] + range[range.length - 3] + range[range.length - 4] ) / 3;
    
    /*
    $("#avg").html(avg);
    $("#last_value").html(last_value);
    $("#last_delta").html(avg-last_value);
    $("#lock_tentati").html(try_to_unlock);
    */

    if( (avg - last_value) < 0.03){
        if(try_to_unlock == 0){
            // sono finiti i tentativi di sbloccare il telefono
            return true;
        }else{
            try_to_unlock--;
            console.log("forzo lo sblocco");
            baypass = true; // bypasso lo switch di autoTare() in modo da evitare la prossima vibrazione e decidere qui quale fare
            // qui vado a fare una vibrazione "eccezionale" rispetto al range nel quale siamo
            // range_1: quadrupleBurst();
            // range_2: tripleBurst();
            // range_3: singleBurst();

            if(ranges.current_range == "range_1")
                quadrupleBurst();
            
            if(ranges.current_range == "range_2")
                tripleBurst();

            if(ranges.current_range == "range_3")
                singleBurst();
            


            console.log(ranges.current_range);
            ranges[ranges.current_range] = [];
            return false;
        }
    }
        
    return false;
    
}

function clearRanges(){
    ranges = { range_1 : [], range_2 : [], range_3 : [] };
}


/* VIBRATIONS */



/* derivate */

function singleBurst(){
    $("#autotare_last_vibration").html("singleBurst");
    burst();
}

function singleBoom(){
    $("#autotare_last_vibration").html("singleBoom");
    boom();
}

function singleStrongBoom(){
    $("#autotare_last_vibration").html("singleStrongBoom");
    strongBoom();
}

function doubleBurst(){
    $("#autotare_last_vibration").html("doubleBurst");
    burst();
    setTimeout(function(){
        burst();
    },300)
}

function tripleBurst(){
    $("#autotare_last_vibration").html("tripleBurst");
    burst();
    setTimeout(function(){
        burst();
    },300);
    setTimeout(function(){
        burst();
    },600)
}

function quadrupleBurst(){
    $("#autotare_last_vibration").html("quadruploBurst");
    burst();
    setTimeout(function(){
        burst();
    },300);
    setTimeout(function(){
        burst();
    },600)
    setTimeout(function(){
        burst();
    },900)
}


function quadrupleStrongBoom(){
    $("#autotare_last_vibration").html("quadrupleStrongBoom");
    strongBoom();
    setTimeout(function(){
        strongBoom();
    },100);
    setTimeout(function(){
        strongBoom();
    },200)
    setTimeout(function(){
        strongBoom();
    },300)

}



function mixedImpacts(){
    $("#autotare_last_vibration").html("mixedImpatcs");
    TapticEngine.impact({style: "heavy"});
    setTimeout(function(){
        TapticEngine.impact({style: "light"});
    },100);
    setTimeout(function(){
        TapticEngine.impact({style: "heavy"});
    },200)
    setTimeout(function(){
        TapticEngine.impact({style: "light"});
    },300)
}



/* native */
function vibrate(){
    flash();
    navigator.vibrate(3000);
}


function boom(){
    tinyFlash();
    if(window.TapticEngine)
        TapticEngine.unofficial.weakBoom();
}


function strongBoom(){
    littleFlash();
    if(window.TapticEngine)
        TapticEngine.unofficial.strongBoom();
}


function burst(){
    flash();
    if(window.TapticEngine)
        TapticEngine.unofficial.burst();
}






/* FLASHES  */
function flash(){
    
    $(".tachometer").addClass("flash");
    setTimeout(function(){
        $(".tachometer").removeClass("flash");
    },300)
}


function littleFlash(){
    
    $(".tachometer").addClass("littleFlash");
    setTimeout(function(){
        $(".tachometer").removeClass("littleFlash");
    },300)
}


function tinyFlash(){
    
    $(".tachometer").addClass("tinyFlash");
    setTimeout(function(){
        $(".tachometer").removeClass("tinyFlash");
    },300)
}