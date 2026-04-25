import { useNavigation } from '@react-navigation/native';
import { Text, Button, View, StyleSheet } from 'react-native';

export const StartGame = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.screen}>
      <Button
        title="Go to Sudoku"
        onPress={() =>
          navigation.navigate('Sudoku', {
            sudoku: [
              7, -1, 9, -1, -1, -1, -1, 2, -1, 2, 8, -1, -1, -1, -1, -1, 9, -1,
              1, -1, 5, 9, 2, 3, -1, -1, 7, -1, -1, 8, -1, 9, 6, 7, -1, 2, 9,
              -1, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, -1, -1, 3, -1,
              9, -1, -1, -1, 2, -1, -1, -1, 8, -1, -1, 6, -1, -1, 5, 7, -1, -1,
              -1, -1, 7, -1, -1, -1, -1, 4,
            ].map(v => (v === -1 ? undefined : v)),
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
