// change timer mode
let modesID = ['study','lbreak','sbreak']
function chmod(id){
    for(i=0;i<modesID.length;i++){
        if(id==modesID[i]){
            $(`#${id}`).addClass('btn-light')
            $(`#${id}`).removeClass('btn-dark')
        }
        else{
            $(`#${modesID[i]}`).addClass('btn-dark')
            $(`#${modesID[i]}`).removeClass('btn-light')
        }
    }
    
}