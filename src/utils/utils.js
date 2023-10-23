export const isScrolledToBottom = () => {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
};
