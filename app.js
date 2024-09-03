/* DOM Elements */
const passResultField = document.querySelector("#passResult");
const includeUppercaseCharsInput = document.querySelector("#includeUppercase");
const includeLowercaseCharsInput = document.querySelector("#includeLowercase");
const includeNumCharsInput = document.querySelector("#includeNumbers");
const includeSymbolsInput = document.querySelector("#includeSymbols");
const charLengthInput = document.querySelector("#charLength");
const charLengthValueEl = document.querySelector(".char_length--value");
const passStrengthType = document.querySelector(".strength_type");
const passStrengthIndicator = document.querySelector(".strength_indicator");
const copyBtn = document.querySelector("#copy-btn");
const copyToastEl = document.querySelector(".result_copy > span");
const submitBtn = document.querySelector("#submit-btn");

/* Global Vars */
let generatedPassword = "",
  includeOptions = 0;
const passStrengthMap = {
  1: { label: "Too Weak", className: "strength-tooweak" },
  2: { label: "Weak", className: "strength-weak" },
  3: { label: "Medium", className: "strength-medium" },
  4: { label: "Strong", className: "strength-strong" },
};

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

/* Generate Random Characters function */
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

/* Checkbox Event Listeners */
includeUppercaseCharsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(upperCaseAlphabets);
    includeOptions += 1;
    passStrengthType.textContent = passStrengthMap[includeOptions].label;
  } else {
    possibleChars = possibleChars.filter(
      (chars) => !upperCaseAlphabets.includes(chars)
    );
    includeOptions -= 1;
    includeOptions > 0
      ? (passStrengthType.textContent = passStrengthMap[includeOptions].label)
      : (passStrengthType.textContent = "");
  }
});

includeLowercaseCharsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(lowerCaseAlphabets);
    includeOptions += 1;
    passStrengthType.textContent = passStrengthMap[includeOptions].label;
  } else {
    possibleChars = possibleChars.filter(
      (chars) => !lowerCaseAlphabets.includes(chars)
    );
    includeOptions -= 1;
    includeOptions > 0
      ? (passStrengthType.textContent = passStrengthMap[includeOptions].label)
      : (passStrengthType.textContent = "");
  }
});

includeNumCharsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(numbers);
    includeOptions += 1;
    passStrengthType.textContent = passStrengthMap[includeOptions].label;
  } else {
    possibleChars = possibleChars.filter((chars) => !numbers.includes(chars));
    includeOptions -= 1;
    includeOptions > 0
      ? (passStrengthType.textContent = passStrengthMap[includeOptions].label)
      : (passStrengthType.textContent = "");
  }
});

includeSymbolsInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    possibleChars = possibleChars.concat(symbols);
    includeOptions += 1;
    passStrengthType.textContent = passStrengthMap[includeOptions].label;
  } else {
    possibleChars = possibleChars.filter((chars) => !symbols.includes(chars));
    includeOptions -= 1;
    includeOptions > 0
      ? (passStrengthType.textContent = passStrengthMap[includeOptions].label)
      : (passStrengthType.textContent = "");
  }
});

document.querySelectorAll('input[type="checkbox"]').forEach((each) => {
  each.addEventListener("change", (e) => {
    if (e.target.checked) {
      for (let i = 0; i < includeOptions; i++) {
        passStrengthIndicator.children[i].classList = [
          passStrengthMap[includeOptions].className,
        ];
      }
    } else {
      passStrengthIndicator.children[includeOptions].classList = [];
      for (let i = 0; i < includeOptions; i++) {
        passStrengthIndicator.children[i].classList = [
          passStrengthMap[includeOptions].className,
        ];
      }
    }
    console.log(passStrengthIndicator.children);
  });
});

/* Copy to Clipboard */
copyBtn.addEventListener("click", () => {
  copyToastEl.style.opacity = "1";
  setTimeout(() => {
    document.querySelector(".result_copy > span").style.opacity = "0";
  }, 5000);

  navigator.clipboard.writeText(generatedPassword);
});

/* Submit Button Listener */
submitBtn.addEventListener("click", () => {
  if (charLengthInput.value) {
    generatedPassword = getRandomChars(
      parseInt(charLengthInput.value),
      possibleChars.length
    ).join("");
    passResultField.value = generatedPassword;
  }

  if (includeOptions === 0) {
    window.alert("Please choose either of the options to include");
  }
});

/* Range Input Listener */
charLengthInput.addEventListener("input", () => {
  const min = charLengthInput.min;
  const max = charLengthInput.max;
  const currentVal = charLengthInput.value;
  charLengthValueEl.textContent = currentVal;

  charLengthInput.style.backgroundSize =
    ((currentVal - min) / (max - min)) * 100 + "% 100%";
});
