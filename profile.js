/////menu bar icon toggle
let menubar = document.querySelector('.menubar');
let navigation = document.querySelector('.navigation');

menubar.onclick = function(){
    navigation. classList.toggle('active');
};


/////to navigate between pages when the link is pressed
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

/////background bar toggle
let bg = document.querySelector('.bg');
let backgroundd = document.querySelector('.background');

backgroundd.onclick = function(){
    bg. classList.toggle('active');
};

/////background colour selection
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

/////music bar toggle
let ms = document.querySelector('.ms');
let musicc = document.querySelector('.music');

musicc.onclick = function(){
    ms. classList.toggle('active');
};