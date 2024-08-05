export const isMobile = () => {
  if (typeof navigator !== "undefined") {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
  return false;
};
