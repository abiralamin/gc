const targetDate = new Date("2027-02-10T00:00:00");

const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const messageElement = document.getElementById("message");

function formatValue(value) {
  return String(value).padStart(2, "0");
}

function getTimeLeftWithMonths(now, endDate) {
  let months = (endDate.getFullYear() - now.getFullYear()) * 12;
  months += endDate.getMonth() - now.getMonth();

  const anchor = new Date(now);
  anchor.setMonth(anchor.getMonth() + months);

  if (anchor > endDate) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }

  const remainingMs = endDate.getTime() - anchor.getTime();
  const remainingSeconds = Math.floor(remainingMs / 1000);

  const days = Math.floor(remainingSeconds / (24 * 60 * 60));
  const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
  const seconds = remainingSeconds % 60;

  return { months, days, hours, minutes, seconds };
}

function updateCountdown() {
  const now = new Date();
  const distance = targetDate.getTime() - now.getTime();

  if (distance <= 0) {
    monthsElement.textContent = "00";
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    messageElement.textContent = "🎓 Congratulations! Graduation day is here!";
    return;
  }

  const { months, days, hours, minutes, seconds } = getTimeLeftWithMonths(
    now,
    targetDate,
  );

  monthsElement.textContent = String(months);
  daysElement.textContent = String(days);
  hoursElement.textContent = formatValue(hours);
  minutesElement.textContent = formatValue(minutes);
  secondsElement.textContent = formatValue(seconds);
  messageElement.textContent = "";
}

updateCountdown();
setInterval(updateCountdown, 1000);
