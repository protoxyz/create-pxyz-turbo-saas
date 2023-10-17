export function ageFromDob(dob: Date | null | undefined) {
  if (!dob) return null;
  const diff = Date.now() - dob.getTime();
  const age = new Date(diff);

  return Math.abs(age.getUTCFullYear() - 1970);
}

export function ageToDateOfBirth(age: number | null | undefined) {
  if (!age) return null;

  const date = new Date();

  date.setFullYear(date.getFullYear() - age);
  date.setHours(0, 0, 0, 0);
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
  date.setDate(0);

  return date;
}
