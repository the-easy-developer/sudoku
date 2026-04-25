import { Pressable, Text } from 'react-native';

export const Digits = () => {
  return Array(9).map((_, i) => (
    <Pressable key={i}>
      <Text> {i + 1} </Text>
    </Pressable>
  ));
};
