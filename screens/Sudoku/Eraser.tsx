import { Pressable, Image, Text } from 'react-native';
import { useSudokuContext } from './Context';

export const Eraser = () => {
  const { handleErase } = useSudokuContext();
  return (
    <Pressable onPress={() => handleErase()}>
      <Image
        source={require('../../assets/eraser-svgrepo-com.png')}
        style={{ height: 40, width: 40 }}
      />
      <Text> Eraser </Text>
    </Pressable>
  );
};
