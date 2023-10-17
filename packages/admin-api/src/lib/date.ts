// This function is used to create a date object N days ago
export function getNDaysAgo(days = 30) {
  const date = new Date();
  date.setDate(date.getDate() - days + 1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

// This function is used to compare two dates
export function dateIsTheSame(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function minutesFromNow(minutes = 10) {
  return new Date(Date.now() + 1000 * 60 * minutes);
}
