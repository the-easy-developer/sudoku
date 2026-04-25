/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartGame } from './screens/StartGame';
import { Sudoku } from './screens/Sudoku';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'StartGame',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    StartGame: {
      screen: StartGame,
    },
    Sudoku: {
      screen: Sudoku,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
