
/*

    -165 => 0 grammi
     165 => 33 grammi
 
*/

function rotate($line,val){

    var gain;

    // iphone 11
    if(device.model == "iPhone12,1"){

        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    
    }
    
    // iphone 6
    if(device.model == "iPhone7,2" || device.model == "iPhone8,1"){

        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    
    }

    
    
    
    
    
    var degrees = (val * gain) - 165;
    $line.css({'transform' : 'rotate('+ degrees +'deg)'});
}
