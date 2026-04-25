import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSudokuContext } from './Context';

export const Digits = () => {
  const { width } = useWindowDimensions();

  const { enterValue } = useSudokuContext();

  const digitWidth = (width - 15) / 9;

  return (
    <View style={{ gap: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <Pressable key={i} onPress={() => enterValue(i + 1)}>
          {/** TODO: make this look like a button */}
          <Text
            style={{
              width: digitWidth - 10,
              height: digitWidth,
              textAlign: 'center',
              borderWidth: 1,
              boxSizing: 'border-box',
              fontSize: digitWidth / 2,
              paddingTop: digitWidth / 8,
            }}
          >
            {i + 1}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
