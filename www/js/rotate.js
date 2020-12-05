/*
    -165 => 0 grammi
     165 => 33 grammi
*/

function rotate($line,val){

    var gain;
    var current_group = $("body").attr("class");

    
    // group_a
    // 12 Pro Max, 8 Plus, 7 Plus, 6s Plus, 6 Plus, 11 Pro Max, XS Max
    if(current_group == "group_a"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }



    // group_b
    // 11, XR
    if(current_group == "group_b"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }



    // group_c
    // 12, 12 Pro
    if(current_group == "group_c"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }



    // group_d
    // 11 Pro, XS, X
    if(current_group == "group_d"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }


    // group_e
    // SE 2nd generation, 6, 7, 8, 6s
    if(current_group == "group_d"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }

    // group_f
    // 12 mini
    if(current_group == "group_d"){
        var num = val * 100;
        if(num < 50)
            gain = 145;
        else
            gain = 133
    }

    // group_g
    // 5, 5c, 5s, SE
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
