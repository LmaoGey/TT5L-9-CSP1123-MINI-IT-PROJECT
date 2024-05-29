var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');
var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');
var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');
var counter = document.getElementById('counter');
var startTimer;

// reader stuff
function backgroundsetter(){
let selectcolour = document.querySelectorAll('.colour');

let storedColour = localStorage.getItem('colour');
if (storedColour) {
    document.querySelector(':root').style.setProperty('background-image', storedColour);
};}

//timer
let workMinutes = 0;
let breakMinutes = 0;
let workseconds = 2;
let breakseconds = 2;

function initializeTimer() {
    wm.innerText = workMinutes < 10 ? '0' + workMinutes : workMinutes;
    ws.innerText = workseconds < 10 ? '0' + workseconds : workseconds;
    bm.innerText = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
    bs.innerText = breakseconds < 10 ? '0' + breakseconds : breakseconds;
    counter.innerText = 0;
}

start.addEventListener('click', startTimerFunction);
reset.addEventListener('click', resetTimer);
stop.addEventListener('click', stopTimer);

function startTimerFunction() {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } else {
        alert("Timer is already running");
    }
}

function resetTimer() {
    wm.innerText = workMinutes < 10 ? '0' + workMinutes : workMinutes;
    ws.innerText = workseconds < 10 ? '0' + workseconds : workseconds;
    bm.innerText = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
    bs.innerText = breakseconds < 10 ? '0' + breakseconds : breakseconds;
    counter.innerText = 0;
    stopInterval();
    startTimer = undefined;
}

function stopTimer() {
    stopInterval();
    startTimer = undefined;
}

function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

function timer() {
    if (ws.innerText != 0) {
        ws.innerText = formatTime(parseInt(ws.innerText) - 1);
    } else if (wm.innerText != 0 && ws.innerText == 0) {
        ws.innerText = 59;
        wm.innerText = formatTime(parseInt(wm.innerText) - 1);
    }

    if (wm.innerText == 0 && ws.innerText == 0) {
        if (bs.innerText != 0) {
            bs.innerText = formatTime(parseInt(bs.innerText) - 1);
        } else if (bm.innerText != 0 && bs.innerText == 0) {
            bs.innerText = 59;
            bm.innerText = formatTime(parseInt(bm.innerText) - 1);
        }
    }

    if (wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
        wm.innerText = formatTime(workMinutes);
        ws.innerText = formatTime(workseconds);
        bm.innerText = formatTime(breakMinutes);
        bs.innerText = formatTime(breakseconds);
        counter.innerText = parseInt(counter.innerText) + 1;

        if (parseInt(counter.innerText) % 2 === 0) {
            gainExperience(20);
        }
    }
}

function stopInterval() {
    clearInterval(startTimer);
    startTimer = undefined;
}


//levelbar
let level = 1;
let xp = 0;
let xpMax = 100;

function saveProgress() {
    localStorage.setItem('level', level);
    localStorage.setItem('xp', xp);
    localStorage.setItem('xpMax', xpMax);
}

function loadProgress() {
    const savedLevel = localStorage.getItem('level');
    const savedXp = localStorage.getItem('xp');
    const savedXpMax = localStorage.getItem('xpMax');

    if (savedLevel !== null) level = parseInt(savedLevel);
    if (savedXp !== null) xp = parseInt(savedXp);
    if (savedXpMax !== null) xpMax = parseInt(savedXpMax);

    document.getElementById('level').textContent = level;
    document.getElementById('xp').textContent = xp;
    document.getElementById('xpMax').textContent = xpMax;

    updateLevelBar();
}

function gainExperience(points) {
    xp += points;
    if (xp >= xpMax) {
        xp -= xpMax;
        level++;
        xpMax = Math.floor(xpMax);
        document.getElementById('level').textContent = level;
        document.getElementById('xpMax').textContent = xpMax;
    }
    updateLevelBar();
    saveProgress();
}

function updateLevelBar() {
    const levelBar = document.getElementById('levelBar');
    const xpPercentage = (xp / xpMax) * 100;
    levelBar.style.width = xpPercentage + '%';
    document.getElementById('xp').textContent = xp;
}

window.onload = function() {
    loadProgress();
    initializeTimer();
    backgroundsetter();
};