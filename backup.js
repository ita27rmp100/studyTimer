function playStop(){
    play = Math.abs(play-1);
    $("#ps").attr('src',`images/${stopPlayArr[play]}.png`)
    $("#counterRange").css("opacity",`${play}`)
    $("#counterRange").attr('disabled',!play)
    if(play==0){
        let second =  $("#counter").text().slice($("#counter").text().indexOf(':')+1)
        secCount = setInterval(() => {
            if(second==0){
                $("#counter").text($("#counter").text().replace($("#counter").text().slice($("#counter").text().indexOf(':')+1),'59'))
                second=58
                minute--
            }
            else{
                $("#counter").text($("#counter").text().replace(
                    $("#counter").text().slice($("#counter").text().indexOf(':')+1),
                    second
                ))
                second--
            }
        },1000);
        // minute down-counter
        let minute = $("#counter").text().slice(0,$("#counter").text().indexOf(':'))
        if(minute>0 && second==0){
            $("#counter").text($("#counter").text().replace(minute,minute-1))
        }
        minCount = setInterval(() => {
            if(minute==0){
                clearInterval(minCount)
            }
            else{
                $("#counter").text($("#counter").text().replace(minute,minute-1))
                minute--
            }
        },60000);
        setTimeout(() => {
            clearInterval(secCount)
        },minute*60000+second*1000);
    }
    else{
        clearInterval(secCount)
        clearInterval(minCount)
    }
}