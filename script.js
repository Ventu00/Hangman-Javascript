const hangmanImageDiv = document.getElementById("Hangmanimage");
let images = ['images/hangman7.png','images/hangman6.png','images/hangman5.png','images/hangman4.png','images/hangman3.png','images/hangman2.png','images/hangman.png'];
let currentImageIndex = parseInt(getCookie("currentImageIndex")) || 0;
let answare = document.getElementById("auxwordansware");
let randomArrayIndex = Math.floor(Math.random() * 3);
let randomWord;
let playerName= getCookie("playername")||"";
let usernameInput = document.getElementById("username");
let playerNameParagraph = document.getElementById("playername");
const fruitsArray = ["apple","orange","banana","grape","kiwi","mango","strawberry","coconut","pineapple","pear","cherry","peach"];
const fruitInfoArray = [
   "Apples are a type of fruit that grow on trees.",
   "Oranges are large, orange fruits that are commonly grown in Florida.",
   "Bananas are long, yellow, edible fruits that are native to Southeast Asia.",
   "Grapes are a type of berry that grow in clusters.",
   "Kiwis are small, hairy fruits that are native to New Zealand.",
   "Mangoes are tropical fruits that have a soft pulpy flesh.",
   "Strawberries are small, sweet, and tangy fruits.",
   "A coconut is a large fruit that grows on a tropical palm tree.",
   "Pineapples are tropical fruits that have a spiny skin and a sweet, slightly acidic taste.",
   "Pears are large, round fruits that are native to Europe.",
   "Cherries are small, tart fruits that are native to Asia.",
   "Peaches are large, soft fruits that are native to China."
];
const fruitimagesarray = [
  'images/imageswords/Fruit/apple.jpg',
  'images/imageswords/Fruit/orange.jpg',
  'images/imageswords/Fruit/banana.jpg',
  'images/imageswords/Fruit/grape.jpg',
  'images/imageswords/Fruit/kiwi.jpg',
  'images/imageswords/Fruit/mango.jpg',
  'images/imageswords/Fruit/strawberry.jpg',
  'images/imageswords/Fruit/coconut.jpg',
  'images/imageswords/Fruit/pineapple.jpg',
  'images/imageswords/Fruit/pear.jpg',
  'images/imageswords/Fruit/cherry.jpg',
  'images/imageswords/Fruit/peach.jpg'
];

const colorsArray = ["red","blue","green","yellow","purple","orange","pink","brown","gray","teal","maroon","cyan"];
const colorsInfoArray = [
  "Red is a primary color in the RGB color model.",
  "Blue is the color of the sky and sea, and is one of the primary colors in the RGB color model.",
  "Green is the color of plants and vegetables.",
  "Yellow is the color of sunflowers and bananas.",
  "Purple is a secondary color in the RGB color model.",
  "Orange is a secondary color in the RGB color model.",
  "Pink is a shade of red.",
  "Brown is a dark color close to black.",
  "Gray is a neutral color.",
  "Teal is a greenish-blue color.",
  "Maroon is a dark brown color.",
  "Cyan is a light blue-green color."
];

const colorimagesarray = [
  'images/imageswords/color/red.jpg',
  'images/imageswords/color/blue.jpg',
  'images/imageswords/color/green.jpg',
  'images/imageswords/color/yellow.jpg',
  'images/imageswords/color/purple.jpg',
  'images/imageswords/color/orange.jpg',
  'images/imageswords/color/pink.jpg',
  'images/imageswords/color/brown.jpg',
  'images/imageswords/color/gray.jpg',
  'images/imageswords/color/teal.jpg',
  'images/imageswords/color/maroon.jpg',
  'images/imageswords/color/cyan.jpg'
];

const countriesArray = ["USA","Canada","France","Japan","Korea","Brazil","India","Mexico","Germany","Spain","Russia","Italy"];
const countryInfoArray = [
  "The United States is the third largest country by land area.",
  "Canada is the second largest country by land area.",
  "France is known for its fine food, fashion, and culture.",
  "Japan is known for its technology, cars, and anime.",
  "South Korea is a country in East Asia that occupies the southern part of the Korean peninsula",
  "Brazil is known for its football, music, and Carnaval.",
  "India is known for its ancient history, rich culture, and varied cuisines.",
  "Mexico is known for its vibrant culture, history, and sports.",
  "Germany is known for its engineering, manufacturing, and automotive industries.",
  "Spain is known for its beautiful beaches, wine, and architecture.",
  "Russia is known for its vast size, cold climate, and rich history.",
  "Italy is known for its art, fashion, and food."
];

