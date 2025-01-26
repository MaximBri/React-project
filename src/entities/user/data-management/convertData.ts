export const convertData = (dateString: Date | string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const convertDataToAPI = (dateString: string | Date): Date | string => {
  dateString = dateString.toString();
  let date = dateString.split('.')[2];
  date += '-';
  date += dateString.split('.')[1];
  date += '-';
  date += dateString.split('.')[0];
  return date;
};
