/*
    -165 => 0 grammi
     165 => 33 grammi
*/

function rotate($line,val){

    var current_group = $("body").attr("class");
    var num = val * 100;
    var ratio = 6.5901;

    
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
        console.log("we:"+num);
        if(num < 50)
            gain = 145;
        else
            gain = 13
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


    

    var deg_decrement = (num / ratio ) * 10; // ogni tacca da un grammo equivale a 10° in meno
    var degrees = deg_decrement - 165;
    var exact_value = (deg_decrement/10).toFixed(2)

    // ruoto la lancetta
    $line.css({'transform' : 'rotate('+ degrees +'deg)'});
    // ruoto il div del peso esatto
    $("#exact_value").css({'transform' : 'rotate('+ degrees * (-1) +'deg)'});
    $("#exact_value").html( exact_value );
    
    

    if(exact_value > -0.15 && exact_value < 0.15){
        $(".exact_value").addClass("in_bolla");
        $(".place_container").addClass("active");
    }
    else{
        $(".exact_value").removeClass("in_bolla");
        $(".place_container").removeClass("active");
    }


    // solo di visualizzazione per sviluppare
    $("#y").html(num);
    $("#deg").html(deg_decrement);
    


    
    
    
    
}
