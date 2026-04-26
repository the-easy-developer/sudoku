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

export const dontDisplayEmpty = (value: number) =>
  value === -1 ? undefined : value;

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

  const { value, isEditable } = sudokuBoard[index - 1] ?? {};

  return (
    <Pressable onPress={() => setCurrentCell(index)}>
      {Array.isArray(value) ? (
        <View
          style={[
            {
              ...cellStyle,
              height: cellSize,
              width: cellSize,
            },
            isActive && cellStyleSheet.active,
            {
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: cellSize / 8,
            },
          ]}
        >
          {digitsArr.map(d => (
            <Text
              key={d}
              style={{
                fontSize: cellSize / 4,
                width: '33%',
                height: '33%',
                opacity: value.includes(d) ? 1 : 0,
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
            !isEditable && cellStyleSheet.notEditable,
          ]}
        >
          {dontDisplayEmpty(value)}
        </Text>
      )}
    </Pressable>
  );
};

const cellStyleSheet = StyleSheet.create({
  active: {
    backgroundColor: '#0398fc',
  },
  notEditable: {
    color: '#777',
  },
});
