import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './Categories';
import SecondTabScreen from './Categories';
import PushedScreen from './Categories';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
}