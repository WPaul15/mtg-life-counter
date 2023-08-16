import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  PreferencesProvider,
  usePreferences,
} from './context/PreferencesContext';
import { SessionProvider } from './context/SessionContext';
import RootStack from './navigation/NavigationStack';

const App = () => {
  const { theme } = usePreferences();

  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <SessionProvider>
              <RootStack />
            </SessionProvider>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
};

export default App;
