export default dateFormatHandler = (timestamp) => {
  const dateObj = new Date(timestamp);
  
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  
  const formattedDate = `${day}-${month}-${year}`;
  
  return formattedDate;
};
