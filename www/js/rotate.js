/*
    -165 => 0 grammi
     165 => 33 grammi
*/

function rotate($line,val){

    var current_group = $("body").attr("class");
    var num = val * 100;
    var ratio = 6.5901;



    


    // group_b
    // 11, XR
    if(current_group == "group_b"){
        console.log("we:"+num);
        if(num < 65)
            ratio = 6.16;
        else
            ratio = 6.1;
    }



    

    var deg_decrement = (num / ratio ) * 10; // ogni tacca da un grammo equivale a 10° in meno
    var degrees = deg_decrement - 165;
    var exact_value = (deg_decrement/10).toFixed(2)

    // ruoto la lancetta
    $line.css({'transform' : 'rotate('+ degrees +'deg)'});
    // ruoto il div del peso esatto
    $("#exact_value").css({'transform' : 'rotate('+ degrees * (-1) +'deg)'});
    $("#exact_value").html( exact_value );
    
    

    $(".bottom_indicator").removeClass("active");
    $(".top_indicator").removeClass("active");


    if( exact_value > 0.15 && exact_value < 2.5){
        $(".bottom_indicator").addClass("active")
    }

    if( exact_value < -0.15 && exact_value > -2.5){
        $(".top_indicator").addClass("active")
    }

    if(exact_value >= -0.15 && exact_value <= 0.15){
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
