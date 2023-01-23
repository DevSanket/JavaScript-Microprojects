const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const apiURL = "https://api.lyrics.ovh";

//function searchSong
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}



// show data function
function showData(data) {
    //let output = '';
    // data.data.forEach(song => {
    //     output+= `
    //     <li>
    //     <span><strong>
    //         ${song.artist.name}
    //     </strong> - ${song.title}</span>
    //     <button class="btn" data-artist="${song.artist.name}"
    //     data-songtitle="${song.title}">Get Lyrics</button>
    //     </li>
    //     `;
    // });

    // result.innerHTML = `
    // <ul class="songs">
    //     ${output}
    // </ul>
    // `;

    result.innerHTML = `
    <ul class="songs">
        ${data.data.map(
            song => `
            <li><span>
            <strong>${song.artist.name}</strong>
            - ${song.title}
            </span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
            `
        ).join('')}
    </ul>
    `;

    if(data.prev || data.next){
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    }
}

//GEt prev and next Result

async function getMoreSongs(url){
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

//Get Lyrics for song
async function getLyrics(artist,songTitle){
  const demo = `${apiURL}/v1/${artist}/${songTitle}`;
  console.log(demo);

  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  console.log(data);
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');
  result.innerHTML = `<h2><strong>${artist}</strong>
- ${songTitle}</h2><span>${lyrics}</span>`;
more.innerHTML ='';

}


//Event Listerners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

//Get lyrics button click

result.addEventListener('click', e => {
   const clickEl = e.target;
   console.log();
   if(clickEl.tagName === 'BUTTON'){
      const artist = clickEl.getAttribute('data-artist');
      const songTitle = clickEl.getAttribute('data-songtit');

      getLyrics(artist,songTitle);
   }
});

