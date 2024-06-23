var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');
var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');
var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');
var counter = document.getElementById('counter');
var toggleMode = document.getElementById('toggle-mode');

var cyclesCountUp = true; 
var initialCycles = 0;
var startTimer;

// reader stuff
function backgroundsetter(){

let storedColour = localStorage.getItem('colour');
if (storedColour) {
    document.querySelector(':root').style.setProperty('background-image', storedColour);
};}

    function profilesetter() {
        const storedPhoto = localStorage.getItem('userPhoto');
        if (storedPhoto) {
            const userphoto = document.getElementById('userPhoto');
            userphoto.setAttribute('src', storedPhoto);
        }
    }
    // for the alarm
    var videoID = localStorage.getItem("selectedAudioEffect");
    
    function onYouTubeIframeAPIReady() {
        initAlarmPlayer();
        }
    var alarmplayer;

    function initAlarmPlayer() {
        alarmplayer = new YT.Player('alarm-player', {
            height: '0',
            width: '0',
            videoID: '', 
            events: {
                'onReady': onAlarmPlayerReady,
                'onStateChange': onAlarmPlayerStateChange
            }
        });
    }
    
    function onAlarmPlayerReady(event) {
        var alarmVolume = localStorage.getItem('alarmVolume') || 100;
        alarmplayer.setVolume(alarmVolume);
        
    }
    
    
    function onAlarmPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        alarmplayer.playVideo();  
    }
}
function playMusic(videoID) {
    if (musicplayer && musicplayer.hasOwnProperty('loadVideoById')) {
        musicplayer.loadVideoById(videoID);
        musicplayer.playVideo();
        localStorage.setItem('selectedMusic', videoID);

    }
}

    

//timer
let workMinutes = 25;
let breakMinutes = 5;
let workseconds = 0;
let breakseconds = 0;

function initializeTimer() {
    wm.innerText = workMinutes < 10 ? '0' + workMinutes : workMinutes;
    ws.innerText = workseconds < 10 ? '0' + workseconds : workseconds;
    bm.innerText = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
    bs.innerText = breakseconds < 10 ? '0' + breakseconds : breakseconds;
    counter.innerText = cyclesCountUp ? 0 : initialCycles;
}

