import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  useWindowDimensions,
} from 'react-native';
import { useSudokuContext } from './Context';

export const Cell = ({
  cellStyle,
  index,
}: {
  cellStyle: TextStyle;
  index: number;
}) => {
  const { width } = useWindowDimensions();

  const { currentCell, setCurrentCell } = useSudokuContext();

  const cellSize = (width - 11) / 9;

  const isActive = currentCell === index;

  return (
    <Pressable onPress={() => setCurrentCell(index)}>
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
        {index}
      </Text>
    </Pressable>
  );
};

const cellStyleSheet = StyleSheet.create({
  active: {
    backgroundColor: '#0398fc',
  },
});
