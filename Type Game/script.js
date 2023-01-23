//Steps
//create variables
//generate random word function
//add word to dom function create and call
//create event listerner
//create updateScoreFunction
//create start Count down variables
//create update time function
//create game over function
//difficulty working start

const word=document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('setting-btn');
const settings = document.getElementById('settings');
const settingForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
//List of Words
const words = ['sigh','tense','airplane','HeyYou','whatsUp','welcome','brother','shape','grandLeaks','masterHouse','LifeRules','GoNext','Brother'];


//1 after added variables

//Initialize word
let randomWord;

//Initialize score,time
let score =0;
let time= 10;

//all Difficulty
//set difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'): 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'): 'medium';

//Focus on Input
text.focus();

//start Counting down
const timeInterval = setInterval(updateTime ,1000)

//generate random word
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

addWordToDOM();

//after calling in Event Listerner
function updateScore(){
    score++;
    scoreEl.innerHTML = score;

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

//game over function
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your final Score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

//update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';
    if(time === 0){
        clearInterval(timeInterval);
        //
        gameOver();
    }
}

//Event Listerner
text.addEventListener('input',e => {
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();
        //clear 
        e.target.value ='';
        // difficulty
        if(difficulty === 'hard'){
            time+=2
        }else if(difficulty === 'medium'){
            time +=3;
        }else{
            time += 4;
        }
        updateTime();
    }
})

//Difficulty event listerners

//settings btn 
settingsBtn.addEventListener('click',() => settings.classList.toggle('hide'));

//settings select
settingForm.addEventListener('change',e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
})



