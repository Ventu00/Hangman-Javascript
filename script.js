const hangmanImageDiv = document.getElementById("Hangmanimage");

var images = [
    'images/hangman7.png',
    'images/hangman6.png',
    'images/hangman5.png',
    'images/hangman4.png',
    'images/hangman3.png',
    'images/hangman2.png',
    'images/hangman.png'
];

let currentImageIndex = 0;

const fruitsArray = [
    "apple",
    "orange",
    "banana",
    "grape",
    "kiwi",
    "mango",
    "strawberry",
    "watermelon",
    "pineapple",
    "pear",
    "cherry",
    "peach"
  ];
  


const colorsArray = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
    "teal",
    "maroon",
    "cyan"
  ];

 const countriesArray = [
    "USA",
    "Canada",
    "France",
    "Japan",
    "Australia",
    "Brazil",
    "India",
    "Mexico",
    "Germany",
    "Spain",
    "Russia",
    "Italy",
  ];

  function startfunct(){
    gameStart();
  }

  function updatePlayerName() {
    const usernameInput = document.getElementById("username");

    const username = usernameInput.value;

    const playerNameParagraph = document.getElementById("playername");
    playerNameParagraph.textContent = "Player: " + username;
  }

  function getRandomWord(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const paragraphElement = document.getElementById("randomword");
  const answare = document.getElementById("auxwordansware");

  const randomWord = getRandomWord(countriesArray);
  underscores = "_ ".repeat(randomWord.length);
  paragraphElement.innerHTML = underscores;
  answare.innerHTML = randomWord;

  function updateUnderscores() {
    underscores = "_ ".repeat(randomWord.length);
    paragraphElement.innerHTML = underscores;
    answare.innerHTML = randomWord;

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
    updatePlayerName();

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

    randomWord = getRandomWord(countriesArray);
    updateUnderscores();
    answare.innerHTML = randomWord;
}



function fillAlphabet() {
    const lettersCont = document.getElementById("letterscont");
    for (let charCode = 65; charCode <= 90; charCode++) { //charCode <= 90: The loop continues as long as the charCode is less than or equal to 'Z', which is 90.

      const letter = String.fromCharCode(charCode);
      const letterButton = document.createElement("button");
      letterButton.textContent = letter;
      letterButton.classList.add("letter-btn");

      letterButton.addEventListener("click", function() {
        letterButton.style.display='none';
        checkLetterInWord(letter);
      });
      lettersCont.appendChild(letterButton);
    }
  }

  function checkLetterInWord(clickedLetter) {
    const lowercasedRandomWord = randomWord.toLowerCase();
    const lowercasedClickedLetter = clickedLetter.toLowerCase();
  
    if (lowercasedRandomWord.includes(lowercasedClickedLetter)) {
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i].toLowerCase() === lowercasedClickedLetter) {
          underscores = underscores.split(' ');
          underscores[i] = clickedLetter;
          underscores = underscores.join(' ');
        }
      }
      paragraphElement.innerHTML = underscores;
    } else {
      console.log("Letter not found: " + clickedLetter);
      currentImageIndex++; // Increment the image index
      if (currentImageIndex < images.length) {
        initiateImage();
      } else {
        console.log("Game over!"); // Handle game over logic here
        alert('Game Over')
      }
    }
  }
  

  //              ^ How does this work ^:

  //In JavaScript, text strings are immutable, you can't change an individual character directly.  

  //split(): transforms the string into an array, then we change any element of the array. 
  //In this case, replacing an underscore with the letter

  //After making changes to the array, you can convert the array back to a string with the join() method.

fillAlphabet();

initiateImage();
