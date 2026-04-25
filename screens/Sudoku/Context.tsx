import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type SudokuContextType = {
  currentCell: number;
  pencilMode: boolean;
  handleErase: (currentCell: number) => void;
  setCurrentCell: (currentCell: number) => void;
  setPencilMode: (pencilMode: boolean) => void;
  sudokuBoard: (number | undefined)[];
};

const initialContext: SudokuContextType = {
  currentCell: -1,
  pencilMode: false,
  handleErase: () => undefined,
  setCurrentCell: () => undefined,
  setPencilMode: () => undefined,
  sudokuBoard: [],
};

const SudokuContext = createContext<SudokuContextType>(initialContext);

export const SudokuContextProvider = ({
  children,
  sudoku,
}: {
  children: ReactNode;
  sudoku: number[];
}) => {
  const [currentCell, setCurrentCell] = useState(-1);
  const [pencilMode, setPencilMode] = useState(false);
  const [sudokuBoard, setSudokuBoard] = useState<(number | undefined)[]>([]);

  const contextValue: SudokuContextType = useMemo(() => {
    return {
      currentCell,
      pencilMode,
      handleErase: (cellNumber: number) => undefined,
      setCurrentCell,
      setPencilMode,
      sudokuBoard,
    };
  }, [currentCell, pencilMode, sudokuBoard]);

  useEffect(() => {
    setSudokuBoard(sudoku);
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
