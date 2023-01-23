//variable Declaration

const cardsContainer = document.getElementById(
  "card-container"
);
const prevBtn = document.getElementById(
  "prev"
);
const nextBtn = document.getElementById(
  "next"
);
const currentEl = document.getElementById(
  "current"
);
const showBtn = document.getElementById(
  "show"
);
const hideBtn = document.getElementById(
  "hide"
);
const questionEl = document.getElementById(
  "question"
);
const answerEl = document.getElementById(
  "answer"
);
const addCardBtn = document.getElementById(
  "add-card"
);
const clearBtn = document.getElementById(
  "clear"
);
const addContainer = document.getElementById(
  "add-container"
);

// keep track of current card
let currentActiveCard = 0;

//Store DOM cards
const cardsEl = [];

// Store card data
//Local Storage
const cardData = getCardsData();
// const cardData = [
//   {
//     question: "What is JavaScript?",
//     answer: "a programming language",
//   },
//   {
//     question: " Android Platforms",
//     answer: "flutter,react native",
//   },
//   {
//     question:
//       "Machine Learning Langauge?",
//     answer: "python and R",
//   },
// ];

// create card function
function CreateAllCards() {
  cardData.forEach((data, index) =>
    createcard(data, index)
  );
}

//create single card function
function createcard(data, index) {
  const card = document.createElement(
    "div"
  );
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
  <p>${data.question}</p>
  </div>
  <div class="inner-card-back">
  <p>${data.answer}</p>
  </div>
  </div>
  `;

  card.addEventListener("click", () =>
    card.classList.toggle("show-answer")
  );

  //Add to DOM
  cardsEl.push(card);
  cardsContainer.appendChild(card);

  //update
  updateCurrentText();
}

//show number cards
function updateCurrentText(){
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//Local Storage
function getCardsData(){
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add Card to local storeage
function setCardsData(cards){
  localStorage.setItem('cards',JSON.stringify(cards));
  window.location.reload();
}


CreateAllCards();


//event Listners 

nextBtn.addEventListener('click',() => {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard = currentActiveCard + 1;
  if(currentActiveCard > cardsEl.length -1){
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
})

prevBtn.addEventListener('click',() => {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard = currentActiveCard - 1;
  if(currentActiveCard < 0){
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

//Show Add Card
showBtn.addEventListener('click',() => addContainer.classList.add('show'));

//hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//add Card button
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if(question.trim() && answer.trim()){
    const newCard = { question : question,answer : answer};
    createcard(newCard);
    questionEl.value ='';
    answerEl.value='';
    addContainer.classList.remove('show');
    cardData.push(newCard);
    setCardsData(cardData);
  }
})

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML= '';
  window.location.reload();
})