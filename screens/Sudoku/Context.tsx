import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

type SudokuContextType = {
  currentCell: number;
  pencilMode: boolean;
  handleErase: (currentCell: number) => void;
  setCurrentCell: (currentCell: number) => void;
  setPencilMode: (pencilMode: boolean) => void;
};

const initialContext: SudokuContextType = {
  currentCell: -1,
  pencilMode: false,
  handleErase: () => undefined,
  setCurrentCell: () => undefined,
  setPencilMode: () => undefined,
};

const SudokuContext = createContext<SudokuContextType>(initialContext);

export const SudokuContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentCell, setCurrentCell] = useState(-1);
  const [pencilMode, setPencilMode] = useState(false);

  const contextValue: SudokuContextType = useMemo(() => {
    return {
      currentCell,
      pencilMode,
      handleErase: (cellNumber: number) => undefined,
      setCurrentCell,
      setPencilMode,
    };
  }, [currentCell, pencilMode]);

  return (
    <SudokuContext.Provider value={contextValue}>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = () => {
  return useContext(SudokuContext);
};