const countryimagesarray = [
  'images/imageswords/country/USA.jpg',
  'images/imageswords/country/Canada.jpg',
  'images/imageswords/country/France.jpg',
  'images/imageswords/country/Japan.jpg',
  'images/imageswords/country/corea.jpg',
  'images/imageswords/country/Brazil.jpg',
  'images/imageswords/country/India.jpg',
  'images/imageswords/country/Mexico.jpg',
  'images/imageswords/country/Germany.jpg',
  'images/imageswords/country/Spain.jpg',
  'images/imageswords/country/Russia.jpg',
  'images/imageswords/country/Italy.jpg'
];
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let elapsedTime; 

let selectedLetters = []; 

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return "";
}

function saveGameState() {
  setCookie("randomWord", randomWord, 1);
  setCookie("selectedLetters", JSON.stringify(selectedLetters), 1);
}

// Function to reset game state
function resetGameState() {
  initiateImage();

  currentImageIndex = 0; 
  imagePath = "images/hangman7.png";
  setCookie("imagePath", "images/hangman7.png", 1);
  randomWord = getRandomWord(countriesArray);
  if (getCookie("underscores") == "") {
      underscores = "_ ".repeat(randomWord.length);
  } else {
      underscores = getCookie("underscores");
  }
}

/////////////////////////////////////////////////////////////////////////////////

function startfunct(){
  let savedPlayerName = getCookie("playername");

  if (cookieImagePath != null && cookieImagePath.trim() !== "") {
    imagePath = cookieImagePath;
}

  if (savedPlayerName !== "") {
      playerName = savedPlayerName;
      playerNameParagraph.textContent = "Player: " + savedPlayerName;


  } else {
      playerName = updatePlayerName();
      if (playerName !== "") {
          setCookie("playername", playerName, 1);
      }
  }

  if (playerName !== "") {
      gameStart();
  }
  setCookie('userEntered', 'true', 1);

  applyStylesIfUserEntered();
}


  function updatePlayerName() {
    let username = usernameInput.value;
   

    if(username !==""){
      playerNameParagraph.textContent = "Player: " + username;
      saveGameStats(randomWord, username, 0, 0);
    }else{
      alert("Please enter a valid name");
      usernameInput.style.backgroundColor="#E75C65";
    }

    return username;
   }
   


   function selectRandomCategory() {
    const savedRandomWord = getCookie("randomWord");
  
    if (savedRandomWord) {
      randomWord = savedRandomWord;
      displayInfo(getCategoryFromWord(randomWord));
    } else {
      // If randomWord is not saved in cookies, generate a new one
      switch (randomArrayIndex) {
        case 0:
          randomWord = getRandomWord(countriesArray);
          break;
        case 1:
          randomWord = getRandomWord(fruitsArray);
          break;
        case 2:
          randomWord = getRandomWord(colorsArray);
          break;
        default:
          console.error("Unexpected array index");
      }
      
      setCookie("randomWord", randomWord, 1);
      displayInfo(getCategoryFromWord(randomWord));
    }
  }

  function getCategoryFromWord(word) {
    if (countriesArray.includes(word)) {
      return "Country";
    } else if (fruitsArray.includes(word)) {
      return "Fruit";
    } else if (colorsArray.includes(word)) {
      return "Color";
    } else {
      console.error("Unexpected category");
      return "";
    }
  }

  
  function getRandomWord(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  

  let wordInfo;
  let wordimage;
  function displayInfo(category) {
    answare.innerHTML = category;
    // Get the information based on the selected category
    let infoArray;
    let imagearray;
    switch (category) {
      case "Country":
        infoArray = countryInfoArray;
        imagearray = countryimagesarray;
        break;
      case "Fruit":
        infoArray = fruitInfoArray;
        imagearray = fruitimagesarray;
        break;
      case "Color":
        infoArray = colorsInfoArray;
        imagearray = colorimagesarray;
        break;
      default:
        console.error("Unexpected category");
        return;
    }
    
    const infoIndeximage = arrayIndexOf(imagearray, randomWord);
    wordimage = imagearray[infoIndeximage];
   console.log(wordimage); 
   
    // Get the information for the randomly selected word
    const infoIndex = arrayIndexOf(infoArray, randomWord);
    wordInfo = infoArray[infoIndex];
    console.log(wordInfo); 
    
  }
  
  function arrayIndexOf(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].toLowerCase().includes(element.toLowerCase())) {
        return i;
      }
    }
    return -1;
  }
  
  // Call the function to select a random category and display information
  selectRandomCategory();

  const paragraphElement = document.getElementById("randomword");



  function updateUnderscores() {

    if(getCookie("underscores")==""){
      underscores = "_ ".repeat(randomWord.length);
    }else{
      underscores=getCookie("underscores");
    }
    paragraphElement.innerHTML = underscores;

  }
  let imagePath;
  let cookieImagePath = getCookie("imagePath");

  function initiateImage() {
 
    imagePath = images[currentImageIndex] || getCookie("imagePath");

    const imgElement = document.createElement('img');
    imgElement.src = imagePath;
    imgElement.alt = 'Hangman';
    hangmanImageDiv.innerHTML = '';
    hangmanImageDiv.appendChild(imgElement);
    console.log(imagePath);
    setCookie("imagePath", imagePath, 1);


}



