const passLengthInput = document.querySelector("#length");
const includeUppercaseCharsInput = document.querySelector("#includeUppercase");
const includeLowercaseCharsInput = document.querySelector("#includeLowercase");
const includeNumCharsInput = document.querySelector("#includeNumbers");
const includeSymbolsInput = document.querySelector("#includeSymbols");
const submitBtn = document.querySelector("#submitBtn");

const upperCaseAlphabets = [...Array(26).keys()].map((i) =>
  String.fromCharCode(i + 97).toUpperCase()
);
const lowerCaseAlphabets = [...Array(26).keys()].map((i) =>
  String.fromCharCode(i + 97)
);
const symbols = [..."~!@#$%^&*-_="];
const numbers = [...Array(10).keys()];
let possibleChars = [];

function getRandomChars(quantity, max) {
  const arr = [];
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

submitBtn.addEventListener("click", () => {
  if (passLengthInput.value) {
    console.log(
      getRandomChars(
        parseInt(passLengthInput.value),
        possibleChars.length
      ).join("")
    );
  }
});
