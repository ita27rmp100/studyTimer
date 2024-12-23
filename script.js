// change timer mode
let modesID = ['study','lbreak','sbreak']
let mode = 'study'
function chmod(id){
    $('#counter').text(localStorage.getItem(id));
    mode = id
    play = 0
    playStop()
    for(i=0;i<modesID.length;i++){
        if(id==modesID[i]){
            $(`#${id}`).addClass('btn-outline-dark')
            $(`#${id}`).removeClass('btn-dark')
        }
        else{
            $(`#${modesID[i]}`).addClass('btn-dark')
            $(`#${modesID[i]}`).removeClass('btn-outline-dark')
        }
    }
    
}
// stop / play the counter
let stopPlayArr = ['play','stop']
let play = 1
let secCount , minCount
function playStop(){
    play = Math.abs(play-1);
    $("#ps").attr('src',`images/${stopPlayArr[play]}.png`)
    $("#counterRange").css("opacity",`${play}`)
    $("#counterRange").attr('disabled',!play)
    if(play==0){
        let second =  $("#counter").text().slice($("#counter").text().indexOf(':')+1)
        if(second == '00'){
            $("#counter").text($("#counter").text().replace($("#counter").text().slice($("#counter").text().indexOf(':')+1),'59'))
        }
        secCount = setInterval(() => {
            let sec = $("#counter").text().slice($("#counter").text().indexOf(':')+1)
            $("#counter").text($("#counter").text().replace(
                $("#counter").text().slice($("#counter").text().indexOf(':')+1),
                sec-1+0*100
            ))
            sec--
            if(sec==0){
                if(minute==0){
                    clearInterval(secCount)
                }
                else{
                    second=59
                    minute--
                }
            }
        },1000);
        // minute down-counter
        let minute = $("#counter").text().slice(0,$("#counter").text().indexOf(':'))
        if(minute>0 && second=="00"){
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
        },61000);
    }
    else{
        clearInterval(secCount)
        clearInterval(minCount)
    }
}

// restart
function restart(){
    $("#counter").text("00:00")
}
// settings (change the timer start)

$(document).ready(
    function() {
        $("#counter").text(localStorage.getItem('study'))
        $('#counterRange').on('input', function() {
            let counterVal = `${$(this).val()}:00`
            $('#counter').text(counterVal);
            localStorage.setItem(mode,`${$(this).val()}:00`)
        });
    }
)