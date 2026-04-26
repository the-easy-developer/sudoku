import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { formatTime } from '../../utils';
import { useSudokuContext } from './Context';
import { updateTime } from '../../db/queries';

export const Timer = () => {
  const [time, setTime] = useState(-1);

  const { boardDbId, startTime } = useSudokuContext();

  useEffect(() => {
    console.log('startTime', startTime);
    setTime(startTime);
  }, [startTime]);

  useEffect(() => {
    if (time === -1) {
      return;
    }
    const timeoutId = setTimeout(() => {
      const updatedTime = time + 1;

      setTime(updatedTime);

      // TODO: handle reject case
      updateTime(boardDbId, updatedTime);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [boardDbId, time]);

  return <Text style={{ textAlign: 'center' }}>{formatTime(time)}</Text>;
};
