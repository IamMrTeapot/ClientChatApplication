export const formatUtils = {
  formatStringTime: (timestamp: string) => {
    const date = new Date(timestamp);

    // Convert to Pacific Time (PT)
    date.setHours(date.getHours() + 7);

    // Get hours and minutes in 24-hour format
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Formatted time string
    const formattedTime = `${hours}.${minutes}`;
    return formattedTime;
  },
  hashPrivateChatName (username1 : string,username2 : string) : string{
    if(username2 < username1) [username1,username2] = [username2,username1]
    return `${username1}-${username2}`;
  } 
};
