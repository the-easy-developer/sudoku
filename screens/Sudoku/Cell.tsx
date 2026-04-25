import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSudokuContext } from './Context';

const digitsArr = Array.from({ length: 9 }).map((_, i) => i + 1);

export const Cell = ({
  cellStyle,
  index,
}: {
  cellStyle: TextStyle;
  index: number;
}) => {
  const { width } = useWindowDimensions();

  const { currentCell, setCurrentCell, sudokuBoard } = useSudokuContext();

  const cellSize = (width - 11) / 9;

  const isActive = currentCell === index;

  const { value } = sudokuBoard[index - 1] ?? {};

  return (
    <Pressable onPress={() => setCurrentCell(index)}>
      {Array.isArray(value) ? (
        <View
          style={[
            {
              ...cellStyle,
              height: cellSize,
              width: cellSize,
              paddingTop: cellSize / 8,
            },
            isActive && cellStyleSheet.active,
            {
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // borderColor: '#f00',
              // borderWidth: 1,
            },
          ]}
        >
          {digitsArr.map(d => (
            <Text
              key={d}
              style={{
                fontSize: cellSize / 5,
                width: '30%',
                height: '33%',
                opacity: value.includes(d) ? 1 : 0,
                flex: 1,
              }}
            >
              {d}
            </Text>
          ))}
        </View>
      ) : (
        <Text
          style={[
            {
              ...cellStyle,
              height: cellSize,
              width: cellSize,
              fontSize: cellSize / 2,
              paddingTop: cellSize / 8,
              textAlign: 'center',
            },
            isActive && cellStyleSheet.active,
          ]}
        >
          {value}
        </Text>
      )}
    </Pressable>
  );
};

const cellStyleSheet = StyleSheet.create({
  active: {
    backgroundColor: '#0398fc',
  },
});
