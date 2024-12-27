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
let stopSec = false ;
let counting
function playStop(){
    // Play or Stop
    play = Math.abs(play-1);
    $("#ps").attr('src',`images/${stopPlayArr[play]}.png`)
    $("#counterRange").css("opacity",`${play}`)
    $("#counterRange").attr('disabled',!play)
    if(play==0){
        let minSec = $("#counter").text().split(":")
        let duration = Number(minSec[0])*60 + Number(minSec[1])
        console.log(duration)
        counting = setInterval(() => {
            let minutes = Math.floor(duration/60)
            let seconds = duration%60

           let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            $('#counter').text(formattedTime);

            if(duration===0){
                clearInterval(counting)
            }
            else{
                duration--
            }
        },100);
    }
    else{
        clearInterval(counting)
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