const hangmanImageDiv = document.getElementById("Hangmanimage");
var images = ['images/hangman7.png','images/hangman6.png','images/hangman5.png','images/hangman4.png','images/hangman3.png','images/hangman2.png','images/hangman.png'];
let currentImageIndex = 0;
var answare = document.getElementById("auxwordansware");
let randomArrayIndex = Math.floor(Math.random() * 3);
let randomWord;
let playerName;
let usernameInput = document.getElementById("username");
let playerNameParagraph = document.getElementById("playername");
const fruitsArray = ["apple","orange","banana","grape","kiwi","mango","strawberry","watermelon","pineapple","pear","cherry","peach"];
const fruitInfoArray = [
   "Apples are a type of fruit that grow on trees.",
   "Oranges are large, orange fruits that are commonly grown in Florida.",
   "Bananas are long, yellow, edible fruits that are native to Southeast Asia.",
   "Grapes are a type of berry that grow in clusters.",
   "Kiwis are small, hairy fruits that are native to New Zealand.",
   "Mangoes are tropical fruits that have a soft pulpy flesh.",
   "Strawberries are small, sweet, and tangy fruits.",
   "Watermelons are large, juicy, and sweet fruits.",
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
  'images/imageswords/Fruit/watermelon.jpg',
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
const countriesArray = ["USA","Canada","France","Japan","Australia","Brazil","India","Mexico","Germany","Spain","Russia","Italy"];
const countryInfoArray = [
  "The United States is the third largest country by land area.",
  "Canada is the second largest country by land area.",
  "France is known for its fine food, fashion, and culture.",
  "Japan is known for its technology, cars, and anime.",
  "Australia is known for its wildlife and natural beauty.",
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
  'images/imageswords/country/Australia.jpg',
  'images/imageswords/country/Brazil.jpg',
  'images/imageswords/country/India.jpg',
  'images/imageswords/country/Mexico.jpg',
  'images/imageswords/country/Germany.jpg',
  'images/imageswords/country/Spain.jpg',
  'images/imageswords/country/Russia.jpg',
  'images/imageswords/country/Italy.jpg'
];

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
  setCookie("currentImageIndex", currentImageIndex, 1);
  setCookie("randomWord", randomWord, 1);
  setCookie("selectedLetters", JSON.stringify(selectedLetters), 1);
}

// Function to reset game state
function resetGameState() {
  currentImageIndex = 0;
  randomWord = getRandomWord(countriesArray);
  if(getCookie("underscores")==""){
    underscores = "_ ".repeat(randomWord.length);
  }else{
    underscores=getCookie("underscores");
  }
}
/////////////////////////////////////////////////////////////////////////////////

function startfunct(){
  let savedPlayerName = getCookie("playername");

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
}


  function updatePlayerName() {
    let username = usernameInput.value;
   

    if(username !==""){
      playerNameParagraph.textContent = "Player: " + username;
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
    if (countriesArray.includes(word.toLowerCase())) {
      return "Country";
    } else if (fruitsArray.includes(word.toLowerCase())) {
      return "Fruit";
    } else if (colorsArray.includes(word.toLowerCase())) {
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


function initiateImage() {
    const imagePath = images[currentImageIndex];

    const imgElement = document.createElement('img');
    imgElement.src = imagePath;
    imgElement.alt = 'Hangman';
    hangmanImageDiv.innerHTML = '';
    hangmanImageDiv.appendChild(imgElement);
}

function gameStart() {
  saveGameState();

    var btnstart = document.getElementById('playbtn');
    btnstart.style.display = 'none';
    var WordAndAnswareCont = document.getElementById('WordAndAnswareCont');
    WordAndAnswareCont.style.display='block';
    var userform = document.getElementById('userform');
    userform.style.display='none';
    var userform = document.getElementById('playername');
    userform.style.display='block';
    var letterscont = document.getElementById('letterscont');
    letterscont.style.display='block';
    

    initiateImage();
    updateUnderscores();
}

function LetKeys() {
    const lettersCont = document.getElementById("letterscont");
    for (let charCode = 65; charCode <= 90; charCode++) { //charCode <= 90: The loop continues as long as the charCode is less than or equal to 'Z', which is 90.

      const letter = String.fromCharCode(charCode);
      const letterButton = document.createElement("button");
      letterButton.textContent = letter;
      letterButton.classList.add("letter-btn");//transforms the char into string of the letter and creates a button

      letterButton.addEventListener("click", function() {
        letterButton.disabled=true;
        letterButton.style.backgroundColor="grey";
        checkLetterInWord(letter);
      });
      lettersCont.appendChild(letterButton);
    }
  }

  function checkLetterInWord(clickedLetter) {
    const lowercasedRandomWord = randomWord.toLowerCase();
    const lowercasedClickedLetter = clickedLetter.toLowerCase();
    var winlose = document.getElementById("winlose");
    var endtittle = document.getElementById("endtittle");
    var randomword = document.getElementById("randomwordfinal");
    var wordinfodom = document.getElementById('wordinfo');
    var completeword = document.getElementById("randomword");
    let imageofword = document.getElementById("imageword");
    var answarefinal;
   
    if (lowercasedRandomWord.includes(lowercasedClickedLetter)) {
      ifYouAreWinning();
    } else {
      ifYouAreLosing();
    }
/////////////////////////////////////////////////////////////////////////////

  function ifYouAreLosing(){
    console.log("Letter not found: " + clickedLetter);
    currentImageIndex++; // Increment the image index
    if (currentImageIndex < images.length) {
      initiateImage();
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
      finalcontnenttext();
      endtittle.textContent = ""+playerName+" you lost!";
    }

    function win(){
      if(randomWord.toLowerCase() === answarefinal.toLowerCase()){
        finalcontnenttext();
        endtittle.textContent = ""+playerName+" you won!";
        document.cookie = "randomWord=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "currentImageIndex=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "underscores=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "selectedLetters=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
   
   function restart(){
    resetGameState();

    location.reload();
    
   }

 



   
  
  //              ^ How does this work ( about array itiniration and underscores)^:

  //In JavaScript, text strings are immutable, you can't change an individual character directly.  

  //split(): transforms the string into an array, then we change any element of the array. 
  //In this case, replacing an underscore with the letter

  //After making changes to the array, you can convert the array back to a string with the join() method.

  LetKeys();
initiateImage();
