export const formatTime = (time: number) => {
  const seconds = (time % 60).toString().padStart(2, '0');
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor(time / 3600);

  let format = `${minutes}:${seconds}`;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${format}`;
  }

  return format;
};
