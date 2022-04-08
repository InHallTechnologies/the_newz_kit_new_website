const date = new Date();

export const timeString = `${date.getHours()+1}:${date.getMinutes() + 1}:${date.getSeconds()+1}`;
export const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;