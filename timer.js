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


// To-do list 
const addButton = document.querySelector('.todoitems button');
const inputBox = document.getElementById('todoinput-box');
const todoList = document.querySelector('.todoitems');

addButton.addEventListener('click', () => {
    const task = inputBox.value.trim();
    if (task) {
        addTodoItem(task);
        inputBox.value = '';
    }
});

function addTodoItem(task) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('row');

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn');
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(todoItem);
    });

    todoItem.appendChild(taskText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
    saveTodos();
}
function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todoitems .row span').forEach(todo => {
        todos.push(todo.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        savedTodos.forEach(todo => {
            addTodoItem(todo, false);
        });
    }
}


function addTodoItem(task, save = true) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('row');

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn');
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(todoItem);
        removeTodoItemFromLocalStorage(task); 
    });

    todoItem.appendChild(taskText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);

    if (save) {
        saveTodos();
    }
}

function removeTodoItemFromLocalStorage(task) {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    const updatedTodos = savedTodos.filter(todo => todo !== task);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}


window.onload = function() {
    loadProgress();
    initializeTimer();
    backgroundsetter();
    loadTodos();
};


///alarm
document.addEventListener("DOMContentLoaded", function() {
    var storedEffect = localStorage.getItem('selectedAudioEffect');
    if (!storedEffect) {
        localStorage.setItem('selectedAudioEffect', 'effect1'); // Default to Bell
        storedEffect = 'effect1';
    }
    playAlarm(storedEffect);
});


function playAlarm(effect) {
    var videoID;
    switch (effect) {
        case 'effect0':
            videoID = ''; // No alarm
            break;
        case 'effect1':
            videoID = 'iysr0raKzl4'; // Bell
            break;
        case 'effect2':
            videoID = '3SzgkuT9-Kw'; // DingDong
            break;
        case 'effect3':
            videoID = 'gquGoWSpPCI'; // Siren
            break;
        case 'effect4':
            videoID = 'gquGoWSpPCI'; // ClockBeep
            break;
        case 'effect5':
            videoID = 'gquGoWSpPCI'; // Rooster
            break;
        case 'effect6':
            videoID = 'gquGoWSpPCI'; // Spaceship
            break;
        default:
            videoID = 'iysr0raKzl4'; // Default to Bell
            break;
    }
    if (videoID) {
        alarmplayer.loadVideoById(videoID);
        alarmplayer.playVideo();
    }
}
