const inputField = document.getElementById("bday-date");

function getMinOrMaxDate(currentDate, min=true) {
    const currentYear = currentDate.getFullYear();

    if (min) {
        return `${currentYear}-01-01`;
    } else {
        return `${currentYear}-12-31`;
    }
}

function getDefaultDate(currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const parsedMonth = month < 10 ? `0${month}` : `${month}`;
    const date = currentDate.getDate();
    const parsedDate = date < 10 ? `0${date}` : `${date}`;

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