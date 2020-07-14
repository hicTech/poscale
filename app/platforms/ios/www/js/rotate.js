
/*

    -165 => 0 grammi
     165 => 33 grammi
 
*/

function rotate($line,val){
    var gain;
    
    if(val >-2 && val < 20)
        gain = 10.33;
    
    if(val >=20 && val < 25)
        gain = 10.5;
    
    if(val >= 25 && val < 30)
        gain = 10.7;
    
    
    var degrees = (val * gain) - 165;
    $line.css({'transform' : 'rotate('+ degrees +'deg)'});
}
