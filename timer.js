const start = document.getElementById("startbutton") ;
const pause = document.getElementById("pausebutton") ;
const skip =  document.getElementById("skipbutton");
const timething = document.getElementById("timer");
const focust = document.getElementById("focust")
const breakt = document.getElementById("breakt")



let interval;
let timeleft = 600;


function updatetimer(){
let minutes =  Math.floor(timeleft / 60)     
let seconds = timeleft % 60
let formattedtime = minutes + ":" + seconds;


timething.innerHTML = formattedtime
}

function updatebreaktimer(){

    timeleft = 300
    let minutes =  Math.floor(timeleft / 60)     
    let seconds = timeleft % 60
    let formattedtime = minutes + ":" + seconds;
    
    
    timething.innerHTML = formattedtime
    }
    



function starttimer() {
interval = setInterval(() => {
    timeleft--;
    updatetimer();
if (timeleft === 0 ) {
    clearInterval(interval);
    alert("time is up guy");
    breaktime();
    
}
}, 1000)

}


function pausetimer(){
clearInterval(interval)

}
function skiptimer(){


}

function breaktimer(){
    interval = setInterval(() => {
        timeleft--;
        updatebreaktimer();
    if (timeleft === 0 ) {
        clearInterval(interval);
        alert("time is up guy");
        starttimer();
        
    }
    }, 1000)
    
    }
    

function breaktime(){
    clearInterval(interval);
    document.getElementById("timer").innerHTML ="5:00";
    breaktimer();




}


function focustime()
{
    clearInterval(interval)
document.getElementById("timer").innerHTML = "10:00";
starttimer();





}



start.addEventListener("click" , starttimer)
pause.addEventListener("click" , pausetimer)
skip.addEventListener("click" , skiptimer)
breakt.addEventListener("click" , breaktimer)
focust.addEventListener("click" , focustime)