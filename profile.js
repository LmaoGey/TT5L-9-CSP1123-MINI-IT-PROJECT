//////////////////////////////////////////////////////////menu bar icon toggle
let menubar = document.querySelector('.menubar');
let navigation = document.querySelector('.navigation');

menubar.onclick = function(){
    navigation.classList.toggle('active');
};

////////////////////////////////////////////////////to upload file as profile picture
let profile = document.querySelector('.profile');
let userphoto = document.querySelector('.userphoto');
let file = document.querySelector('#file');

function savePhotoToLocalStorage(photoData) {
    localStorage.setItem('userPhoto', photoData);
}

function getPhotoFromLocalStorage() {
    return localStorage.getItem('userPhoto');
}

window.addEventListener('DOMContentLoaded', function() {
    let savedPhoto = getPhotoFromLocalStorage();
    if (savedPhoto) {
        userphoto.setAttribute('src', savedPhoto);
    }
});

file.addEventListener('change',function(){
let filechosen = this.files[0];
    if (filechosen){
        let readfile = new FileReader();

        readfile.addEventListener('load', function(){
            userphoto.setAttribute('src', readfile.result); 
            savePhotoToLocalStorage(readfile.result);
        })
    readfile.readAsDataURL (filechosen);
    };
}); 

///////////////////////////////set username

const displayname = document.getElementById('displayname');
const usernamebox = document.querySelector('.username');
const inputname = document.getElementById('inputname');
const setname = document.getElementById('setname');

window.onload = () => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        displayname.textContent = savedUsername;
    }
};

displayname.addEventListener('click', () => {
    usernamebox.style.display = 'block';
    inputname.value = displayname.textContent;
    inputname.focus();
});

setname.addEventListener('click', () => {
    displayname.textContent = inputname.value;
    localStorage.setItem('username', inputname.value); // Save to local storage
    usernamebox.style.display = 'none';
});

/////////////////////////////////////////////////to navigate between pages when the link is pressed
let section = document.querySelectorAll('section');
let navlink = document.querySelectorAll('.selection a');

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlink.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.selection a[href*=' + id + ']').classList.add ('active');
            });
        };
    });
};

