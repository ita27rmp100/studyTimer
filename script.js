// function to avoid empty localStorage's problem
let modeInitial = {study:"60:00",lbreak:"10:00",sbreak:"05:00"}
function LSgetItem(id){
    if(localStorage.getItem(id)==null){
        $("#counter").text(modeInitial[id])
        localStorage.setItem(id,modeInitial[id])
    }
    else{
        $('#counter').text(localStorage.getItem(id));
    }
}
// change timer mode
let modesID = ['study','lbreak','sbreak']
let mode = 'study'
function chmod(id){
    LSgetItem(id)
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
let counting
function playStop(){
    // local function
    let swap = () => {play = Math.abs(play-1);
                        $("#ps").attr('src',`images/${stopPlayArr[play]}.png`)
                        $("#counterRange").css("opacity",`${play}`)
                        $("#counterRange").attr('disabled',!play)
                    }
    // Play or Stop
    swap()
    if(play==0){
        let minSec = $("#counter").text().split(":")
        let duration = Number(minSec[0])*60 + Number(minSec[1])
        counting = setInterval(() => {
            let minutes = Math.floor(duration/60)
            let seconds = duration%60
            $('#counter').text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            duration--
        },999);
        setTimeout(() => {
            clearInterval(counting)
            swap()
            document.getElementById("alarm").play()
        },(duration+1)*999.999);
    }
    else{
        clearInterval(counting)
    }
}
// restart
function restart(){
    $("#counter").text(localStorage.getItem(mode))
    playStop()
}
// settings (change the timer start)
$(document).ready(
    function() {
        LSgetItem("study")
        $("label").addClass("btn p-3 active")
        $('#counterRange').on('input', function() {
            let counterVal = `${$(this).val()}:00`
            $('#counter').text(counterVal);
            localStorage.setItem(mode,`${$(this).val()}:00`)
        });
    }
)