const currentDate = new Date();
const elements = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
export const daysOfMonth = elements.map((element, i) => (31-i));

export const getCurrentYear = () => currentDate.getFullYear();
export const getCurrentMonth = () => (currentDate.getMonth()+1);
export const getCurrentDayOfMonth = () => currentDate.getDate();
export const getCurrentDayOfWeekStartingSunday = () => (currentDate.getDay()+1);

export const getDateFromTimestamp = timestamp => new Date(timestamp.seconds * 1000);

export const getDateString = dateParam => {
  const date = dateParam ? dateParam : new Date();
  const yearString = date.getFullYear();
  const monthString = (date.getMonth()+1).toString().padStart(2, '0');
  const dayString = (date.getDay()+1).toString().padStart(2, '0');
  
  return `${yearString}-${monthString}-${dayString}`;
}