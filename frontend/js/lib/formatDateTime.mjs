export default function formatDateTime(date) {
  const dateCreated = new Date(date);
  const year = dateCreated.getFullYear();
  const month = dateCreated.getMonth();
  const day = dateCreated.getDate();
  const hours = dateCreated.getHours();
  const minutes = dateCreated.getMinutes();

  const addZero = (num) => (num < 10 ? `0${num}` : num);

  const formattedDate = `${year}.${addZero(month)}.${addZero(day)}`;
  const formattedTime = `${addZero(hours)}:${addZero(minutes)}`;

  return { formattedDate, formattedTime };
}
