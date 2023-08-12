import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import {
  PreferencesProvider,
  usePreferences,
} from './context/PreferencesContext';
import RootStack from './navigation/NavigationStack';

const App = () => {
  const { theme } = usePreferences();

  return (
    <PreferencesProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesProvider>
  );
};

export default App;
