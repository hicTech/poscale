// taptic
//TapticEngine.unofficial.burst();
//TapticEngine.unofficial.weakBoom();
//TapticEngine.unofficial.strongBoom();

//TapticEngine.impact({
    //style: "heavy" // light | medium | heavy | rigid (iOS 13+) | soft (iOS 13+)
//});


function autoTare(val){
    if(val >1 && val <=3){
        doubleBurst();
    }
    
    
    //if(val >1 && val <=2){
        //burst();
    //}
    
    if(val >0.09 && val <=1){
        strongBoom();
    }

    if(val >0.02 && val <=0.09){
        boom();
    }

    

     

    
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




function flash(){
    $(".tachometer").addClass("flash");
    setTimeout(function(){
        $(".tachometer").removeClass("flash");
    },360)
}


function littleFlash(){
    $(".tachometer").addClass("littleFlash");
    setTimeout(function(){
        $(".tachometer").removeClass("littleFlash");
    },360)
}


function tinyFlash(){
    $(".tachometer").addClass("tinyFlash");
    setTimeout(function(){
        $(".tachometer").removeClass("tinyFlash");
    },360)
}