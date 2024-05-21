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
let uploadfile = document.querySelector('#uploadfile');

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

uploadfile.addEventListener('click', function() {
    file.click();
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
                document.querySelector('.selection a [href*=' + id + ']').classList.add ('active');
            });
        };
    });
};

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


function playMusic(videoID) {
    if (musicplayer && musicplayer.loadVideoById) {
        musicplayer.loadVideoById(videoID);
        musicplayer.playVideo();
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



////// alarm player (play alarm, loop alarm, alarm volume)
var alarmplayer;

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

function onAlarmPlayerReady(event) {
    var alarmVolume = localStorage.getItem('alarmVolume') || 100;
    alarmplayer.setVolume(alarmVolume);
    document.getElementById('alarmvolume-control').value = alarmVolume;
}


function playAlarm(videoID) {
    if (alarmplayer && alarmplayer.loadVideoById) {
        alarmplayer.loadVideoById(videoID);
        alarmplayer.playVideo();
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


//////////set as alarm

document.addEventListener("DOMContentLoaded", function() {
    var alarmEffects = document.querySelectorAll('.alarm-effect');

    alarmEffects.forEach(function(effect) {
        effect.addEventListener('click', function() {
            var checkbox = effect.querySelector('input[type="radio"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    });
});

function setAlarm() {
    var selectedEffect = document.querySelector('input[name="audioEffect"]:checked');
    if (selectedEffect) {
        var effectValue = selectedEffect.value;
        var videoID = selectedEffect.getAttribute('data-video-id');

       
        var playerDivvv = document.getElementById("alarm-player");
        playerDivvv.innerHTML = '';


        localStorage.setItem('selectedAudioEffect', effectValue);
        localStorage.setItem('selectedVideoID', videoID);

        alert('Alarm set with sound effect: ' + effectValue);
    } else {
        alert('Please select an alarm sound effect.');
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



