/*
    -165 => 0 grammi
     165 => 33 grammi
*/

function rotate($line,val){

    var gain;
    var current_group = $("body").attr("class");

    
    // group_a
    // iphone 11, XR, 11 pro max, XS max
    if(current_group == "group_a"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }



    // group_b
    // iphone 11 pro, X, XS
    if(current_group == "group_b"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }



    // group_c
    // iphone 8, 7
    if(current_group == "group_c"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }



    // group_d
    // iphone 8 plus, 7 plus, 6s plus, 6s
    if(current_group == "group_d"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }


    

    
    
    
    
    
    var degrees = (val * gain) - 165;
    $line.css({'transform' : 'rotate('+ degrees +'deg)'});
}
