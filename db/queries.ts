import { getDB, table_name } from '.';
import { DataBoardType } from './data';

export type BoardType = {
  id: number;
  level: string;
  board: DataBoardType['board'];
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

export const updateTime = (boardId: number, time: number) => {
  const db = getDB();
  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE ${table_name} SET time = ? WHERE id = ?`,
        [time, boardId],
        (tx, resultSet) => {
          console.log('sqlite update time', tx, resultSet);
          resolve(true);
        },
        (tx, err) => {
          reject(err);
          return false;
        },
      );
    });
  });
};

export const updateBoard = (boardId: number, board: DataBoardType) => {
  const db = getDB();
  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE ${table_name} SET board = json(?) WHERE id = ?`,
        [JSON.stringify(board), boardId],
        (tx, resultSet) => {
          console.log('sqlite update board', tx, resultSet);
          resolve(true);
        },
        (tx, err) => {
          reject(err);
          return false;
        },
      );
    });
  });
};