function gameStart() {
  
  startTime = Date.now();

  saveGameState();

    let btnstart = document.getElementById('playbtn');
    btnstart.style.display = 'none';
    let WordAndAnswareCont = document.getElementById('WordAndAnswareCont');
    WordAndAnswareCont.style.display='block';
    var userform = document.getElementById('userform');
    userform.style.display='none';
    var userform = document.getElementById('playername');
    userform.style.display='block';
    var letterscont = document.getElementById('letterscont');
    letterscont.style.display='block';
    
    updateUnderscores();
}

function LetKeys() {
  const lettersCont = document.getElementById("letterscont");

  const clickedLetters = JSON.parse(localStorage.getItem("clickedLetters")) || {};

  // Iterate through each letter in the alphabet
  alphabet.forEach(letter => {
    const letterButton = document.createElement("button");
    letterButton.textContent = letter;
    letterButton.classList.add("letter-btn");

    // Check if the letter has been clicked previously
    if (clickedLetters[letter]) {
      letterButton.disabled = true;
      letterButton.style.backgroundColor = "grey";
    }

    // Add click event listener to the letter button
    letterButton.addEventListener("click", function() {
      letterButton.disabled = true;
      letterButton.style.backgroundColor = "grey";

      clickedLetters[letter] = true;
      localStorage.setItem("clickedLetters", JSON.stringify(clickedLetters));

      checkLetterInWord(letter);
    });

    lettersCont.appendChild(letterButton);
  });
}


let lastfail;
  function checkLetterInWord(clickedLetter) {
    const lowercasedRandomWord = randomWord.toLowerCase();
    const lowercasedClickedLetter = clickedLetter.toLowerCase();
    let winlose = document.getElementById("winlose");
    let endtittle = document.getElementById("endtittle");
    let randomword = document.getElementById("randomwordfinal");
    let wordinfodom = document.getElementById('wordinfo');
    let completeword = document.getElementById("randomword");
    let imageofword = document.getElementById("imageword");
    let answarefinal;
   
    if (lowercasedRandomWord.includes(lowercasedClickedLetter)) {
      ifYouAreWinning();
    } else {
      currentImageIndex++;
      setCookie("currentImageIndex",currentImageIndex,1);
      ifYouAreLosing();
    }
/////////////////////////////////////////////////////////////////////////////

function ifYouAreLosing() {
  console.log("Letter not found: " + clickedLetter);
  initiateImage();

  if (currentImageIndex < images.length) {
    setCookie("imagePath", images[currentImageIndex], 1);
    lastfail = images[currentImageIndex];
    
    let imageofword = document.getElementById("imageword");

    imageofword.src = lastfail;

  } else {
    lose();
  }
}


  function ifYouAreWinning(){
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i].toLowerCase() === lowercasedClickedLetter) {
        underscores = underscores.split(' ');
        underscores[i] = clickedLetter;
        underscores = underscores.join(' ');
        answarefinal = underscores.replace(/ /g, '');

      }
    }
    setCookie("underscores", underscores, 1);
    paragraphElement.innerHTML = getCookie("underscores");
    console.log(getCookie("underscores"));

    win();
  }

    function lose(){
      currentImageIndex[0];

      finalcontnenttext();
      endtittle.textContent = ""+playerName+" you lost!";
      restartcookies();
    }

