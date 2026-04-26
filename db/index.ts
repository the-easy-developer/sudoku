import SQLiteDatabase, { WebsqlDatabase } from 'react-native-sqlite-2';
import { boards } from './data';

const database_name = 'sudoku.db';
const database_version = '1.0';
const database_displayname = 'Sudoku Database';
const database_size = 200000;

export const table_name = 'Sudoku';

const populateDB = () => {
  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT COUNT(*) FROM ${table_name}`,
        [],
        (txn, rs) => {
          console.log('sqlite', txn, rs);
          console.log('sqlite row count: ', rs.rows.item(0)['COUNT(*)']);

          if (rs.rows.item(0)['COUNT(*)'] === 0) {
            tx.executeSql(
              `INSERT INTO ${table_name} values (?, json(?), ?, ?), (?, json(?), ?, ?), (?, json(?), ?, ?)`,
              [
                1,
                JSON.stringify(boards[0]),
                0,
                0,
                2,
                JSON.stringify(boards[1]),
                0,
                0,
                3,
                JSON.stringify(boards[2]),
                0,
                0,
              ],
              () => {
                resolve(true);
                console.log('Sqlite DB populated');
              },
              () => {
                reject('Could not populate db');
                return false;
              },
            );
          } else {
            resolve(true);
          }
        },
        (txn, error) => {
          console.log('sqlite error', txn, error);
          reject('Unable to count sudoku table');
          return false;
        },
      );
    });
  });
};

let db: WebsqlDatabase;

export const openDB = () => {
  // creating db
  db = SQLiteDatabase.openDatabase(
    {
      name: database_name,
      version: database_version,
      description: database_displayname,
      size: database_size,
    },
    db => {
      console.log('sqlite', db);
    },
  );

  return new Promise<boolean>((resolve, reject) => {
    // creating table
    db.transaction(tx => {
      /**
       * board stores, type and board (an array of numbers/numbers[])
       */
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${table_name}(id INTEGER PRIMARY KEY, board TEXT, time INTEGER, is_completed INTEGER)`,
        [],
        (txn, rs) => {
          console.log('sqlite', txn, rs);
          populateDB()
            .then(() => {
              resolve(true);
            })
            .catch(error => {
              reject(error);
            });
        },
        (txn, error) => {
          console.log('sqlite error', txn, error);
          reject('Unable to create table');
          return false;
        },
      );
    });
  });
};

// TODO: handle situation when db is undefined
export const getDB = () => db;
