import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Text } from 'react-native';

import { openDB } from '../../db';
import { useEffect, useState } from 'react';
import { BoardType, queryBoards } from '../../db/queries';
import { formatTime } from '../../utils';

export const StartGame = () => {
  // TODO: remove any
  const navigation = useNavigation<any>();

  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    // TODO: add loading state, handle catch scenario
      openDB().then(() => {
        queryBoards().then(boards => {
          setBoards(boards);
        });
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.screen}>
      {boards.map(board => {
        return (
          <Pressable
            key={board.id}
            onPress={() => {
              navigation.navigate('Sudoku', {
                board,
              });
            }}
            style={styles.button}
          >
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 25 }}>
              {board.level}
            </Text>
            <Text style={{ textAlign: 'center', color: '#fff' }}>
              {formatTime(board.time)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  button: {
    width: 200,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    // TODO: handle color in a better manner
    backgroundColor: '#0398fc',
    gap: 7,
  },
});
