import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BoardType, updateBoard } from '../../db/queries';

type SudokuCell = {
  value: number | number[];
  isEditable: boolean;
};

type SudokuContextType = {
  startTime: number;
  boardDbId: number;
  currentCell: number;
  pencilMode: boolean;
  level: string;
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

const fromDbToContextType = (dbBoard: BoardType['board']) =>
  dbBoard.map(c => ({ ...c, isEditable: c.isEditable === 1 }));

const fromContextTypeToDb = (contextBoard: SudokuCell[]) =>
  contextBoard.map(c => ({ ...c, isEditable: c.isEditable ? 1 : 0 }));

const initialContext: SudokuContextType = {
  level: '',
  startTime: -1,
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
  const [startTime, setStartTime] = useState(-1);
  const [level, setLevel] = useState('');

  const contextValue: SudokuContextType = useMemo(() => {
    return {
      level,
      boardDbId,
      startTime,
      currentCell,
      pencilMode,
      handleErase: () => {
        const index = currentCell - 1;
        const cell = sudokuBoard[index];
        if (!cell || !cell.isEditable) {
          return;
        }
        cell.value = -1;
        const newSudokuBoard = [
          ...sudokuBoard.slice(0, index),
          cell,
          ...sudokuBoard.slice(index + 1),
        ];
        updateBoard(boardDbId, {
          type: level,
          board: fromContextTypeToDb(newSudokuBoard),
        })
          .then(() => {
            setSudokuBoard(newSudokuBoard);
          })
          .catch(err => {
            // TODO: show error to user
            console.error(err);
          });
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

        const newSudokuBoard = [
          ...sudokuBoard.slice(0, index),
          cell,
          ...sudokuBoard.slice(index + 1),
        ];

        updateBoard(boardDbId, {
          type: level,
          board: fromContextTypeToDb(newSudokuBoard),
        })
          .then(() => {
            setSudokuBoard(newSudokuBoard);
          })
          .catch(err => {
            // TODO: show error to user
            console.error(err);
          });
      },
    };
  }, [currentCell, pencilMode, sudokuBoard, boardDbId, startTime, level]);

  useEffect(() => {
    setBoardDbId(sudoku.id);
    setStartTime(sudoku.time);
    setLevel(sudoku.level);
    setSudokuBoard(fromDbToContextType(sudoku.board));
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
