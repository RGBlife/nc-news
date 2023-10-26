export const isScrolledToBottom = () => {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
};

export const timeDiffToCurrentDate = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMilliseconds = now - createdDate;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  if (diffInMilliseconds < minute) {
    return Math.round(diffInMilliseconds / second) + "s";
  } else if (diffInMilliseconds < hour) {
    return Math.round(diffInMilliseconds / minute) + "m";
  } else if (diffInMilliseconds < day) {
    return Math.round(diffInMilliseconds / hour) + "h";
  } else if (diffInMilliseconds < year) {
    return Math.round(diffInMilliseconds / day) + "d";
  } else {
    return Math.round(diffInMilliseconds / year) + "y";
  }
};

