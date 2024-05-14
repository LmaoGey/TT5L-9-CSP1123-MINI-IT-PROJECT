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
let genreLists = document.querySelectorAll('.genre-list');

selectgenre.onclick = function(){
    genrecontainer.classList.toggle('active');
};

optionundergenre.forEach(option => {
    option.addEventListener('click', function() {
        let selectedtext = option.querySelector('.option-text').textContent;
        genretext.textContent = selectedtext;
        genrecontainer.classList.toggle('active');

        genreLists.forEach(list => {
            list.classList.remove('active');
        });

        let genreClass = selectedtext.toLowerCase().replace(/\s+/g, '');
        let selectedGenreList = document.querySelector(`.${genreClass}.genre-list`);
        if (selectedGenreList) {
            selectedGenreList.classList.add('active');
        }
    });
    
});

genreLists.forEach(list => {
    list.classList.remove('active');
});


/////////////////////////////////song player
function playMusic(videoID) {

    // Replace "player" with the ID of the div where you want to embed the player
    var playerDiv = document.getElementById("rockplayer");

    // Construct the YouTube embed URL
    var embedURL = "https://www.youtube.com/embed/" + videoID + "?autoplay=1&controls=0&loop=1&playlist=" + videoID;

    // Embed the YouTube player
    playerDiv.innerHTML = '<iframe width="0" height="0" src="' + embedURL + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
}

//////////////////////////////////////////////////alarm bar toggle
let al = document.querySelector('.al');
let alarmm = document.querySelector('.alarm');

alarmm.onclick = function(){
    al.classList.toggle('active');
};


