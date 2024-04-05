export const formatUtils = {
  formatStringTime: (timestamp: string) => {
    const date = new Date(timestamp);

    // Convert to Pacific Time (PT)
    date.setHours(date.getHours() + 7);

    // Get hours and minutes in 24-hour format
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Formatted time string
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  },
};
