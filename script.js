const inputField = document.getElementById("bday-date");
const main = document.getElementById("content");
const resultParagraph = document.getElementById("resultParagraph");
const resultElement = document.getElementById("result");
const paragraphs = document.getElementsByTagName("p");
const calculateBtn = document.getElementById("calculateBtn");

function getMinOrMaxDate(currentDate, min = true) {
  const currentYear = currentDate.getFullYear();

  if (min) {
    // min possible date is 1st of Jan current year
    return `${currentYear}-01-01`;
  } else {
    //max possible date is the last day current year
    return `${currentYear}-12-31`;
  }
}

function parseDateToStr(number) {
  // we need numbers less than 10 with preceding 0
  return number < 10 ? `0${number}` : `${number}`;
}

function pasteMinMaxValueDate() {
  const currentDate = new Date();

  const minDateStr = getMinOrMaxDate(currentDate);
  const maxDateStr = getMinOrMaxDate(currentDate, false);

  inputField.min = minDateStr;
  inputField.max = maxDateStr;
}

window.addEventListener("load", pasteMinMaxValueDate);

function createAndPasteInformElem(message) {
  resultParagraph.style.display = "none";
  const informElem = document.createElement("p");
  informElem.textContent = message;
  informElem.style.color = "red";
  informElem.style.fontSize = "25px";
  main.append(informElem);
}

function calculateDays(date) {
  const now = new Date();
  let nextYearBday;
  let diff;

  //get rid of hours
  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  //check if b-day is today and return 0 day difference
  if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth()) {
    return 0;
  }

  if (now.getTime() > date.getTime()) {
    // if b-day has already passed in the current year, change year to next one
    date.setFullYear(date.getFullYear() + 1);
  }

  diff = date - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
}

function getDeclension(number) {
  //to make grammatically right output we need to find out the right declension of the word "день"
  const forms = ["день", "дня", "дней"];

  if (number >= 5 && number <= 20) {
    return forms[2];
  }

  const lastDigit = Number(number.toString().slice(-1));

  if (lastDigit == 1) {
    return forms[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
  } else {
    return forms[2];
  }
}

function deleteInformElem() {
  if (paragraphs.length > 1) {
    paragraphs[1].remove();
  }
}

function calcAndPasteResult(event) {
  event.preventDefault();

  if (!inputField.value) {
    if (paragraphs.length < 2) {
      const message = "Пожалуйста, введите дату рождения!";
      createAndPasteInformElem(message);
    }
    return;
  }

  const bDay = new Date(Date.parse(inputField.value));

  const daysLeft = calculateDays(bDay);

  const declension = getDeclension(daysLeft);
  const strToPaste = `${daysLeft} ${declension}`;

  deleteInformElem();
  resultParagraph.style.display = "block";
  resultElement.textContent = strToPaste;
  inputField.value = "";
}

calculateBtn.addEventListener("click", calcAndPasteResult);
