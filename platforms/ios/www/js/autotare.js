// taptic
//TapticEngine.unofficial.burst();
//TapticEngine.unofficial.weakBoom();
//TapticEngine.unofficial.strongBoom();

//TapticEngine.impact({
    //style: "heavy" // light | medium | heavy | rigid (iOS 13+) | soft (iOS 13+)
//});




function autoTare(val,val_delta){

    
    delta = val_delta || 100;
    tareProgressEnded();

    $(".autotare_arc").removeClass("active");

    if(!$('[name="checkbox"]').is(":checked"))
        return false;


    $(".autotare_arc").addClass("active");
    tareInProgressLoading();

    disableTopAndButtonIndicators();
    
    if(val <=4 && val > 0.5){
        if(delta < 0.05){
            tripleBurst();
        }else{
            doubleBurst();
        }
    }else{
        if(val <=0.5 && val >0.04){
            if(delta < 0.02){
                burst();
            }else{
                boom();
            }
        }
        else{
            if(val <=0.04 && val > -0.3){
                stopAutoTare();
            }
            
        }
    }
    
        
    
    
    
    

    

     

    
}

function stopAutoTare(){
    $('[name="checkbox"]').prop('checked', false);
    $(".autotare_arc").removeClass("active");
    tareProgressEnded();
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

function doubleBurst(){
    burst();
    setTimeout(function(){
        burst();
    },400)
}

function tripleBurst(){
    burst();
    setTimeout(function(){
        burst();
    },300);
    setTimeout(function(){
        burst();
    },600)
}




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