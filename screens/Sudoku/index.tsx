import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Timer } from './Timer';
import { Operations } from './Operations';
import { SudokuContextProvider } from './Context';
import { Digits } from './Digits';
import { Board } from './Board';

// TODO: remove any
export const Sudoku = ({ route }: { route: RouteProp<any> }) => {
  return (
    <SafeAreaView style={{ flex: 1, gap: 10, margin: 5 }}>
      <SudokuContextProvider sudoku={(route.params?.board ?? {})}>
        <Timer />
        <Board />
        <Operations />
        <Digits />
      </SudokuContextProvider>
    </SafeAreaView>
  );
};
