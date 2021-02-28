// Set the grid for the letters (11x11)
// prettier-ignore
const grid = [
    'I','T','X','I','S','X','X','T','E','N','X',
    'A','X','Q','U','A','R','T','E','R','X','X',
    'T','W','E','N','T','Y','-','F','I','V','E',
    'H','A','L','F','X','P','A','S','T','X','X',
    'T','O','X','O','N','E','X','T','W','O','X',
    'T','H','R','E','E','X','F','O','U','R','X',
    'F','I','V','E','X','S','I','X','X','X','X',
    'S','E','V','E','N','X','E','I','G','H','T',
    'N','I','N','E','X','T','W','E','L','V','E',
    'T','E','N','X','E','L','E','V','E','N','X',
    'O',"'",'C','L','O','C','K','•','•','•','•'];

// Set start and end positions for the words
const words = {
  // Hours
  1: [47, 49],
  2: [51, 53],
  3: [55, 59],
  4: [61, 64],
  5: [66, 69],
  6: [71, 73],
  7: [77, 81],
  8: [83, 87],
  9: [88, 91],
  10: [99, 101],
  11: [103, 108],
  12: [93, 98],
  // Words
  it: [0, 1],
  is: [3, 4],
  five: [29, 32],
  ten: [7, 9],
  aquarter: [11, 19],
  twenty: [22, 27],
  twentyfive: [22, 32],
  half: [33, 36],
  past: [38, 41],
  to: [44, 45],
  oclock: [110, 116],
  // Dots
  dotOne: [117, 117],
  dotTwo: [118, 118],
  dotThree: [119, 119],
  dotFour: [120, 120],
};

const htmlLetters = document.querySelector('.letters');
const letter = htmlLetters.childNodes;

// Add letters into html
grid.map((letter) => {
  htmlLetters.insertAdjacentHTML('beforeend', `<div class='letter'>${letter}</div>`);
});

function setActive(word) {
  for (i = word[0]; i <= word[1]; i++) {
    if (i !== 12) letter[i].classList.add('active'); // Removes the X in 'A quarter'
  }
}

function setWords() {
  // Reset the words, so they don't stack up
  letter.forEach((htmlLetter) => {
    if (htmlLetter.classList.contains('active')) {
      htmlLetter.classList.remove('active');
    }
  });

  setActive(words.it);
  setActive(words.is);

  const date = new Date();
  let minute = date.getMinutes();
  let hour = date.getHours();

  // Set the minutes per 5 minutes
  const minuteDot = minute % 5;
  minute = minute - (minute % 5);

  // Set the hours to a 12 hour notation
  hour = hour % 12;
  hour = hour ? hour : 12; // If the hour is 0, set it to 12

  // Set the word per 5 minutes
  switch (minute) {
    case 5:
    case 55:
      setActive(words.five);
      break;
    case 10:
    case 50:
      setActive(words.ten);
      break;
    case 15:
    case 45:
      setActive(words.aquarter);
      break;
    case 20:
    case 40:
      setActive(words.twenty);
      break;
    case 25:
    case 35:
      setActive(words.twentyfive);
      break;
    case 30:
      setActive(words.half);
    default:
      setActive(words.oclock);
      break;
  }

  // Set the minute indicator(s)
  if (minuteDot >= 1) setActive(words.dotOne);
  if (minuteDot >= 2) setActive(words.dotTwo);
  if (minuteDot >= 3) setActive(words.dotThree);
  if (minuteDot >= 4) setActive(words.dotFour);

  if (minute < 35) {
    // Ignore past and to when it is exactly half and full
    if (minute !== 0) setActive(words.past);
  } else {
    setActive(words.to);
    hour = hour === 12 ? 1 : hour + 1; // If it is 11:40 you would see "twenty to twelve"
  }

  // Set hour word
  setActive(words[hour]);
}

// Display the words
setWords();
setInterval(() => setWords(), 1000);
