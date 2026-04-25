import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { SudokuBlock } from './SudokuBlock';
import { Cell } from './Cell';

const loop = Array.from({ length: 81 }).map((_, i) => i + 1);

const cellsThickRightBorder = loop.filter(l => l % 3 === 0);

const cellsThickBottomBorder = loop.filter(
  l => (l >= 19 && l <= 27) || (l >= 46 && l <= 54) || (l >= 73 && l <= 81),
);

const cellsThickTopBorder = Array.from({ length: 9 }).map((_, i) => i + 1);

const cellsThickLeftBorder = Array.from({ length: 9 }).map((_, i) => i * 9 + 1);

export const Sudoku = () => {
  return (
    <SafeAreaView>
      <View style={SudokuStyleSheet.sudoku}>
        {loop.map(k => {
          const rightBorder = cellsThickRightBorder.includes(k)
            ? SudokuStyleSheet.blockRightBorder
            : {};
          const bottomBorder = cellsThickBottomBorder.includes(k)
            ? SudokuStyleSheet.blockBottomBorder
            : {};
          const topBorder = cellsThickTopBorder.includes(k)
            ? SudokuStyleSheet.blockTopBorder
            : {};
          const leftBorder = cellsThickLeftBorder.includes(k)
            ? SudokuStyleSheet.blockLeftBorder
            : {};

          return (
            <Cell
              key={k}
              cellStyle={{
                ...SudokuStyleSheet.cell,
                ...rightBorder,
                ...bottomBorder,
                ...topBorder,
                ...leftBorder,
              }}
              value={k}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const SudokuStyleSheet = StyleSheet.create({
  cell: { borderWidth: 0.5, borderColor: '#3b3838' },
  blockRightBorder: {
    borderRightWidth: 2,
  },
  blockBottomBorder: {
    borderBottomWidth: 2,
  },
  blockTopBorder: {
    borderTopWidth: 2,
  },
  blockLeftBorder: {
    borderLeftWidth: 2,
  },
  sudoku: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
