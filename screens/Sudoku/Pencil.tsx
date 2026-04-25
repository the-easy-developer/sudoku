import { Image, Text, Pressable } from 'react-native';
import { useSudokuContext } from './Context';

export const Pencil = () => {
  const { setPencilMode, pencilMode } = useSudokuContext();

  return (
    <Pressable onPress={() => setPencilMode(!pencilMode)}>
      <Image
        source={
          pencilMode
            ? require('../../assets/pencil-5-svgrepo-com-enabled.png')
            : require('../../assets/pencil-5-svgrepo-com.png')
        }
        style={{ height: 40, width: 40 }}
      />
      <Text style={[ pencilMode && { color: '#0398fc' } ]}> Pencil </Text>
    </Pressable>
  );
};
