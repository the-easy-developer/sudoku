import { useNavigation } from '@react-navigation/native';
import { Text, Button, View, StyleSheet } from 'react-native';

export const StartGame = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.screen}>
      <Button
        title="Go to Sudoku"
        onPress={() => navigation.navigate('Sudoku')}
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
