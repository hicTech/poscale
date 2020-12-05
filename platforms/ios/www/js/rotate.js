/*
    -165 => 0 grammi
     165 => 33 grammi
*/

function rotate($line,val){

    var current_group = $("body").attr("class");
    var num = val * 100;
    var ratio = 6.5901;

    
    // group_a
    // iphone 11, XR, 11 pro max, XS max
    if(current_group == "group_a"){
        // il rapporto num/grammi è 6,5901 calcolato come rapporto medio ottenuto dalla taratura
        // ho individuato questi due scaloni che rettificano ulteriormente il rapporto
        if(num <= 85)
            ratio = 6.65;
        if(num > 85)
            ratio = 6.85;
              
    }


    // group_b
    // iphone 11 pro, X, XS
    if(current_group == "group_b"){
        
    }


    // group_c
    // iphone 8, 7
    if(current_group == "group_c"){
        
    }


    // group_d
    // iphone 8 plus, 7 plus, 6s plus, 6s
    if(current_group == "group_d"){
        
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