/////////unlock items
document.addEventListener('DOMContentLoaded', () => {
    const levelvalue = parseInt(localStorage.getItem('level')) || 1;
    const colours = document.querySelectorAll('.colour');
    const songs = document.querySelectorAll('.song');

    colours.forEach(colour => {
        const colourLevel = parseInt(colour.dataset.level);

        if (colourLevel <= levelvalue) {
            colour.classList.add('unlocked');
        } 
    });

    songs.forEach(song => {
        const songLevel = parseInt(song.dataset.level);

        if (songLevel <= levelvalue) {
            song.classList.add('unlocked');
        }
    });

    // Get all rewards elements

    if (levelvalue) {
        document.getElementById('level').textContent = `Current Level: Level ${levelvalue}`;
    }

    const achievements = document.querySelectorAll('.unlock');

    achievements.forEach(unlock => {
        const achievementLevel = parseInt(unlock.dataset.level);

        if (achievementLevel <= levelvalue) {
            unlock.classList.add('unlocked');
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////background bar toggle
let bg = document.querySelector('.bg');
let backgroundd = document.querySelector('.background');

backgroundd.onclick = function(){
    bg.classList.toggle('active');
};

//////////////////////////////////////////////////////////////background colour selection
let selectcolour = document.querySelectorAll('.colour');

let storedColour = localStorage.getItem('colour');
if (storedColour) {
    document.querySelector(':root').style.setProperty('background-image', storedColour);
}
selectcolour.forEach(backgroundimage =>{

    backgroundimage.addEventListener('click',() =>{
        if (!backgroundimage.classList.contains('unlocked')) {
            return; 
        }
        let dataImage = backgroundimage.getAttribute('data-image');
        document.querySelector(':root').style.setProperty('background-image' , dataImage);
        localStorage.setItem('colour' , dataImage);
    });
});

////////////////////////////////////////////////////music bar toggle
let ms = document.querySelector('.ms');
let musicc = document.querySelector('.music');

musicc.onclick = function(){
    ms.classList.toggle('active');
};

/////////////////////////////////////////music genre toggle
let genrecontainer = document.querySelector('.genre-container');
let selectgenre = document.querySelector('.select-genre');
let genretext = document.querySelector('.genre-text');
let genreoptions = document.querySelector('.genre-option');
let optionundergenre = document.querySelectorAll('.option');
let genrelists = document.querySelectorAll('.genre-list');

selectgenre.onclick = function(){
    genrecontainer.classList.toggle('active');
};

optionundergenre.forEach(option => {
    option.addEventListener('click', function() {
        let selectedtext = option.querySelector('.option-text').textContent;
        genretext.textContent = selectedtext;
        genrecontainer.classList.toggle('active');

        genrelists.forEach(list => {
            list.classList.remove('active');
        });

        let genreclass = selectedtext.toLowerCase().replace(/\s+/g, '');
        let selectedgenrelist = document.querySelector(`.${genreclass}.genre-list`);
        if (selectedgenrelist) {
            selectedgenrelist.classList.add('active');
        }
    });
    
});

genrelists.forEach(list => {
    list.classList.remove('active');
});


/////////////////////////////////song player (play music, loop music, music volume)
function onYouTubeIframeAPIReady() {
    initMusicPlayer();
    initAlarmPlayer();
}

var musicplayer;


function initMusicPlayer() {
    musicplayer = new YT.Player('music-player', {
        height: '0',
        width: '0',
        events: {
            'onReady': onMusicPlayerReady,
            'onStateChange': onMusicPlayerStateChange
        }
    });
}

function onMusicPlayerReady(event) {
    var musicVolume = localStorage.getItem('musicVolume') || 100;
    musicplayer.setVolume(musicVolume);
    document.getElementById('musicvolume-control').value = musicVolume;
}

function tryPlayMusic(element, videoID) {
    if (element.classList.contains('unlocked')) {
        playMusic(videoID);
    } else {
        return;
    }
}

function playMusic(videoID) {
    if (musicplayer && musicplayer.loadVideoById) {
        musicplayer.loadVideoById(videoID);
        musicplayer.playVideo();
        localStorage.setItem('selectedMusic', videoID);

    }
}

function playPreviewMusic(videoID) {
    if (musicplayer && musicplayer.loadVideoById) {
        musicplayer.loadVideoById(videoID);
        musicplayer.playVideo();

        setTimeout(function() {
            musicplayer.stopVideo();
        }, 5000);

    }
}


function setMusicVolume(value) {
    if (musicplayer && musicplayer.setVolume) {
        musicplayer.setVolume(value);
        localStorage.setItem('musicVolume', value);
    }
}

function onMusicPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        musicplayer.playVideo();  
    }
}



//////////////////////////////////////////////////alarm bar toggle
let al = document.querySelector('.al');
let alarmm = document.querySelector('.alarm');

alarmm.onclick = function(){
    al.classList.toggle('active');
};



////// alarm player (play alarm, loop alarm, alarm volume， set as alarm)
var alarmplayer;

document.addEventListener("DOMContentLoaded", function() {
    var alarmEffects = document.querySelectorAll('.alarm-effect');

    var storedEffect = localStorage.getItem('selectedAudioEffect');
    if (storedEffect) {
        var radioButton = document.querySelector('input[name="audioEffect"][value="' + storedEffect + '"]');
        if (radioButton) {
            radioButton.checked = true;
        }
    }

    alarmEffects.forEach(function(effect) {
        effect.addEventListener('click', function() {
            var checkbox = effect.querySelector('input[type="radio"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    });
});


function initAlarmPlayer() {
    alarmplayer = new YT.Player('alarm-player', {
        height: '0',
        width: '0',
        events: {
            'onReady': onAlarmPlayerReady,
            'onStateChange': onAlarmPlayerStateChange
        }
    });
}

function onAlarmPlayerReady(event) { //////////////////use this
    var alarmVolume = localStorage.getItem('alarmVolume') || 100;
    alarmplayer.setVolume(alarmVolume);
    document.getElementById('alarmvolume-control').value = alarmVolume;
}



function playAlarm(videoID) {
    if (alarmplayer && alarmplayer.loadVideoById) {
       
        if (musicplayer.getPlayerState() === YT.PlayerState.PLAYING) {
            musicplayer.pauseVideo();
        }
       
        alarmplayer.loadVideoById(videoID);
        alarmplayer.playVideo();
    }
}

function setAlarm() {
    var selectedEffect = document.querySelector('input[name="audioEffect"]:checked');
    if (selectedEffect) {
        var effectValue = selectedEffect.value;
        alarmplayer.stopVideo();
      
        if (musicplayer.getPlayerState() === YT.PlayerState.PAUSED) {
            musicplayer.playVideo();
        }
        localStorage.setItem('selectedAudioEffect', effectValue);
        alert('Alarm set with sound effect: ' + effectValue);
    } else {
        alert('Please select an alarm sound effect.');
    }
}

function setAlarmVolume(value) {
    if (alarmplayer && alarmplayer.setVolume) {
        alarmplayer.setVolume(value);
        localStorage.setItem('alarmVolume', value);
    }
}

function onAlarmPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        alarmplayer.playVideo();  
    }
}





////////////data part toggle
let mngdt = document.querySelector('.mngdt');
let managedata = document.querySelector('.managedata');

managedata.onclick = function(){
    mngdt.classList.toggle('active');
};

//////////clear data in local storage
document.getElementById('clearlocalstorage').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all the stored data?')) {
        if (confirm('This action will permanently delete all data. Are you sure?')) {
            localStorage.clear();
            alert('Back to Default!');
            window.location.reload();
        }
    }
});
/////////////////////rewards bar toggle
let rw = document.querySelector('.rw');
let rewardss = document.querySelector('.rewards');

rewardss.onclick = function(){
    rw.classList.toggle('active');
};
///////////line graph
const lineGraph = document.getElementById('lineGraph').getContext('2d');
const linegraph = new Chart(lineGraph, {
    type: 'line',
    data: {
        labels: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        datasets: [{
          label: 'Time focused (in hour)',
          data: [2,1.5,15,20,14,22,0],
          fill: false,
          backgroundColor: ['#00FFFF'],
          borderColor: ['#0000FF'],
          tension: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16 
                    }
                }
            },
            title: {
                display: true,
                text: 'Weekly Focus Time',
                font: {
                    size: 24 
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 16
                    }
                },
                beginAtZero: true
            },
            y: {
                ticks: {
                    font: {
                        size: 16,
                        stepSize: 2
                    }
                },
                beginAtZero: true,
                min: 0, 
                max: 25, 
            }
        }
    }
});

////////pie chart
const pieChart = document.getElementById('pieChart').getContext('2d');
const piechart = new Chart(pieChart, {
    type: 'pie',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Time focused (in hour)',
            data: [2, 1.5, 15, 20, 14, 22, 0],
            backgroundColor: [
                '#00FFFF', '#00CED1', '#48D1CC', '#40E0D0', '#20B2AA', '#008B8B', '#5F9EA0'
            ],
            borderColor: '#000000',
            borderWidth: 1,
            radius: 200
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true, 
        aspectRatio: 2,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
            title: {
                display: true,
                text: 'Task Focus Time',
                font: {
                    size: 24
                }
            }
        }
    }
});

