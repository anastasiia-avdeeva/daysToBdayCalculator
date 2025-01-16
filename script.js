const inputField = document.getElementById("bday-date");
const resultElement = document.getElementById("result");
const calculateBtn = document.getElementById("calculateBtn");

function getMinOrMaxDate(currentDate, min = true) {
  const currentYear = currentDate.getFullYear();

  if (min) {
    return `${currentYear}-01-01`;
  } else {
    return `${currentYear}-12-31`;
  }
}

function parseDateToStr(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function getDefaultDate(currentDate) {
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
  const forms = ["день", "дня", "дней"];

  if (number >= 5 && number <= 20) {
    return forms[2];
  }

  const lastDigit = Number(toString(number)[-1]);

  if (lastDigit == 1) {
    return forms[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
  } else {
    return forms[2];
  }
}

function pasteResult(days) {
  resultElement.textContent = days;
}

function test(event) {
  event.preventDefault();
  const bDay = new Date(Date.parse(inputField.value));
  //   console.log(bDay);
  const days = calculateDays(bDay);
  //   console.log(days);

  pasteResult(days);
}

calculateBtn.addEventListener("click", test);
