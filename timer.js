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
    if (musicplayer && musicplayer.loadVideoById) {
        musicplayer.loadVideoById(videoID);
        musicplayer.playVideo();
        localStorage.setItem('selectedMusic', videoID);

    }
}

    

//timer
let workMinutes = 0;
let breakMinutes = 0;
let workseconds = 0;
let breakseconds = 0;

 

// Initialize timer using preset data
function initializeTimer() {
    const presets = getPresetsFromLocalStorage(); // Get presets from localStorage
    const defaultPreset = presets.length > 0 ? presets[0] : null; // Assuming the first preset as default

    // Set workMinutes and breakMinutes from the default preset or default values
    workMinutes = defaultPreset ? defaultPreset.focus : 25; // Default work minutes or preset focus
    breakMinutes = defaultPreset ? defaultPreset.break : 5; // Default break minutes or preset break

    // Set initial timer display
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
        ws.innerText = formatTime(parseInt(ws.innerText) - 1);
    } else if (wm.innerText != 0 && ws.innerText == 0) {
        ws.innerText = 59;
        wm.innerText = formatTime(parseInt(wm.innerText) - 1);
    }

    if (wm.innerText == 0 && ws.innerText == 0) {
        playAlarm(videoID);
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
        } else {
            counter.innerText = parseInt(counter.innerText) - 1;
            if (parseInt(counter.innerText) <= 0) {
                stopTimer();
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
    presets.forEach((preset, index) => {  // Add index as the second parameter in forEach
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${preset.name}</td>
            <td>${preset.focus}</td>
            <td>${preset.break}</td>
            <td>${preset.cycles}</td>
            <td>
                <button class="set-timer" data-index="${index}">Set Timer</button>
            </td>
        `;
        presetsTableBody.appendChild(row);
    });
    // Add event listeners for "Set Timer" buttons
    document.querySelectorAll('.set-timer').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            setTimerValues(presets[index]);
        });
    });
}

// Function to get presets from localStorage
function getPresetsFromLocalStorage() {
    const presets = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('custom')) {
            const presetData = JSON.parse(localStorage.getItem(key));
            presets.push(presetData);
        }
    }
    return presets;
}

// Function to set timer values based on the selected preset
function setTimerValues(preset) {
    document.getElementById("name").value = preset.name;
    document.getElementById("focus").value = preset.focus;
    document.getElementById("break").value = preset.break;
    document.getElementById("cycles").value = preset.cycles;
    alert(`Timer set to: Focus ${preset.focus}, Break ${preset.break}, Cycles ${preset.cycles}`);
}

// Load presets when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPresets();
});


 
 

 

 

//for the username
let username = localStorage.getItem('username');
if (!username) {
    username = 'user'; 
}
document.getElementById('userup').textContent = username;








///alarm
document.addEventListener("DOMContentLoaded", function() {
    var storedEffect = localStorage.getItem('selectedAudioEffect');
    if (!storedEffect) {
        localStorage.setItem('selectedAudioEffect', 'effect1'); // Default to Bell
        storedEffect = 'effect1';
        };
        playAlarm(storedEffect);
        });
        

function playAlarm(effect) {
    var videoID;
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
}

//cycle countdown

function toggleCycleMode() {
    cyclesCountUp = !cyclesCountUp;
    if (!cyclesCountUp) {
        const presets = getPresetsFromLocalStorage();
        const defaultPreset = presets.length > 0 ? presets[0] : null;
        initialCycles =defaultPreset ? defaultPreset.cycles : 5; ;
    }
    resetTimer();
}
 
 
  
 

window.onload = function () {
    loadPresets();
    loadProgress();
    initializeTimer();
    backgroundsetter();
    profilesetter();
};
 
 