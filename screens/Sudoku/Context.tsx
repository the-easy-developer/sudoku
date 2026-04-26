import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BoardType } from '../../db/queries';

type SudokuCell = {
  value: number | number[];
  isEditable: boolean;
};

type SudokuContextType = {
  boardDbId: number;
  currentCell: number;
  pencilMode: boolean;
  handleErase: () => void;
  setCurrentCell: (currentCell: number) => void;
  setPencilMode: (pencilMode: boolean) => void;
  sudokuBoard: SudokuCell[];
  enterValue: (n: number) => void;
};

const addOnceInArray = (arr: number[], digit: number) => {
  if (arr.includes(digit)) {
    return arr.filter(a => a !== digit);
  }
  return arr.concat(digit).sort((a, b) => a - b);
};

const initialContext: SudokuContextType = {
  boardDbId: -1,
  currentCell: -1,
  pencilMode: false,
  handleErase: () => undefined,
  setCurrentCell: () => undefined,
  setPencilMode: () => undefined,
  sudokuBoard: [],
  enterValue: () => undefined,
};

const SudokuContext = createContext<SudokuContextType>(initialContext);

export const SudokuContextProvider = ({
  children,
  sudoku,
}: {
  children: ReactNode;
  sudoku: BoardType;
}) => {
  const [currentCell, setCurrentCell] = useState(-1);
  const [pencilMode, setPencilMode] = useState(false);
  const [sudokuBoard, setSudokuBoard] = useState<SudokuCell[]>([]);
  const [boardDbId, setBoardDbId] = useState(-1);

  const contextValue: SudokuContextType = useMemo(() => {
    return {
      boardDbId,
      currentCell,
      pencilMode,
      handleErase: () => {
        const index = currentCell - 1;
        const cell = sudokuBoard[index];
        if (!cell || !cell.isEditable) {
          return;
        }
        cell.value = -1;
        setSudokuBoard([
          ...sudokuBoard.slice(0, index),
          cell,
          ...sudokuBoard.slice(index + 1),
        ]);
      },
      setCurrentCell,
      setPencilMode,
      sudokuBoard,
      enterValue: (digit: number) => {
        const index = currentCell - 1;
        const cell = sudokuBoard[index];
        if (!cell || !cell.isEditable) {
          return;
        }

        if (pencilMode) {
          cell.value = Array.isArray(cell.value)
            ? addOnceInArray(cell.value, digit)
            : addOnceInArray(cell.value ? [cell.value] : [], digit);
        } else {
          cell.value = digit;
        }

        setSudokuBoard([
          ...sudokuBoard.slice(0, index),
          cell,
          ...sudokuBoard.slice(index + 1),
        ]);
      },
    };
  }, [currentCell, pencilMode, sudokuBoard]);

  useEffect(() => {
    setBoardDbId(sudoku.id);
    setSudokuBoard(
      sudoku.board.map(v => ({
        isEditable: v === undefined,
        value: v,
      })),
    );
  }, [sudoku]);

  return (
    <SudokuContext.Provider value={contextValue}>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = () => {
  return useContext(SudokuContext);
};
