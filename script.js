const inputField = document.getElementById("bday-date");
const resultElement = document.getElementById("result");
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

function getDefaultDate(currentDate) {
  //we need to default value for the input field
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const parsedMonth = parseDateToStr(month);
  const date = currentDate.getDate();
  const parsedDate = parseDateToStr(date);

  return `${year}-${parsedMonth}-${parsedDate}`;
}

function pasteMinMaxValueDate() {
  const currentDate = new Date();

  const minDateStr = getMinOrMaxDate(currentDate);
  const maxDateStr = getMinOrMaxDate(currentDate, false);
  const valueStr = getDefaultDate(currentDate);

  inputField.min = minDateStr;
  inputField.max = maxDateStr;
  inputField.value = valueStr;
}

window.addEventListener("load", pasteMinMaxValueDate);

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
    // if b-day has already passed in the current year
    nextYearBday = new Date(date);
    nextYearBday.setFullYear(date.getFullYear() + 1);
    diff = nextYearBday.getTime() - date.getTime();
  } else {
    // if b-day hasn't passed yet
    diff = date.getTime() - now.getTime();
  }

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

function calcAndPasteResult(event) {
  event.preventDefault();
  const bDay = new Date(Date.parse(inputField.value));

  const daysLeft = calculateDays(bDay);

  const declension = getDeclension(daysLeft);
  const strToPaste = `${daysLeft} ${declension}`;
  resultElement.textContent = strToPaste;
}

calculateBtn.addEventListener("click", calcAndPasteResult);
