

function rotate($line,val){

    var current_group = $("body").attr("class");
    var num = val * 100;
    var ratio = 6.5901;

    

    


    // group_b
    // 11, XR
    if(current_group == "group_b"){
        config.y_initial = 1.15;
        if(num <= 40){
            ratio = 6.75;
        }
        
        if(num > 40 && num <= 60){
            ratio = 6.6;
        }
        
        if(num > 60 && num <= 80){
            ratio = 6.65;
        }
        
        if(num > 80 && num <= 100){
            ratio = 6.7;
        }
        
        if(num > 100 && num <= 120){
            ratio = 6.5;
        }
        
        if(num > 120 && num <= 140){
            ratio = 6.6;
        }

        if(num > 140 && num <= 160){
            ratio = 6.1;
        }

        if(num > 160 && num <= 180){
            ratio = 6.08;
        }
        if(num > 180){
            ratio = 6.185;
        }
            
    }
    else{
        // group_d
        // 11 pro, X, XS
        if(current_group == "group_d"){
            config.y_initial = 0.7;

            if(num <= 35){
                ratio = 6.7;
            }
            
            if(num > 35 && num <= 60){
                ratio = 7.15;
            }
            
            if(num > 60 && num <= 80){
                ratio = 7.3;
            }
            
            if(num > 80 && num <= 100){
                ratio = 7.27;
            }
            
            if(num > 100 && num <= 120){
                ratio = 6.87;
            }
            
            if(num > 120 && num <= 140){
                ratio = 6.69;
            }
    
            if(num > 140 && num <= 160){
                ratio = 6.66;
            }
    
            if(num > 160 && num <= 180){
                ratio = 6.7;
            }
            if(num > 180){
                ratio = 6.65;
            }
        }
        else{
            // group_a
            // XS Max, 11 Pro Max,...
            if(current_group == "group_a"){
                config.y_initial = 1;

                if(num <= 40){
                    ratio = 6.5901;
                }
                
                if(num > 40 && num <= 60){
                    ratio = 6.85;
                }
                
                if(num > 60 && num <= 80){
                    ratio = 6.75;
                }
                
                if(num > 80 && num <= 100){
                    ratio = 6.78;
                }
                
                if(num > 100 && num <= 120){
                    ratio = 6.75;
                }
                
                if(num > 120 && num <= 140){
                    ratio = 6.69;
                }
        
                if(num > 140 && num <= 160){
                    ratio = 6.66;
                }
        
                if(num > 160 && num <= 180){
                    ratio = 6.4;
                }
                if(num > 180){
                    ratio = 6.4;
                }
            }
        }  
    }


    console.log("num: "+num+" ratio: "+ratio);

    



    

    var deg_decrement = (num / ratio ) * 10; // ogni tacca da un grammo equivale a 10° in meno
    var degrees = deg_decrement - start_line;
    var exact_value = (deg_decrement/10).toFixed(2);

    

    // ruoto la lancetta
    $line.css({'transform' : 'rotate('+ degrees +'deg)'});
    // ruoto il div del peso esatto
    $("#exact_value").css({'transform' : 'rotate('+ degrees * (-1) +'deg)'});
    $("#exact_value").html( exact_value );
    
    

    disableTopAndButtonIndicators();


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

    

    tare_values.push(parseFloat(exact_value));
    tare_values = tare_values.slice(-8);

    
    
    var delta = (tare_values.length>1)? tare_values[tare_values.length-2] - tare_values[tare_values.length-1] : 100 // differenza fra gli ultimi due valori di tare_values
    
    // se serve per dubug
    //$("#autotare_arr_target").html(tare_values.toString());
    // $("#autotare_delta").html(delta.toString());
    

    autoTare(parseFloat(exact_value), delta);

    

    if(exact_value<=4 && exact_value>=0){
        activateAutoTareArc();
        enableToggleAutoTare();
    }
    else{
        disableToggleAutoTare();
        disactivateAutoTareArc();
        stopAutoTare();
    }



    


    if(exact_value <= 0.04 && exact_value > -0.3 ){
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




function enableToggleAutoTare(){
    $(".Toggle-input.auto_tare").addClass("active");
    $(".Toggle-input.auto_tare input").prop("disabled", false);
}

function disableToggleAutoTare(){
    $(".Toggle-input.auto_tare").removeClass("active");
    $(".Toggle-input.auto_tare input").prop("disabled", true);
}

function activateAutoTareArc(){
    $(".autotare_arc").addClass("available");
}

function disactivateAutoTareArc(){
    $(".autotare_arc").removeClass("available");
}


function disableTopAndButtonIndicators(){
    $(".bottom_indicator").removeClass("active");
    $(".top_indicator").removeClass("active");
    $(".bottom_indicator").removeClass("green");
    $(".top_indicator").removeClass("green");
}

function showLoading(){
    $(".place_container").hide();
    $(".loading_container").show();
}

function hideLoading(){
    $(".place_container").show();
    $(".loading_container").hide();
}


