const currencyIcon = (curr) => {
    let curIcon;
    switch (curr) {
        case "EUR":
            curIcon = "€";
            break;
        case "USD":
            curIcon = "$";
            break;
        default:
            curIcon = null;
    }
    return curIcon;
}
const calculateABSTime = (firstTime, secTime) => {
    function parseTime(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return new Date(0, 0, 0, hours, minutes, seconds);
    }
    const depTimeObj = parseTime(firstTime);
    const arrTimeObj = parseTime(secTime);
    const timeDifference = Math.abs(arrTimeObj - depTimeObj);
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    return hours + " saat " + minutes + " dakika"
}
const formatLocalDate = (inputDate) => {
    if (!inputDate) {
      return "Geçersiz tarih";
    }
  
    const dateObject = new Date(inputDate);
  
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat(undefined, options).format(dateObject);
  
    return formattedDate;
  };
export {currencyIcon,calculateABSTime,formatLocalDate};
