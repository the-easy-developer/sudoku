import { useEffect, useState } from 'react';
import { Text } from 'react-native';

const formatTime = (time: number) => {
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

export const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Text style={{ textAlign: 'center' }}>
      {formatTime(time)}
    </Text>
  );
};
