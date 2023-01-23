const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1,nav2,nav3,nav4,nav5];
//control nav animation
function navAnimation(direction1,direction2){
    navItems.forEach((nav,i) => {
        i = i+1;
        nav.classList.replace(`slide-${direction1}-${i}`,`slide-${direction2}-${i}`)
    })
}
//toggle Nav
function toggleNav(){
    //Toggle Menu 
    menuBars.classList.toggle('change');
    //Toogle Menu active
    overlay.classList.toggle('overlay-active');
    if(overlay.classList.contains('overlay-active')){
        //Animate -Overlay
        overlay.classList.add('overlay-slide-left')
        overlay.classList.replace('overlay-slide-left','overlay-slide-right');
        //Animate in nav Items
        navAnimation('out','in');    
    }else{
        //Animate Out - Overlay
        overlay.classList.add('overlay-slide-right');
        overlay.classList.replace('overlay-slide-right','overlay-slide-left');
         //Animate in 
         navAnimation('in','out');
    }
}
//Event Listerners
menuBars.addEventListener('click',toggleNav);
navItems.forEach((nav) => {
    nav.addEventListener('click',toggleNav);
})
