const typingText = document.querySelector(".typing-text p"), // calling out the text using queryselector.
inpField = document.querySelector(".input-field"); // it gets merged with the content in the typing speed box.
timetag = document.querySelector(".time span"); // working on the timer tag.
ErrorTag = document.querySelector(".Errors span"); // showing the erros in the typing box.
wpmTag = document.querySelector(".WPM span"); // working on count per limit. 
cpmTag = document.querySelector(".CPM span"); // working on word per limit.
tryBtn = document.querySelector("button"); // working on try again button.

let timer,
  maxTime = 45,
  timeLeft = maxTime,
  charIndex = (Errors = isTyping = 0); // this line sets the charindex, errors and isTyping to 0. isTyping is set to 0, so that it won't restart again on every click.

// For adding Random Paragraphs.
function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length); // here I splited every character and then added it to a span tag and again stored the same in a span tag. Using the for each function I called out each element in the array.
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inpField.focus()); // focuing the event as the user presses the any key
  typingText.addEventListener("click", () => inpField.focus()); // focusing the event as the user clicks
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  // the user wont be able to write after the time ends.
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      charIndex--; // if the user have backspaced or inserted any character.
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        //here I used if and else statements to show the errors, if the user name is typing the correct text it should print correct otherwise inccorect.
        characters[charIndex].classList.add("correct");
      } else {
        Errors++;
        characters[charIndex].classList.add("incorrect"); // classList property returns css elements.
      }
      charIndex++; // incremented the characters so that the computer checks if the user has written correct letters.
    }
    characters.forEach((span) => span.classList.remove("active")); // removing span tag from all span and adding it to span tag only.
    characters[charIndex].classList.add("active"); // adding css class using classList property.

    // Setting the Word Per Limit.
    let WPM = Math.round(
      ((charIndex - Errors) / 5 / (maxTime - timeLeft)) * 60
    );
    //to calculate wpm, we first have to substract total errors from total type characters then dividing it by 5 and then dividing the result by susbstracting timeleft from maxtime and lastly multiplying the by 30.
    // setting wpm value to 0 if not done will show inifinity or 0.
    WPM = WPM < 0 || !WPM || WPM === Infinity ? 0 : WPM;

    ErrorTag.innerText = Errors;
    wpmTag.innerText = WPM;

    // Setting up the Count per limit.
    cpmTag.innerText = charIndex - Errors; // calculating the Count per limit.
  }
}

// Setting the Timer.
function initTimer() {
  // if time left is greater than 0 then decrement the time limit else clear the time.
  if (timeLeft > 0) {
    timeLeft--;
    timetag.innerText = timeLeft;
  } else {
    clearInterval(timer);
    initTyping();
  }
}

// Reseting the Game.
function resetGame() {
  // setting each variable and element to deafault.
  inpField.value = ""; // this enables the user to write futher.
  clearInterval(timer); // clear Interval is used to stop the time.
  randomParagraph();
  (timeLeft = maxTime), (charIndex = Errors = isTyping = 0);
  timetag.innerText = timeLeft;
  ErrorTag.innerText = Errors;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

randomParagraph(); // calling out the randomparagraph function.
inpField.addEventListener("input", initTyping);
tryBtn.addEventListener("click", resetGame);
