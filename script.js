// change timer mode
let modesID = ['study','lbreak','sbreak']
let mode = 'study'
function chmod(id){
    $('#counter').text(localStorage.getItem(id));
    mode = id
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
let stopPlayArr = ['play','restart']
let play = 0 
function playStop(){
    play = Math.abs(play-1);
    
}

// restart
function restart(){
    $("#counter").text("00:00")
}
// settings (change the timer start)
$(document).ready(
    function() {
        $('#counterRange').on('input', function() {
            let counterVal = `${$(this).val()}:00`
            $('#counter').text(counterVal);
            localStorage.setItem(mode,`${$(this).val()}:00`)
        });
    }
)