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
        
        if(num <= 40){
            ratio = 6.75;
        }
        
        if(num > 40 && num <= 60){
            ratio = 6.615;
        }
        
        if(num > 60 && num <= 80){
            ratio = 6.7;
        }
        
        if(num > 80 && num <= 100){
            ratio = 6.42;
        }
        
        if(num > 100 && num <= 120){
            ratio = 6.5;
        }
        
        if(num > 120 && num <= 140){
            ratio = 6.19;
        }

        if(num > 140 && num <= 160){
            ratio = 6.22;
        }

        if(num > 160 && num <= 180){
            ratio = 6.08;
        }
        if(num > 180){
            ratio = 6.185;
        }
            
    }

    console.log("num: "+num+" ratio: "+ratio);

    



    

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
    $(".bottom_indicator").removeClass("green");
    $(".top_indicator").removeClass("green");


    if( exact_value >= 0 && exact_value < 2.5){
        if( exact_value > 0.15 && exact_value < 2.5){
            $(".bottom_indicator").addClass("active");
        }
        if( exact_value > 0.05 && exact_value <= 0.15){
            $(".bottom_indicator").addClass("active");
            $(".bottom_indicator").addClass("green");
        }
    }

    if( exact_value < 0 && exact_value > -2.5){
        if( exact_value < -0.15 && exact_value > -2.5){
            $(".top_indicator").addClass("active");
        }
        if( exact_value < -0.05 && exact_value >= -0.15){
            $(".top_indicator").addClass("active");
            $(".top_indicator").addClass("green");
        }
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
