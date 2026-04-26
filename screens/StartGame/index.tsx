import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Text, useWindowDimensions } from 'react-native';

import { openDB } from '../../db';
import { useEffect, useState } from 'react';
import { BoardType, queryBoards } from '../../db/queries';
import { formatTime } from '../../utils';

export const StartGame = () => {
  // TODO: remove any
  const navigation = useNavigation<any>();

  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    openDB().then(() => {
      queryBoards().then(boards => {
        setBoards(boards);
      });
    });
  }, []);

  return (
    <View style={styles.screen}>
      {boards.map(b => {
        return (
          <Pressable
            key={b.id}
            onPress={() => {
              console.log(b);
            }}
            style={styles.button}
          >
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 25 }}>
              {b.level}
            </Text>
            <Text style={{ textAlign: 'center', color: '#fff' }}>
              {formatTime(b.time)}
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
    backgroundColor: '#0398fc',
    gap: 7,
  },
});
