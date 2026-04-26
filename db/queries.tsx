import { getDB, table_name } from '.';
import { DataBoardType } from './data';

export type BoardType = {
  id: number;
  level: string;
  board: (number | number[])[];
  time: number;
  isCompleted: boolean;
};

export const queryBoards = () => {
  const db = getDB();
  return new Promise<BoardType[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${table_name}`,
        [],
        (tx, resultSet) => {
          const len = resultSet.rows.length;
          const boards: BoardType[] = [];
          for (let i = 0; i < len; i++) {
            const board = resultSet.rows.item(i); // id, time, is_completed, board
            console.log('board', board);
            const actualBoard = JSON.parse(board.board) as DataBoardType;
            boards.push({
              id: board.id,
              level: actualBoard.type,
              board: actualBoard.board,
              time: board.time,
              isCompleted: board.is_completed === 1,
            });
          }
          resolve(boards);
        },
        (tx, err) => {
          reject(err);
          return false;
        },
      );
    });
  });
};
