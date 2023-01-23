const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const data =[
    {
        image:'./img/drink.jpg',
        text:"I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
      },
      {
        image: './img/tired.jpg',
        text: "I'm Tired"
      },
      {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
      },
      {
        image: './img/happy.jpg',
        text: "I'm Happy"
      },
      {
        image: './img/angry.jpg',
        text: "I'm Angry"
      },
      {
        image: './img/sad.jpg',
        text: "I'm Sad"
      },
      {
        image: './img/scared.jpg',
        text: "I'm Scared"
      },
      {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
      },
      {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
      },
      {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
      },
      {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
      }
];

data.forEach(createBox);

//create speech box
function createBox(item){
  const box = document.createElement('div');
  const { image , text } = item;
  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}"/>
  <p class="info">${text}</p>
  `;
  //@ todo speak event

  main.appendChild(box);
}