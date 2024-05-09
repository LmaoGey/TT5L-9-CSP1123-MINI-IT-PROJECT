const start = document.getElementById("startbutton") ;
const pause = document.getElementById("pausebutton") ;
const skip =  document.getElementById("skipbutton");
const timething = document.getElementById("timer");
const sound = document.getElementById("playsound")


let interval;
let timeleft = 600;


function updatetimer(){
let minutes =  Math.floor(timeleft / 60)     
let seconds = timeleft % 60
let formattedtime = minutes + ":" + seconds;


timething.innerHTML = formattedtime
}

function playsound(){
let audio = new Audio("GitExercise\Notifsound(demo).mp3")
;
audio.play() 

}

function starttimer() {
interval = setInterval(() => {
    timeleft--;
    updatetimer();
if (timeleft === 0 ) {
    clearInterval(interval);
    alert("time is up guy");
    timeleft = 600;
    
}
}, 1000)

}


function pausetimer(){
clearInterval(interval)

}
function skiptimer(){


}


sound.addEventListener("click" , playsound)
start.addEventListener("click" , starttimer)
pause.addEventListener("click" , pausetimer)
skip.addEventListener("click" , skiptimer)
