import { TouchableOpacity, Image, Text } from 'react-native';

export const Eraser = () => {
  return (
    <TouchableOpacity onPress={() => console.log('erase')}>
      <Image
        source={require('../../assets/eraser-svgrepo-com.png')}
        style={{ height: 40, width: 40 }}
      />
      <Text> Eraser </Text>
    </TouchableOpacity>
  );
};
