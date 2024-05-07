/////menu bar icon
let menubar = document.querySelector('.menubar');
let navigation = document.querySelector('.navigation');

menubar.onclick = function(){
    navigation. classList.toggle('active');
};

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
