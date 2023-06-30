function FormattedDate() {
  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    const suffix = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    const dayStr = dayOfMonth.toString();
    const daySuffix = (dayOfMonth % 100 >= 11 && dayOfMonth % 100 <= 13) ? 'th' : suffix[dayStr[dayStr.length - 1]];

    return `${dayOfWeek} ${monthName} ${dayOfMonth}${daySuffix}, ${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <h3 className="text-center text-xl my-2">Current Data for {formattedDate}</h3>
  );
}

export default FormattedDate;