start.addEventListener('click', startTimerFunction);
reset.addEventListener('click', resetTimer);
stop.addEventListener('click', stopTimer);
toggleMode.addEventListener('click', toggleCycleMode);

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
    counter.innerText = cyclesCountUp ? 0 : initialCycles;
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
        accumulateTimerValues();
        ws.innerText = formatTime(parseInt(ws.innerText) - 1);
    } else if (wm.innerText != 0 && ws.innerText == 0) {
        ws.innerText = 59;
        wm.innerText = formatTime(parseInt(wm.innerText) - 1);
    }

    if (wm.innerText == 0 && ws.innerText == 0) {
        playAlarm(videoID);
        accumulateTimerValues();
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

        if (cyclesCountUp) {
            counter.innerText = parseInt(counter.innerText) + 1;
            playAlarm(videoID);
        } else {
            counter.innerText = parseInt(counter.innerText) - 1;
            if (parseInt(counter.innerText) <= 0) {
                stopTimer();
                playAlarm(videoID);
            }
        }

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
        xpMax = Math.floor(xpMax * 1.1);
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


// timer reader
const presetsTableBody = document.getElementById('presets-body');

// Function to load presets from localStorage
function loadPresets() {
    const presets = getPresetsFromLocalStorage();
    presets.forEach(preset => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${preset.name}</td>
            <td>${preset.focus}</td>
            <td>${preset.break}</td>
            <td>${preset.cycles}</td>
                <td><button onclick="updateTimer(${preset.focus}, ${preset.break}, ${preset.cycles})">Set Timer</button></td>
        `;
        presetsTableBody.appendChild(row);
    });
    
}
function getPresetsFromLocalStorage() {
    const presets = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('custom')) {
            const presetData = JSON.parse(localStorage.getItem(key));
            
            presetData.focus = parseInt(presetData.focus);
            presetData.break = parseInt(presetData.break);
            presetData.cycles = parseInt(presetData.cycles);
            presets.push(presetData);
        }
    };
    return presets;
}

 
var timerModeDisplay = document.getElementById('timerMode');

// Function to update the timer mode display
function updateTimerModeDisplay() {
    if (cyclesCountUp) {
        timerModeDisplay.textContent = "Timer Mode: Count Up";
    } else {
        timerModeDisplay.textContent = "Timer Mode: Count Down";
    }
}

// Call the function initially to set the initial state
updateTimerModeDisplay();

 

 

//for the username
let username = localStorage.getItem('username');
if (!username) {
    username = 'user'; 
}
document.getElementById('userup').textContent = username;

//for the day


const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];
document.getElementById("day").innerHTML = day;





///alarm
const storedEffect = localStorage.getItem('selectedAudioEffect');
document.addEventListener("DOMContentLoaded", function() {
    
    let storedEffect = localStorage.getItem('selectedAudioEffect');
    if (!storedEffect) {
        localStorage.setItem('selectedAudioEffect', 'effect1'); // Default to Bell
        storedEffect = 'effect1';
    }


    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
    
        onYouTubeIframeAPIReady();
    }
});

function playAlarm(effect) {
    switch (effect) {
        case 'effect0':
            videoID = ''; // No alarm
            break;
            case 'effect1':
                videoID = 'Buie31LDKCs'; 
                break;
                case 'effect2':
                    videoID = 'XN9yJt5Bozc'; 
                    break;
                    case 'effect3':
                        videoID = '1YQmodWYx-g'; 
                        break;
                        case 'effect4':
                            videoID = 'BmwDaNKYOaI';
                            break;
                            case 'effect5':
                                videoID = 'VrCVHaOrIs4'; 
            break;
            case 'effect6':
                videoID = '0jBGLticqgQ'; 
                break;
                case 'effect7':
                    videoID = '0WJZVz2zShk'; 
                    break;
                    case 'effect8':
                        videoID = '78IE9xvV0a8'; 
                        break;
                        case 'effect9':
                            videoID = 'CSOsYLsU-Ko'; 
                            break;
                            case 'effect10':
                                videoID = 'hwiZoQpreDM'; 
                                break; 
                                default:
                                    videoID = 'Buie31LDKCs'; 
                                    break;
                                    };
                                    if (videoID) {
                                        alarmplayer.loadVideoById(videoID);
                                        alarmplayer.playVideo();
                                    
                                        }  
                                        
                                        setTimeout(function() {
                                            alarmplayer.stopVideo();
                                        }, 4000); // 5000 milliseconds = 5 seconds
                                    
}

//cycle countdown

function toggleCycleMode() {
    cyclesCountUp = !cyclesCountUp;
    if (!cyclesCountUp) {
        const presets = getPresetsFromLocalStorage();
        const defaultPreset = presets.length > 0 ? presets[0] : null;
        initialCycles = defaultPreset ? defaultPreset.cycles : 5;
    }
    counter.innerText = cyclesCountUp ? 0 : initialCycles;
    resetTimer();
    updateTimerModeDisplay();
}
function updateTimer(focusMinutes, breakMinutesParam, cycles) {
    workMinutes = focusMinutes;
    breakMinutes = breakMinutesParam; 
    initialCycles = cycles;

    wm.innerText = focusMinutes < 10 ? '0' + focusMinutes : focusMinutes;
    bm.innerText = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
    ws.innerText = '00';
    bs.innerText = '00';
    counter.innerText = cyclesCountUp ? 0 : cycles;

    resetTimer();
}



function accumulateTimerValues() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const day = daysOfWeek[d.getDay()];

    let timerData = loadTimerData(day);

   
    const currentWorkMinutes = parseInt(wm.innerText);
    const currentWorkSeconds = parseInt(ws.innerText);
    timerData.workSeconds = (timerData.workSeconds || 0) + 1;

    
    saveOrUpdateTimerData(day, timerData);

    
    if (currentWorkMinutes === 0 && currentWorkSeconds === 0) {
        const currentBreakMinutes = parseInt(bm.innerText);
        const currentBreakSeconds = parseInt(bs.innerText);

        timerData = loadTimerData(day); 

        timerData.breakMinutes = (timerData.breakMinutes || 0) + currentBreakMinutes;
        timerData.breakSeconds = (timerData.breakSeconds || 0) + currentBreakSeconds;

   
        saveOrUpdateTimerData(day, timerData);
    }
}

function saveOrUpdateTimerData(day, data) {
    let timerData = loadTimerData(day);
    timerData = { ...timerData, ...data };
    localStorage.setItem(`timerData_${day}`, JSON.stringify(timerData));
}

function loadTimerData(day) {
    const storedData = localStorage.getItem(`timerData_${day}`);
    return storedData ? JSON.parse(storedData) : {};
}







 

window.onload = function () {
    loadPresets();
    loadProgress();
    initializeTimer();
    backgroundsetter();
    profilesetter();
};
 
