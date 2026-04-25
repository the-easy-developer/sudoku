import { View } from 'react-native';
import { Pencil } from './Pencil';
import { Eraser } from './Eraser';

export const Operations = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        gap: 5,
        flexDirection: 'row',
        marginTop: 10,
        flex: 1,
      }}
    >
      <Pencil />
      <Eraser />
    </View>
  );
};
