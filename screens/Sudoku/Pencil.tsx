import { TouchableOpacity, Image, Text } from 'react-native';

export const Pencil = () => {
  return (
    <TouchableOpacity onPress={() => console.log('pencil mode')}>
      <Image
        source={require('../../assets/pencil-svgrepo-com.png')}
        style={{ height: 40, width: 40 }}
      />
      <Text> Pencil </Text>
    </TouchableOpacity>
  );
};
