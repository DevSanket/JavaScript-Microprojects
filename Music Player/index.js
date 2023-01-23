//1
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song Titles
const songs=['Cartoon','Free','Jarico'];

//Keep Track of Song
let songIndex = 2;

//Initialy Load Song Detailes


//2
//update song details
function loadSong(song){
    title.innerText = song;
    audio.src=`Music/${song}.mp3`;
    cover.src= `img/${song}.jpg`;
    
}

loadSong(songs[songIndex]);

//4 
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

//set Progress
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width) * duration;
}


function updateProgress(e){
    const { duration,currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//3
//Event Listeners

playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})


//5
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
     loadSong(songs[songIndex]);
     playSong();

}



//change Song
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);


//last
//Time Song update
audio.addEventListener('timeupdate',updateProgress);




//all done 
//Click on Progress
progressContainer.addEventListener('click',setProgress);


//song End
audio.addEventListener('ended',nextSong);