timetotal
    function win(){
      let timetotaluser=document.getElementById("timetotal");
      if(randomWord.toLowerCase() === answarefinal.toLowerCase()){
        elapsedTime = (Date.now() - startTime) / 1000;
        console.log(elapsedTime.toFixed(2));
        timetotaluser.textContent = "You did it in "+elapsedTime.toFixed(2)+" seconds!";
        finalcontnenttext();
        endtittle.textContent = ""+playerName+" you won!";

saveGameStats(randomWord, playerName, elapsedTime, currentImageIndex);

getAndDisplayRanking(randomWord);

        restartcookies();
      }
    }

    function finalcontnenttext(){
      winlose.style.display='flex';
      answare.style.display='none';
      completeword.style.display='none';
      wordinfodom.innerHTML=wordInfo;
      imageofword.src = wordimage;
      randomword.textContent = "The word was "+randomWord+" .";
    }

   }
   
function restartcookies(){
  document.cookie = "currentImageIndex=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "randomWord=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "underscores=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "selectedLetters=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  initiateImage();

}

   function restart(){
    resetGameState();
    restartcookies();
    location.reload();
    localStorage.removeItem("clickedLetters");
   }



   
  
  //              ^ How does this work ( about array itiniration and underscores)^:

  //In JavaScript, text strings are immutable, you can't change an individual character directly.  

  //split(): transforms the string into an array, then we change any element of the array. 
  //In this case, replacing an underscore with the letter

  //After making changes to the array, you can convert the array back to a string with the join() method.

  function applyStylesIfUserEntered() {

   imagePath = setCookie("imagePath",lastfail,1);
    const hasEntered = getCookie('userEntered');

    if (hasEntered) {

   
      gameStart();
    }
}

function saveGameStats(word, playerName, elapsedTime, errorCount) {
  // Retrieve old data or initialize an empty array if there is no data by word id
  let rankings = JSON.parse(localStorage.getItem(word)) || [];

  // Add a new entry to the ranking
  rankings.push({ playerName, elapsedTime, errorCount });

  // elapsed time (ascending)
  rankings.sort(function(a, b) {
    if (a.errorCount === b.errorCount) {
      return a.elapsedTime - b.elapsedTime; 
    }
    return a.errorCount - b.errorCount; 
  });
  
  // top 3 
  rankings.splice(3);

  // Save the updated ranking to local storage
  localStorage.setItem(JSON.stringify(rankings));
}




function getAndDisplayRanking(word) {
  const rankings = JSON.parse(localStorage.getItem(word));
  const rankingContainer = document.getElementById('ranking-container');
  const rankingBody = document.getElementById('ranking-body');

  // Clear previous content
  rankingBody.innerHTML = '';

  if (rankings && rankings.length > 0) {
    for (let i = 0; i < rankings.length; i++) {
      const entry = rankings[i];
      const row = document.createElement('tr');
      row.innerHTML = '<td>' + (i + 1) + '</td><td>' + entry.playerName + '</td><td>' + entry.elapsedTime + 's</td><td>' + entry.errorCount + '</td>';
      rankingBody.appendChild(row);
    }

  } else {
    // Hide the container if there is no ranking data
    rankingContainer.style.display = 'none';
  }
}


var rankingContainer = document.getElementById("ranking-container");
var rankingtable = document.getElementById("ranking-table");

rankingContainer.style.display = "none";
rankingtable.style.display = "none";


function showRanking() {
        rankingContainer.style.display = "block";
        rankingtable.style.display = "block";

}


function changename() {
  let newPlayerName = prompt("Enter your new name:");

  // Verifica si el usuario ingresó un nombre
  if (newPlayerName !== null) {
    // Establece el valor de la cookie 'playername' con el nuevo nombre
    setCookie("playername", newPlayerName, 1);
  }

  saveGameStats(randomWord, newPlayerName, 0, 0);

}





applyStylesIfUserEntered();

  LetKeys();

initiateImage();
