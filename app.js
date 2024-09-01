/* DOM Elements */
const passLengthInput = document.querySelector("#length");
const includeUppercaseCharsInput = document.querySelector("#includeUppercase");
const includeLowercaseCharsInput = document.querySelector("#includeLowercase");
const includeNumCharsInput = document.querySelector("#includeNumbers");
const includeSymbolsInput = document.querySelector("#includeSymbols");
const charLengthInput = document.querySelector("#charLength");
const charLengthValueEl = document.querySelector(".char_length--value");
const submitBtn = document.querySelector("#submit-btn");

/* Necessary variables */
const upperCaseAlphabets = [...Array(26).keys()].map((i) =>
  String.fromCharCode(i + 97).toUpperCase()
);
const lowerCaseAlphabets = [...Array(26).keys()].map((i) =>
  String.fromCharCode(i + 97)
);
const symbols = [..."~!@#$%^&*-_="];
const numbers = [...Array(10).keys()];
let possibleChars = [];

/* Logic Functions */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomChars(quantity, max) {
  const arr = [];
  possibleChars = shuffleArray(possibleChars);
  console.log("Possible Chars: ", possibleChars);
  while (arr.length < quantity) {
    var index = Math.floor(Math.random() * max);
    if (arr.indexOf(index) === -1) {
      arr.push(possibleChars[index]);
    }
  }
  return arr;
}

includeUppercaseCharsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(upperCaseAlphabets);
  } else {
    possibleChars = possibleChars.filter(
      (chars) => !upperCaseAlphabets.includes(chars)
    );
  }
});

includeLowercaseCharsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(lowerCaseAlphabets);
  } else {
    possibleChars = possibleChars.filter(
      (chars) => !lowerCaseAlphabets.includes(chars)
    );
  }
});

includeNumCharsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(numbers);
  } else {
    possibleChars = possibleChars.filter((chars) => !numbers.includes(chars));
  }
});

includeSymbolsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(symbols);
  } else {
    possibleChars = possibleChars.filter((chars) => !symbols.includes(chars));
  }
});

/* submitBtn.addEventListener("click", () => {
  if (passLengthInput.value) {
    console.log(
      getRandomChars(
        parseInt(passLengthInput.value),
        possibleChars.length
      ).join("")
    );
  }
}); */

charLengthInput.addEventListener("input", () => {
  const min = charLengthInput.min;
  const max = charLengthInput.max;
  const currentVal = charLengthInput.value;
  charLengthValueEl.textContent = currentVal;

  charLengthInput.style.backgroundSize =
    ((currentVal - min) / (max - min)) * 100 + "% 100%";
});
