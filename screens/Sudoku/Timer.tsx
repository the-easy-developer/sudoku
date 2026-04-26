import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { formatTime } from '../../utils';

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
